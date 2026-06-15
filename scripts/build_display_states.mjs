import fs from "node:fs";

const RAW_PATH = "public/us-states-20m.geojson";
const DISPLAY_PATH = "public/us-states-display.geojson";
const LABELS_PATH = "public/us-state-labels-display.geojson";

const STATE_ABBR = {
  "01": "AL",
  "02": "AK",
  "04": "AZ",
  "05": "AR",
  "06": "CA",
  "08": "CO",
  "09": "CT",
  "10": "DE",
  "11": "DC",
  "12": "FL",
  "13": "GA",
  "15": "HI",
  "16": "ID",
  "17": "IL",
  "18": "IN",
  "19": "IA",
  "20": "KS",
  "21": "KY",
  "22": "LA",
  "23": "ME",
  "24": "MD",
  "25": "MA",
  "26": "MI",
  "27": "MN",
  "28": "MS",
  "29": "MO",
  "30": "MT",
  "31": "NE",
  "32": "NV",
  "33": "NH",
  "34": "NJ",
  "35": "NM",
  "36": "NY",
  "37": "NC",
  "38": "ND",
  "39": "OH",
  "40": "OK",
  "41": "OR",
  "42": "PA",
  "44": "RI",
  "45": "SC",
  "46": "SD",
  "47": "TN",
  "48": "TX",
  "49": "UT",
  "50": "VT",
  "51": "VA",
  "53": "WA",
  "54": "WV",
  "55": "WI",
  "56": "WY",
  "72": "PR",
};

const STATE_DISPLAY_TRANSFORMS = {
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

function roundCoordinate(value) {
  return Math.round(value * 1_000_000) / 1_000_000;
}

function displayCoordinate(coordinate, stateFips) {
  const transform = STATE_DISPLAY_TRANSFORMS[stateFips];
  if (!transform) return coordinate;

  const [sourceLon, sourceLat] = transform.sourceAnchor;
  const [targetLon, targetLat] = transform.targetAnchor;
  const lon =
    transform.normalizeAntimeridian && coordinate[0] > 0
      ? coordinate[0] - 360
      : coordinate[0];
  const lat = coordinate[1];

  return [
    roundCoordinate(targetLon + (lon - sourceLon) * transform.scale),
    roundCoordinate(targetLat + (lat - sourceLat) * transform.scale),
  ];
}

function transformPolygon(coordinates, stateFips) {
  return coordinates.map((ring) =>
    ring.map((coordinate) => displayCoordinate(coordinate, stateFips)),
  );
}

function transformGeometry(geometry, stateFips) {
  if (geometry.type === "Polygon") {
    return {
      ...geometry,
      coordinates: transformPolygon(geometry.coordinates, stateFips),
    };
  }

  if (geometry.type === "MultiPolygon") {
    return {
      ...geometry,
      coordinates: geometry.coordinates.map((polygon) => transformPolygon(polygon, stateFips)),
    };
  }

  return geometry;
}

function collectBounds(geoJson) {
  const bounds = {
    minLon: Infinity,
    minLat: Infinity,
    maxLon: -Infinity,
    maxLat: -Infinity,
  };

  function visit(coordinates) {
    if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") {
      bounds.minLon = Math.min(bounds.minLon, coordinates[0]);
      bounds.minLat = Math.min(bounds.minLat, coordinates[1]);
      bounds.maxLon = Math.max(bounds.maxLon, coordinates[0]);
      bounds.maxLat = Math.max(bounds.maxLat, coordinates[1]);
      return;
    }
    coordinates.forEach(visit);
  }

  geoJson.features.forEach((feature) => visit(feature.geometry.coordinates));
  return bounds;
}

function ringArea(ring) {
  let area = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const [x1, y1] = ring[index];
    const [x2, y2] = ring[index + 1];
    area += x1 * y2 - x2 * y1;
  }
  return area / 2;
}

function ringCentroid(ring) {
  const area = ringArea(ring);
  if (area === 0) {
    const sums = ring.reduce(
      (total, coordinate) => [total[0] + coordinate[0], total[1] + coordinate[1]],
      [0, 0],
    );
    return [roundCoordinate(sums[0] / ring.length), roundCoordinate(sums[1] / ring.length)];
  }

  let x = 0;
  let y = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const [x1, y1] = ring[index];
    const [x2, y2] = ring[index + 1];
    const cross = x1 * y2 - x2 * y1;
    x += (x1 + x2) * cross;
    y += (y1 + y2) * cross;
  }

  return [roundCoordinate(x / (6 * area)), roundCoordinate(y / (6 * area))];
}

function largestExteriorRing(geometry) {
  if (geometry.type === "Polygon") return geometry.coordinates[0];

  return geometry.coordinates
    .map((polygon) => polygon[0])
    .reduce((largest, ring) =>
      Math.abs(ringArea(ring)) > Math.abs(ringArea(largest)) ? ring : largest,
    );
}

function buildLabelGeoJson(displayGeoJson) {
  return {
    type: "FeatureCollection",
    features: displayGeoJson.features.map((feature) => {
      const stateFips = feature.properties.STATE;
      return {
        type: "Feature",
        properties: {
          STATE: stateFips,
          NAME: feature.properties.NAME,
          ABBR: STATE_ABBR[stateFips] ?? stateFips,
        },
        geometry: {
          type: "Point",
          coordinates: ringCentroid(largestExteriorRing(feature.geometry)),
        },
      };
    }),
  };
}

const rawGeoJson = JSON.parse(fs.readFileSync(RAW_PATH, "utf8"));
const displayGeoJson = {
  ...rawGeoJson,
  features: rawGeoJson.features.map((feature) => {
    const stateFips = feature.properties.STATE;
    if (!(stateFips in STATE_DISPLAY_TRANSFORMS)) return feature;
    return {
      ...feature,
      properties: {
        ...feature.properties,
        ABBR: STATE_ABBR[stateFips] ?? stateFips,
      },
      geometry: transformGeometry(feature.geometry, stateFips),
    };
  }),
};

displayGeoJson.features = displayGeoJson.features.map((feature) => ({
  ...feature,
  properties: {
    ...feature.properties,
    ABBR: STATE_ABBR[feature.properties.STATE] ?? feature.properties.STATE,
  },
}));

fs.writeFileSync(DISPLAY_PATH, `${JSON.stringify(displayGeoJson)}\n`);
fs.writeFileSync(LABELS_PATH, `${JSON.stringify(buildLabelGeoJson(displayGeoJson))}\n`);
console.log(`Wrote ${DISPLAY_PATH}`);
console.log(`Wrote ${LABELS_PATH}`);
console.log(collectBounds(displayGeoJson));
