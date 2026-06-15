import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import maplibregl, {
  type ExpressionSpecification,
  type FilterSpecification,
  type GeoJSONSource,
  type Map as MapLibreMap,
  type MapGeoJSONFeature,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { LocationProfile } from "../lib/types";

type DemoMapProps = {
  locations: readonly LocationProfile[];
  sourceId: string | null;
  targetId: string | null;
  onSelectLocation: (locationId: string) => void;
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
  };
};

type CityFeatureCollection = {
  type: "FeatureCollection";
  features: CityFeature[];
};

type Coordinate = [number, number];

type StateLabelFeatureCollection = {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: Coordinate;
    };
    properties: {
      ABBR: string;
    };
  }>;
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

const US_DISPLAY_BOUNDS: [[number, number], [number, number]] = [
  [-143, 24],
  [-66, 57],
];
const EMPTY_STATE_FILTER: FilterSpecification = ["==", ["get", "STATE"], ""];
const STATE_POINT_DISPLAY_TRANSFORMS: Record<
  string,
  {
    sourceAnchor: Coordinate;
    targetAnchor: Coordinate;
    scale: number;
    normalizeAntimeridian: boolean;
  }
> = {
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

function displayCoordinate(coordinate: Coordinate, stateFips: string): Coordinate {
  const transform = STATE_POINT_DISPLAY_TRANSFORMS[stateFips];
  if (!transform) return coordinate;
  const [sourceLon, sourceLat] = transform.sourceAnchor;
  const [targetLon, targetLat] = transform.targetAnchor;
  const lon =
    transform.normalizeAntimeridian && coordinate[0] > 0
      ? coordinate[0] - 360
      : coordinate[0];
  const lat = coordinate[1];
  return [
    targetLon + (lon - sourceLon) * transform.scale,
    targetLat + (lat - sourceLat) * transform.scale,
  ];
}

function makeCityGeoJson(locations: readonly LocationProfile[]): CityFeatureCollection {
  return {
    type: "FeatureCollection",
    features: locations.map((location) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: displayCoordinate([location.lon, location.lat], location.countyFips.slice(0, 2)),
      },
      properties: {
        id: location.id,
        stateFips: location.countyFips.slice(0, 2),
        displayName: location.displayName,
        shortName: location.shortName,
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

function stateFilterFor(location: LocationProfile | undefined): FilterSpecification {
  return location
    ? ["==", ["get", "STATE"], location.countyFips.slice(0, 2)]
    : EMPTY_STATE_FILTER;
}

function cityPaintExpression(sourceId: string | null, targetId: string | null) {
  const sourceKey = sourceId ?? "";
  const targetKey = targetId ?? "";
  return {
    color: [
      "case",
      ["==", ["get", "id"], sourceKey],
      "#137b70",
      ["==", ["get", "id"], targetKey],
      "#d79a26",
      "#38545b",
    ] as ExpressionSpecification,
    radius: [
      "case",
      ["==", ["get", "id"], sourceKey],
      9,
      ["==", ["get", "id"], targetKey],
      10,
      6.5,
    ] as ExpressionSpecification,
    strokeWidth: [
      "case",
      ["==", ["get", "id"], sourceKey],
      4,
      ["==", ["get", "id"], targetKey],
      4,
      2,
    ] as ExpressionSpecification,
    strokeColor: [
      "case",
      ["==", ["get", "id"], sourceKey],
      "#0d332f",
      ["==", ["get", "id"], targetKey],
      "#f0b429",
      "#ffffff",
    ] as ExpressionSpecification,
  };
}

function updateCityPaint(map: MapLibreMap, sourceId: string | null, targetId: string | null) {
  if (!map.getLayer("cities-circle")) return;
  const expression = cityPaintExpression(sourceId, targetId);
  map.setPaintProperty("cities-circle", "circle-color", expression.color);
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

function showCityPopup(
  map: MapLibreMap,
  popupRef: MutableRefObject<maplibregl.Popup | null>,
  coordinates: [number, number],
  cityName: string,
) {
  popupRef.current?.remove();
  const content = document.createElement("strong");
  content.textContent = cityName;
  popupRef.current = new maplibregl.Popup({ closeButton: false, offset: 14 })
    .setLngLat(coordinates)
    .setDOMContent(content)
    .addTo(map);
}

function clearStateLabelMarkers(markersRef: MutableRefObject<maplibregl.Marker[]>) {
  markersRef.current.forEach((marker) => marker.remove());
  markersRef.current = [];
}

async function loadStateLabelMarkers(
  map: MapLibreMap,
  markersRef: MutableRefObject<maplibregl.Marker[]>,
  isDisposed: () => boolean,
) {
  const response = await fetch("/us-state-labels-display.geojson");
  if (!response.ok) {
    throw new Error(`Could not load U.S. state labels: ${response.status}`);
  }

  const labels = (await response.json()) as StateLabelFeatureCollection;
  if (isDisposed()) return;
  clearStateLabelMarkers(markersRef);
  markersRef.current = labels.features.map((feature) => {
    const element = document.createElement("span");
    element.className = "state-label-marker";
    element.textContent = feature.properties.ABBR;
    element.setAttribute("aria-hidden", "true");
    element.setAttribute("role", "presentation");
    element.tabIndex = -1;
    return new maplibregl.Marker({ element, anchor: "center" })
      .setLngLat(feature.geometry.coordinates)
      .addTo(map);
  });
}

export default function DemoMap({
  locations,
  sourceId,
  targetId,
  onSelectLocation,
}: DemoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const stateLabelMarkersRef = useRef<maplibregl.Marker[]>([]);
  const locationsRef = useRef(locations);
  const onSelectLocationRef = useRef(onSelectLocation);
  const sourceIdRef = useRef(sourceId);
  const targetIdRef = useRef(targetId);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const cityGeoJson = useMemo(() => makeCityGeoJson(locations), [locations]);
  const source = locations.find((location) => location.id === sourceId);
  const target = locations.find((location) => location.id === targetId);

  useEffect(() => {
    locationsRef.current = locations;
    onSelectLocationRef.current = onSelectLocation;
    sourceIdRef.current = sourceId;
    targetIdRef.current = targetId;
  }, [locations, onSelectLocation, sourceId, targetId]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    let disposed = false;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      bounds: US_DISPLAY_BOUNDS,
      fitBoundsOptions: { padding: 18 },
      minZoom: 0.85,
      maxZoom: 8,
      maxBounds: US_DISPLAY_BOUNDS,
      attributionControl: false,
      cooperativeGestures: true,
      renderWorldCopies: false,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    map.on("load", () => {
      map.addSource("states", {
        type: "geojson",
        data: "/us-states-display.geojson",
      });
      map.addSource("cities", {
        type: "geojson",
        data: makeCityGeoJson(locationsRef.current),
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
        filter: EMPTY_STATE_FILTER,
        paint: {
          "fill-color": "#8eb6ad",
          "fill-opacity": 0.36,
        },
      });
      map.addLayer({
        id: "target-state-fill",
        type: "fill",
        source: "states",
        filter: EMPTY_STATE_FILTER,
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
          "circle-color": expression.color,
          "circle-stroke-color": expression.strokeColor,
          "circle-stroke-width": expression.strokeWidth,
          "circle-opacity": 0.95,
        },
      });

      const currentSource = locationsRef.current.find(
        (location) => location.id === sourceIdRef.current,
      );
      const currentTarget = locationsRef.current.find(
        (location) => location.id === targetIdRef.current,
      );
      map.setFilter("source-state-fill", stateFilterFor(currentSource));
      map.setFilter("target-state-fill", stateFilterFor(currentTarget));

      loadStateLabelMarkers(map, stateLabelMarkersRef, () => disposed).catch((error) => {
        console.error(error);
      });

      map.on("mouseenter", "states-fill", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "states-fill", () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("mouseenter", "cities-circle", (event) => {
        map.getCanvas().style.cursor = "pointer";
        const feature = event.features?.[0];
        if (!feature || feature.geometry.type !== "Point") return;
        showCityPopup(
          map,
          popupRef,
          feature.geometry.coordinates as [number, number],
          String(feature.properties?.displayName ?? ""),
        );
      });
      map.on("mouseleave", "cities-circle", () => {
        map.getCanvas().style.cursor = "";
        popupRef.current?.remove();
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

        const stateCity = locationsRef.current.find(
          (location) => location.countyFips.slice(0, 2) === stateFips,
        );
        if (stateCity) {
          onSelectLocationRef.current(stateCity.id);
        }
      });

      map.on("click", "cities-circle", (event) => {
        const feature = event.features?.[0];
        if (!feature || feature.geometry.type !== "Point") return;
        const cityId = String(feature.properties?.id ?? "");
        const cityName = String(feature.properties?.displayName ?? "");
        const coordinates = feature.geometry.coordinates as [number, number];
        onSelectLocationRef.current(cityId);
        showCityPopup(map, popupRef, coordinates, cityName);
      });
    });

    return () => {
      disposed = true;
      clearStateLabelMarkers(stateLabelMarkersRef);
      popupRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    const sourceData = map.getSource("cities") as GeoJSONSource | undefined;
    sourceData?.setData(cityGeoJson);
  }, [cityGeoJson]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    updateCityPaint(map, sourceId, targetId);
    map.setFilter("source-state-fill", stateFilterFor(source));
    map.setFilter("target-state-fill", stateFilterFor(target));

    const focus = target ?? source;
    setSelectedState(focus?.stateName ?? null);
  }, [source, sourceId, target, targetId]);

  return (
    <section className="map-panel" aria-label="Interactive U.S. city selector map">
      <div className="section-heading">
        <p className="eyebrow">Interactive U.S. map</p>
        <h3>Pick cities on the map</h3>
      </div>
      <div className="map-canvas">
        <div className="maplibre-map" ref={mapContainerRef} />
      </div>
      <div className="map-summary">
        <div>
          <span>Source</span>
          <strong>{source?.displayName ?? "Not selected"}</strong>
        </div>
        <div>
          <span>Target</span>
          <strong>{target?.displayName ?? "Not selected"}</strong>
        </div>
        <div>
          <span>State focus</span>
          <strong>{selectedState ?? "United States"}</strong>
        </div>
      </div>
    </section>
  );
}
