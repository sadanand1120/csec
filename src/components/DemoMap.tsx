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
import { estimateCityBasket } from "../lib/equivalence";
import { formatCurrency, formatPercent } from "../lib/format";
import {
  interpolateMapTaxRate,
  loadMapTaxMetricBundle,
  type MapTaxMetricBundle,
  type MapTaxMetricKind,
} from "../lib/mapTaxMetrics";
import type { Basket, ExpenseCategory, LocationProfile } from "../lib/types";

type DemoMapProps = {
  locations: readonly LocationProfile[];
  sourceId: string | null;
  targetId: string | null;
  salary: number;
  onSelectLocation: (locationId: string) => void;
};

type MapViewId =
  | "standard"
  | "federal_tax_rate"
  | "state_tax_rate"
  | "total_tax_rate"
  | "housing"
  | "medical"
  | "transport"
  | "cost_of_living";

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
    dotColor: string;
    metricLabel: string;
    metricText: string;
  };
};

type CityFeatureCollection = {
  type: "FeatureCollection";
  features: CityFeature[];
};

type Coordinate = [number, number];

type CityVoronoiFeature = {
  type: "Feature";
  geometry: {
    type: "MultiPolygon";
    coordinates: Coordinate[][][];
  };
  properties: {
    id: string;
    displayName: string;
    stateFips: string;
    fillColor?: string;
    hasMetric?: boolean;
  };
};

type CityVoronoiFeatureCollection = {
  type: "FeatureCollection";
  features: CityVoronoiFeature[];
};

type MetricKind = "rate" | "currency";

type MapViewConfig = {
  id: MapViewId;
  label: string;
  legendLabel: string;
  hoverLabel: string;
  kind?: MetricKind;
  taxMetric?: MapTaxMetricKind;
  basketMetric?: ExpenseCategory | "total";
};

type MetricState =
  | {
      values: Map<string, number>;
      min: number;
      max: number;
      loading: false;
      message: string | null;
    }
  | {
      values: Map<string, number>;
      min: null;
      max: null;
      loading: boolean;
      message: string | null;
    };

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
const STANDARD_CITY_COLOR = "#38545b";
const SOURCE_CITY_COLOR = "#137b70";
const TARGET_CITY_COLOR = "#d79a26";
const LOW_METRIC_COLOR = "#137b70";
const MID_METRIC_COLOR = "#d79a26";
const HIGH_METRIC_COLOR = "#9f2f45";
const NO_WASH_COLOR = "#ffffff";
const EMPTY_CITY_VORONOI_GEOJSON: CityVoronoiFeatureCollection = {
  type: "FeatureCollection",
  features: [],
};
const DOT_COLOR_EXPRESSION = ["get", "dotColor"] as ExpressionSpecification;
const TAX_VIEW_IDS = new Set<MapViewId>([
  "federal_tax_rate",
  "state_tax_rate",
  "total_tax_rate",
]);
const MAP_VIEW_CONFIGS: MapViewConfig[] = [
  {
    id: "standard",
    label: "Standard",
    legendLabel: "Standard city selector",
    hoverLabel: "",
  },
  {
    id: "federal_tax_rate",
    label: "Fed tax %",
    legendLabel: "Federal income tax + FICA as share of gross salary",
    hoverLabel: "Fed + FICA tax",
    kind: "rate",
    taxMetric: "federal",
  },
  {
    id: "state_tax_rate",
    label: "State/local tax %",
    legendLabel: "State, local, and residual tax as share of gross salary",
    hoverLabel: "State/local tax",
    kind: "rate",
    taxMetric: "state",
  },
  {
    id: "total_tax_rate",
    label: "Total tax %",
    legendLabel: "Total effective tax as share of gross salary",
    hoverLabel: "Total tax",
    kind: "rate",
    taxMetric: "total",
  },
  {
    id: "housing",
    label: "Housing",
    legendLabel: "Annual one-bedroom housing cost",
    hoverLabel: "Housing",
    kind: "currency",
    basketMetric: "housing",
  },
  {
    id: "medical",
    label: "Medical",
    legendLabel: "Annual medical spending inside the living-cost basket",
    hoverLabel: "Medical",
    kind: "currency",
    basketMetric: "healthcare",
  },
  {
    id: "transport",
    label: "Transport",
    legendLabel: "Annual transportation spending inside the living-cost basket",
    hoverLabel: "Transport",
    kind: "currency",
    basketMetric: "transportation",
  },
  {
    id: "cost_of_living",
    label: "Cost of living",
    legendLabel: "Annual cost-of-living basket, excluding taxes",
    hoverLabel: "Cost of living",
    kind: "currency",
    basketMetric: "total",
  },
];
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

function activeViewConfig(viewId: MapViewId) {
  return MAP_VIEW_CONFIGS.find((config) => config.id === viewId) ?? MAP_VIEW_CONFIGS[0];
}

function publicAssetPath(filename: string) {
  return `${import.meta.env.BASE_URL}${filename}`;
}

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function blendHex(startHex: string, endHex: string, amount: number) {
  const start = hexToRgb(startHex);
  const end = hexToRgb(endHex);
  const mix = (from: number, to: number) => Math.round(from + (to - from) * amount);
  return `#${[mix(start.r, end.r), mix(start.g, end.g), mix(start.b, end.b)]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function metricColor(value: number, min: number, max: number) {
  if (max <= min) return MID_METRIC_COLOR;
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
  if (normalized <= 0.5) {
    return blendHex(LOW_METRIC_COLOR, MID_METRIC_COLOR, normalized * 2);
  }
  return blendHex(MID_METRIC_COLOR, HIGH_METRIC_COLOR, (normalized - 0.5) * 2);
}

function formatMetric(value: number, kind: MetricKind) {
  return kind === "rate" ? `${formatPercent(value)} of gross` : `${formatCurrency(value)} / yr`;
}

function selectedDotColor(locationId: string, sourceId: string | null, targetId: string | null) {
  if (locationId === sourceId) return SOURCE_CITY_COLOR;
  if (locationId === targetId) return TARGET_CITY_COLOR;
  return STANDARD_CITY_COLOR;
}

function cityDotColor(
  locationId: string,
  sourceId: string | null,
  targetId: string | null,
  viewId: MapViewId,
  metricState: MetricState,
) {
  if (viewId === "standard" || metricState.min === null || metricState.max === null) {
    return selectedDotColor(locationId, sourceId, targetId);
  }

  const value = metricState.values.get(locationId);
  return value === undefined
    ? selectedDotColor(locationId, sourceId, targetId)
    : metricColor(value, metricState.min, metricState.max);
}

function cityMetricValue(locationId: string, metricState: MetricState) {
  if (metricState.min === null || metricState.max === null) return null;
  const value = metricState.values.get(locationId);
  return value === undefined || !Number.isFinite(value) ? null : value;
}

function makeCityGeoJson(
  locations: readonly LocationProfile[],
  viewConfig: MapViewConfig,
  viewId: MapViewId,
  metricState: MetricState,
  sourceId: string | null,
  targetId: string | null,
): CityFeatureCollection {
  return {
    type: "FeatureCollection",
    features: locations.map((location) => {
      const metricValue = cityMetricValue(location.id, metricState);
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: displayCoordinate(
            [location.lon, location.lat],
            location.countyFips.slice(0, 2),
          ),
        },
        properties: {
          id: location.id,
          stateFips: location.countyFips.slice(0, 2),
          displayName: location.displayName,
          shortName: location.shortName,
          dotColor: cityDotColor(location.id, sourceId, targetId, viewId, metricState),
          metricLabel: viewId === "standard" ? "" : viewConfig.hoverLabel,
          metricText:
            viewConfig.kind && metricValue !== null
              ? formatMetric(metricValue, viewConfig.kind)
              : metricState.message ?? "",
        },
      };
    }),
  };
}

function makeCityVoronoiGeoJson(
  cells: CityVoronoiFeatureCollection | null,
  viewId: MapViewId,
  metricState: MetricState,
): CityVoronoiFeatureCollection {
  if (!cells || viewId === "standard" || metricState.min === null || metricState.max === null) {
    return EMPTY_CITY_VORONOI_GEOJSON;
  }

  return {
    type: "FeatureCollection",
    features: cells.features.map((cell) => {
      const value = metricState.values.get(cell.properties.id);
      const hasMetric = value !== undefined && Number.isFinite(value);
      return {
        ...cell,
        properties: {
          ...cell.properties,
          hasMetric,
          fillColor: hasMetric ? metricColor(value, metricState.min, metricState.max) : NO_WASH_COLOR,
        },
      };
    }),
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
    color: DOT_COLOR_EXPRESSION,
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

function updateSelectionLayers(
  map: MapLibreMap,
  source: LocationProfile | undefined,
  target: LocationProfile | undefined,
  showStateSelection: boolean,
) {
  const sourceFilter = showStateSelection ? stateFilterFor(source) : EMPTY_STATE_FILTER;
  const targetFilter = showStateSelection ? stateFilterFor(target) : EMPTY_STATE_FILTER;
  if (map.getLayer("source-state-fill")) {
    map.setFilter("source-state-fill", sourceFilter);
  }
  if (map.getLayer("target-state-fill")) {
    map.setFilter("target-state-fill", targetFilter);
  }
  if (map.getLayer("source-state-line")) {
    map.setFilter("source-state-line", sourceFilter);
  }
  if (map.getLayer("target-state-line")) {
    map.setFilter("target-state-line", targetFilter);
  }
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
  metricLabel = "",
  metricText = "",
) {
  popupRef.current?.remove();
  const content = document.createElement("div");
  content.className = "map-popup-content";
  const title = document.createElement("strong");
  title.textContent = cityName;
  content.append(title);
  if (metricText) {
    const detail = document.createElement("span");
    detail.textContent = metricLabel ? `${metricLabel}: ${metricText}` : metricText;
    content.append(detail);
  }
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
  const response = await fetch(publicAssetPath("us-state-labels-display.geojson"));
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
  salary,
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
  const mapViewRef = useRef<MapViewId>("standard");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [mapView, setMapView] = useState<MapViewId>("standard");
  const [taxMetricBundle, setTaxMetricBundle] = useState<MapTaxMetricBundle | null>(null);
  const [cityVoronoiCells, setCityVoronoiCells] =
    useState<CityVoronoiFeatureCollection | null>(null);
  const [taxMetricStatus, setTaxMetricStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );
  const viewConfig = activeViewConfig(mapView);
  const salaryReady = Number.isFinite(salary) && salary > 0;
  const needsTaxCurves = TAX_VIEW_IDS.has(mapView);
  const metricState = useMemo<MetricState>(() => {
    if (mapView === "standard") {
      return { values: new Map(), min: null, max: null, loading: false, message: null };
    }
    if (!salaryReady) {
      return {
        values: new Map(),
        min: null,
        max: null,
        loading: false,
        message: "Enter a gross salary to activate this view.",
      };
    }
    if (viewConfig.taxMetric) {
      if (taxMetricStatus === "error") {
        return {
          values: new Map(),
          min: null,
          max: null,
          loading: false,
          message: "Could not load map tax metrics.",
        };
      }
      if (!taxMetricBundle) {
        return {
          values: new Map(),
          min: null,
          max: null,
          loading: true,
          message: "Loading map tax metrics.",
        };
      }
    }

    const values = new Map<string, number>();
    for (const location of locations) {
      if (viewConfig.taxMetric && taxMetricBundle) {
        values.set(
          location.id,
          interpolateMapTaxRate(taxMetricBundle, location.id, salary, viewConfig.taxMetric),
        );
      } else if (viewConfig.basketMetric) {
        const basket: Basket = estimateCityBasket(location, salary);
        values.set(
          location.id,
          viewConfig.basketMetric === "total"
            ? basket.total
            : basket.categories[viewConfig.basketMetric],
        );
      }
    }

    const finiteValues = [...values.values()].filter((value) => Number.isFinite(value));
    if (finiteValues.length === 0) {
      return { values, min: null, max: null, loading: false, message: null };
    }
    return {
      values,
      min: Math.min(...finiteValues),
      max: Math.max(...finiteValues),
      loading: false,
      message: null,
    };
  }, [locations, mapView, salary, salaryReady, taxMetricBundle, taxMetricStatus, viewConfig]);
  const cityGeoJson = useMemo(
    () => makeCityGeoJson(locations, viewConfig, mapView, metricState, sourceId, targetId),
    [locations, mapView, metricState, sourceId, targetId, viewConfig],
  );
  const cityVoronoiGeoJson = useMemo(
    () => makeCityVoronoiGeoJson(cityVoronoiCells, mapView, metricState),
    [cityVoronoiCells, mapView, metricState],
  );
  const source = locations.find((location) => location.id === sourceId);
  const target = locations.find((location) => location.id === targetId);

  useEffect(() => {
    if (mapView === "standard" || cityVoronoiCells) return;
    let cancelled = false;
    fetch(publicAssetPath("city-voronoi-cells.geojson"))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load city map cells: ${response.status}`);
        }
        return response.json() as Promise<CityVoronoiFeatureCollection>;
      })
      .then((cells) => {
        if (!cancelled) {
          setCityVoronoiCells(cells);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      cancelled = true;
    };
  }, [cityVoronoiCells, mapView]);

  useEffect(() => {
    if (!needsTaxCurves || !salaryReady || taxMetricBundle) return;
    let cancelled = false;
    setTaxMetricStatus("loading");
    loadMapTaxMetricBundle()
      .then((bundle) => {
        if (!cancelled) {
          setTaxMetricBundle(bundle);
          setTaxMetricStatus("ready");
        }
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) {
          setTaxMetricStatus("error");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [needsTaxCurves, salaryReady, taxMetricBundle]);

  useEffect(() => {
    locationsRef.current = locations;
    onSelectLocationRef.current = onSelectLocation;
    sourceIdRef.current = sourceId;
    targetIdRef.current = targetId;
    mapViewRef.current = mapView;
  }, [locations, mapView, onSelectLocation, sourceId, targetId]);

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
        data: publicAssetPath("us-states-display.geojson"),
      });
      map.addSource("cities", {
        type: "geojson",
        data: cityGeoJson,
      });
      map.addSource("city-voronoi", {
        type: "geojson",
        data: EMPTY_CITY_VORONOI_GEOJSON,
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
        id: "city-voronoi-fill",
        type: "fill",
        source: "city-voronoi",
        paint: {
          "fill-color": ["get", "fillColor"] as ExpressionSpecification,
          "fill-opacity": [
            "case",
            ["==", ["get", "hasMetric"], true],
            0.58,
            0,
          ] as ExpressionSpecification,
        },
      });
      map.addLayer({
        id: "city-voronoi-line",
        type: "line",
        source: "city-voronoi",
        paint: {
          "line-color": "#ffffff",
          "line-opacity": [
            "case",
            ["==", ["get", "hasMetric"], true],
            0.28,
            0,
          ] as ExpressionSpecification,
          "line-width": 0.35,
        },
      });
      map.addLayer({
        id: "source-state-fill",
        type: "fill",
        source: "states",
        filter: EMPTY_STATE_FILTER,
        paint: {
          "fill-color": "#8eb6ad",
          "fill-opacity": 0.44,
        },
      });
      map.addLayer({
        id: "target-state-fill",
        type: "fill",
        source: "states",
        filter: EMPTY_STATE_FILTER,
        paint: {
          "fill-color": "#f0b429",
          "fill-opacity": 0.42,
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
      map.addLayer({
        id: "source-state-line",
        type: "line",
        source: "states",
        filter: EMPTY_STATE_FILTER,
        paint: {
          "line-color": "#0d332f",
          "line-width": 2.1,
          "line-opacity": 0.88,
        },
      });
      map.addLayer({
        id: "target-state-line",
        type: "line",
        source: "states",
        filter: EMPTY_STATE_FILTER,
        paint: {
          "line-color": "#b9780a",
          "line-width": 2.1,
          "line-opacity": 0.9,
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
      updateSelectionLayers(map, currentSource, currentTarget, mapViewRef.current === "standard");

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
        const properties = feature.properties ?? {};
        showCityPopup(
          map,
          popupRef,
          feature.geometry.coordinates as [number, number],
          String(properties.displayName ?? ""),
          String(properties.metricLabel ?? ""),
          String(properties.metricText ?? ""),
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
      });

      map.on("click", "cities-circle", (event) => {
        const feature = event.features?.[0];
        if (!feature || feature.geometry.type !== "Point") return;
        const cityId = String(feature.properties?.id ?? "");
        const properties = feature.properties ?? {};
        const cityName = String(properties.displayName ?? "");
        const coordinates = feature.geometry.coordinates as [number, number];
        onSelectLocationRef.current(cityId);
        showCityPopup(
          map,
          popupRef,
          coordinates,
          cityName,
          String(properties.metricLabel ?? ""),
          String(properties.metricText ?? ""),
        );
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
    if (!map) return;
    const sourceData = map.getSource("cities") as GeoJSONSource | undefined;
    sourceData?.setData(cityGeoJson);
  }, [cityGeoJson]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const sourceData = map.getSource("city-voronoi") as GeoJSONSource | undefined;
    sourceData?.setData(cityVoronoiGeoJson);
  }, [cityVoronoiGeoJson]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    updateCityPaint(map, sourceId, targetId);
    updateSelectionLayers(map, source, target, mapView === "standard");

    const focus = target ?? source;
    setSelectedState(focus?.stateName ?? null);
  }, [mapView, source, sourceId, target, targetId]);

  return (
    <section className="map-panel" aria-label="Interactive U.S. city selector map">
      <div className="section-heading">
        <p className="eyebrow">Interactive U.S. map</p>
        <h3>Pick cities on the map</h3>
      </div>
      <div className="map-toolbar" aria-label="Map view selector">
        <span>Map view</span>
        <div className="map-view-buttons">
          {MAP_VIEW_CONFIGS.map((config) => (
            <button
              aria-pressed={mapView === config.id}
              className="map-view-button"
              key={config.id}
              onClick={() => setMapView(config.id)}
              type="button"
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>
      {mapView !== "standard" && (
        <div className="map-legend" aria-live="polite">
          <div>
            <strong>{viewConfig.legendLabel}</strong>
            {metricState.message && <span>{metricState.message}</span>}
          </div>
          {metricState.min !== null && metricState.max !== null && viewConfig.kind && (
            <div className="legend-scale" aria-label="Color scale">
              <div className="legend-bar" />
              <div className="legend-labels">
                <span>{formatMetric(metricState.min, viewConfig.kind)}</span>
                <span>{formatMetric((metricState.min + metricState.max) / 2, viewConfig.kind)}</span>
                <span>{formatMetric(metricState.max, viewConfig.kind)}</span>
              </div>
            </div>
          )}
        </div>
      )}
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
