import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STATE_PATH = path.join(ROOT, "public", "us-states-display.geojson");
const DATA_PATH = path.join(ROOT, "src", "lib", "nationwideData.ts");
const OUTPUT_PATH = path.join(ROOT, "public", "city-voronoi-cells.geojson");

const STATE_POINT_DISPLAY_TRANSFORMS = {
  "02": {
    sourceAnchor: [-158.759196, 61.286211],
    targetAnchor: [-132, 53],
    scale: 0.3,
    normalizeAntimeridian: true,
  },
  "15": {
    sourceAnchor: [-157.682575, 20.575318],
    targetAnchor: [-130, 30],
    scale: 2.25,
    normalizeAntimeridian: false,
  },
};

function readSalaryData() {
  const text = fs.readFileSync(DATA_PATH, "utf8");
  const match = text.match(/export const SALARY_DATA = ([\s\S]*) as const satisfies SalaryDataset;/);
  if (!match) {
    throw new Error("Could not extract SALARY_DATA from nationwideData.ts");
  }
  return JSON.parse(match[1]);
}

function displayCoordinate(coordinate, stateFips) {
  const transform = STATE_POINT_DISPLAY_TRANSFORMS[stateFips];
  if (!transform) return coordinate;

  const [sourceLon, sourceLat] = transform.sourceAnchor;
  const [targetLon, targetLat] = transform.targetAnchor;
  const lon =
    transform.normalizeAntimeridian && coordinate[0] > 0 ? coordinate[0] - 360 : coordinate[0];
  const lat = coordinate[1];
  return [
    targetLon + (lon - sourceLon) * transform.scale,
    targetLat + (lat - sourceLat) * transform.scale,
  ];
}

function signedArea(ring) {
  let sum = 0;
  for (let index = 0; index < ring.length; index += 1) {
    const current = ring[index];
    const next = ring[(index + 1) % ring.length];
    sum += current[0] * next[1] - next[0] * current[1];
  }
  return sum / 2;
}

function normalizeRing(ring) {
  const open = ring.slice();
  const first = open[0];
  const last = open[open.length - 1];
  if (first && last && first[0] === last[0] && first[1] === last[1]) {
    open.pop();
  }
  return signedArea(open) < 0 ? open.reverse() : open;
}

function closeRing(ring) {
  if (ring.length === 0) return ring;
  const first = ring[0];
  const last = ring[ring.length - 1];
  return first[0] === last[0] && first[1] === last[1] ? ring : [...ring, first];
}

function side(point, keeper, challenger) {
  const dx = challenger.x - keeper.x;
  const dy = challenger.y - keeper.y;
  return 2 * (dx * point[0] + dy * point[1]) - (challenger.x ** 2 + challenger.y ** 2 - keeper.x ** 2 - keeper.y ** 2);
}

function intersect(start, end, startSide, endSide) {
  const ratio = startSide / (startSide - endSide);
  return [
    start[0] + (end[0] - start[0]) * ratio,
    start[1] + (end[1] - start[1]) * ratio,
  ];
}

function clipToCloserHalfPlane(ring, keeper, challenger) {
  if (ring.length === 0) return ring;
  const output = [];
  const epsilon = 1e-10;

  for (let index = 0; index < ring.length; index += 1) {
    const current = ring[index];
    const previous = ring[(index + ring.length - 1) % ring.length];
    const currentSide = side(current, keeper, challenger);
    const previousSide = side(previous, keeper, challenger);
    const currentInside = currentSide <= epsilon;
    const previousInside = previousSide <= epsilon;

    if (currentInside) {
      if (!previousInside) {
        output.push(intersect(previous, current, previousSide, currentSide));
      }
      output.push(current);
    } else if (previousInside) {
      output.push(intersect(previous, current, previousSide, currentSide));
    }
  }

  return output;
}

function featurePolygonRings(feature) {
  const geometry = feature.geometry;
  if (geometry.type === "Polygon") {
    return [normalizeRing(geometry.coordinates[0])];
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.map((polygon) => normalizeRing(polygon[0]));
  }
  return [];
}

function buildCellRings(stateRings, keeper, stateCities) {
  const rings = [];
  for (const stateRing of stateRings) {
    let clipped = stateRing;
    for (const challenger of stateCities) {
      if (challenger.id === keeper.id) continue;
      clipped = clipToCloserHalfPlane(clipped, keeper, challenger);
      if (clipped.length < 3) break;
    }
    if (clipped.length >= 3 && Math.abs(signedArea(clipped)) > 1e-7) {
      rings.push([closeRing(clipped)]);
    }
  }
  return rings;
}

function main() {
  const states = JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
  const salaryData = readSalaryData();
  const citiesByState = new Map();

  for (const location of salaryData.locations) {
    const stateFips = location.countyFips.slice(0, 2);
    const [x, y] = displayCoordinate([location.lon, location.lat], stateFips);
    const city = {
      id: location.id,
      displayName: location.displayName,
      stateFips,
      x,
      y,
    };
    const current = citiesByState.get(stateFips) ?? [];
    current.push(city);
    citiesByState.set(stateFips, current);
  }

  const features = [];
  for (const state of states.features) {
    const stateFips = state.properties.STATE;
    const stateCities = citiesByState.get(stateFips) ?? [];
    if (stateCities.length === 0) continue;

    const stateRings = featurePolygonRings(state);
    for (const city of stateCities) {
      const cellRings = buildCellRings(stateRings, city, stateCities);
      if (cellRings.length === 0) continue;
      features.push({
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: cellRings,
        },
        properties: {
          id: city.id,
          displayName: city.displayName,
          stateFips,
        },
      });
    }
  }

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify({
      type: "FeatureCollection",
      features,
    }),
  );
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)} with ${features.length} cells`);
}

main();
