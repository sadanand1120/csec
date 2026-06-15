import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl, {
  type GeoJSONSource,
  type ExpressionSpecification,
  type MapGeoJSONFeature,
  type Map as MapLibreMap,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { formatCompactCurrency, formatFactor } from "../lib/format";
import type { HeatmapValue } from "../lib/equivalence";

type DemoMapProps = {
  values: HeatmapValue[];
  sourceId: string;
  targetId: string;
  onSelectTarget: (locationId: string) => void;
};

type CityFeature = {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    id: string;
    stateFips: string;
    displayName: string;
    shortName: string;
    factorLabel: string;
    salaryLabel: string;
    color: string;
  };
};

type CityFeatureCollection = {
  type: "FeatureCollection";
  features: CityFeature[];
};

const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {},
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "#edf4f2",
      },
    },
  ],
};

const US_CENTER: [number, number] = [-98.5795, 39.8283];
const US_BOUNDS: [[number, number], [number, number]] = [
  [-127.5, 23.4],
  [-65.5, 50.6],
];

function colorForFactor(factor: number) {
  if (factor < 0.9) return "#1f9d7a";
  if (factor < 1.05) return "#79a63a";
  if (factor < 1.25) return "#d79a26";
  if (factor < 1.5) return "#cf5b3f";
  return "#9f2f45";
}

function makeCityGeoJson(values: HeatmapValue[]): CityFeatureCollection {
  return {
    type: "FeatureCollection",
    features: values.map(({ location, factor, equivalentSalary }) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [location.lon, location.lat],
      },
      properties: {
        id: location.id,
        stateFips: location.countyFips.slice(0, 2),
        displayName: location.displayName,
        shortName: location.shortName,
        factorLabel: formatFactor(factor),
        salaryLabel: formatCompactCurrency(equivalentSalary),
        color: colorForFactor(factor),
      },
    })),
  };
}

function coordinatesToBounds(coordinates: unknown, bounds: maplibregl.LngLatBounds) {
  if (!Array.isArray(coordinates)) return;
  if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") {
    bounds.extend(coordinates as [number, number]);
    return;
  }
  coordinates.forEach((entry) => coordinatesToBounds(entry, bounds));
}

function featureBounds(feature: MapGeoJSONFeature) {
  const bounds = new maplibregl.LngLatBounds();
  if ("coordinates" in feature.geometry) {
    coordinatesToBounds(feature.geometry.coordinates, bounds);
  }
  return bounds;
}

function cityPaintExpression(sourceId: string, targetId: string) {
  return {
    radius: [
      "case",
      ["==", ["get", "id"], targetId],
      10,
      ["==", ["get", "id"], sourceId],
      8,
      7,
    ] as ExpressionSpecification,
    strokeWidth: [
      "case",
      ["==", ["get", "id"], targetId],
      4,
      ["==", ["get", "id"], sourceId],
      3,
      2,
    ] as ExpressionSpecification,
    strokeColor: [
      "case",
      ["==", ["get", "id"], targetId],
      "#f0b429",
      ["==", ["get", "id"], sourceId],
      "#162224",
      "#ffffff",
    ] as ExpressionSpecification,
  };
}

function updateCityPaint(map: MapLibreMap, sourceId: string, targetId: string) {
  if (!map.getLayer("cities-circle")) return;
  const expression = cityPaintExpression(sourceId, targetId);
  map.setPaintProperty("cities-circle", "circle-radius", expression.radius);
  map.setPaintProperty("cities-circle", "circle-stroke-width", expression.strokeWidth);
  map.setPaintProperty("cities-circle", "circle-stroke-color", expression.strokeColor);
}

function fitState(map: MapLibreMap, feature: MapGeoJSONFeature) {
  const bounds = featureBounds(feature);
  if (bounds.isEmpty()) return;
  map.fitBounds(bounds, {
    padding: 54,
    maxZoom: 5.25,
    duration: 650,
  });
}

export default function DemoMap({ values, sourceId, targetId, onSelectTarget }: DemoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const valuesRef = useRef(values);
  const onSelectTargetRef = useRef(onSelectTarget);
  const sourceIdRef = useRef(sourceId);
  const targetIdRef = useRef(targetId);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const min = Math.min(...values.map((value) => value.factor));
  const max = Math.max(...values.map((value) => value.factor));
  const cityGeoJson = useMemo(() => makeCityGeoJson(values), [values]);
  const target = values.find((value) => value.location.id === targetId);
  const source = values.find((value) => value.location.id === sourceId);

  useEffect(() => {
    valuesRef.current = values;
    onSelectTargetRef.current = onSelectTarget;
    sourceIdRef.current = sourceId;
    targetIdRef.current = targetId;
  }, [onSelectTarget, sourceId, targetId, values]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: US_CENTER,
      zoom: 2.75,
      minZoom: 2,
      maxZoom: 8,
      maxBounds: US_BOUNDS,
      attributionControl: false,
      cooperativeGestures: true,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    map.on("load", () => {
      map.addSource("states", {
        type: "geojson",
        data: "/us-states-20m.geojson",
      });
      map.addSource("cities", {
        type: "geojson",
        data: makeCityGeoJson(valuesRef.current),
      });

      map.addLayer({
        id: "states-fill",
        type: "fill",
        source: "states",
        paint: {
          "fill-color": "#cfd5d4",
          "fill-opacity": 0.9,
        },
      });
      map.addLayer({
        id: "source-state-fill",
        type: "fill",
        source: "states",
        filter: ["==", ["get", "STATE"], sourceIdRef.current.slice(0, 0)],
        paint: {
          "fill-color": "#8eb6ad",
          "fill-opacity": 0.36,
        },
      });
      map.addLayer({
        id: "target-state-fill",
        type: "fill",
        source: "states",
        filter: ["==", ["get", "STATE"], targetIdRef.current.slice(0, 0)],
        paint: {
          "fill-color": "#f0b429",
          "fill-opacity": 0.34,
        },
      });
      map.addLayer({
        id: "states-line",
        type: "line",
        source: "states",
        paint: {
          "line-color": "#ffffff",
          "line-width": 0.8,
        },
      });

      const expression = cityPaintExpression(sourceIdRef.current, targetIdRef.current);
      map.addLayer({
        id: "cities-circle",
        type: "circle",
        source: "cities",
        paint: {
          "circle-radius": expression.radius,
          "circle-color": ["get", "color"],
          "circle-stroke-color": expression.strokeColor,
          "circle-stroke-width": expression.strokeWidth,
          "circle-opacity": 0.95,
        },
      });

      const currentSource = valuesRef.current.find(
        ({ location }) => location.id === sourceIdRef.current,
      );
      const currentTarget = valuesRef.current.find(
        ({ location }) => location.id === targetIdRef.current,
      );
      if (currentSource) {
        map.setFilter("source-state-fill", [
          "==",
          ["get", "STATE"],
          currentSource.location.countyFips.slice(0, 2),
        ]);
      }
      if (currentTarget) {
        map.setFilter("target-state-fill", [
          "==",
          ["get", "STATE"],
          currentTarget.location.countyFips.slice(0, 2),
        ]);
        setSelectedState(currentTarget.location.stateName);
      }

      map.on("mouseenter", "states-fill", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "states-fill", () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("mouseenter", "cities-circle", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "cities-circle", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "states-fill", (event) => {
        const clickedCities = map.queryRenderedFeatures(event.point, {
          layers: ["cities-circle"],
        });
        if (clickedCities.length) return;

        const feature = event.features?.[0];
        if (!feature) return;
        const stateFips = String(feature.properties?.STATE ?? "");
        const stateName = String(feature.properties?.NAME ?? "Selected state");
        setSelectedState(stateName);
        fitState(map, feature);

        const stateCity = valuesRef.current.find(
          ({ location }) => location.countyFips.slice(0, 2) === stateFips,
        );
        if (stateCity) {
          onSelectTargetRef.current(stateCity.location.id);
        }
      });

      map.on("click", "cities-circle", (event) => {
        const feature = event.features?.[0];
        if (!feature || feature.geometry.type !== "Point") return;
        const cityId = String(feature.properties?.id ?? "");
        const cityName = String(feature.properties?.displayName ?? "");
        const factorLabel = String(feature.properties?.factorLabel ?? "");
        const salaryLabel = String(feature.properties?.salaryLabel ?? "");
        const coordinates = feature.geometry.coordinates as [number, number];
        onSelectTargetRef.current(cityId);
        map.flyTo({
          center: coordinates,
          zoom: Math.max(map.getZoom(), 4.4),
          duration: 650,
          essential: true,
        });

        popupRef.current?.remove();
        popupRef.current = new maplibregl.Popup({ closeButton: false, offset: 14 })
          .setLngLat(coordinates)
          .setHTML(
            `<strong>${cityName}</strong><span>${factorLabel} / ${salaryLabel}</span>`,
          )
          .addTo(map);
      });
    });

    return () => {
      popupRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    const source = map.getSource("cities") as GeoJSONSource | undefined;
    source?.setData(cityGeoJson);
  }, [cityGeoJson]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    updateCityPaint(map, sourceId, targetId);

    if (source) {
      map.setFilter("source-state-fill", ["==", ["get", "STATE"], source.location.countyFips.slice(0, 2)]);
    }
    if (target) {
      setSelectedState(target.location.stateName);
      map.setFilter("target-state-fill", ["==", ["get", "STATE"], target.location.countyFips.slice(0, 2)]);
      map.flyTo({
        center: [target.location.lon, target.location.lat],
        zoom: Math.max(map.getZoom(), 3.6),
        duration: 500,
        essential: true,
      });
    }
  }, [source, sourceId, target, targetId]);

  return (
    <section className="map-panel" aria-label="Interactive U.S. equivalent salary map">
      <div className="section-heading">
        <p className="eyebrow">Interactive U.S. map</p>
        <h3>Equivalent salary factor</h3>
      </div>
      <div className="map-canvas">
        <div className="maplibre-map" ref={mapContainerRef} />
      </div>
      <div className="map-summary">
        <div>
          <span>Source</span>
          <strong>{source?.location.displayName ?? "Source city"}</strong>
        </div>
        <div>
          <span>Target</span>
          <strong>{target?.location.displayName ?? "Target city"}</strong>
        </div>
        <div>
          <span>State focus</span>
          <strong>{selectedState ?? target?.location.stateName ?? "United States"}</strong>
        </div>
      </div>
      <div className="map-city-list" aria-label="City targets">
        {values.map(({ location, factor, equivalentSalary }) => (
          <button
            key={location.id}
            className={`${location.id === sourceId ? "source" : ""} ${location.id === targetId ? "target" : ""}`}
            type="button"
            onClick={() => onSelectTarget(location.id)}
          >
            <span>{location.shortName}</span>
            <strong>{formatFactor(factor)}</strong>
            <em>{formatCompactCurrency(equivalentSalary)}</em>
          </button>
        ))}
      </div>
      <div className="legend" aria-label="Heatmap legend">
        <span>{formatFactor(min)}</span>
        <div className="legend-ramp" />
        <span>{formatFactor(max)}</span>
      </div>
    </section>
  );
}
