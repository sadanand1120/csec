export type MapTaxMetricKind = "federal" | "state" | "total";

export type MapTaxMetricCityCurves = {
  federalBps: readonly number[];
  stateBps: readonly number[];
  totalBps: readonly number[];
};

export type MapTaxMetricBundle = {
  grossIncome: readonly number[];
  cities: Record<string, MapTaxMetricCityCurves>;
};

function publicAssetPath(filename: string) {
  return `${import.meta.env.BASE_URL}${filename}`;
}

export async function loadMapTaxMetricBundle(): Promise<MapTaxMetricBundle> {
  const response = await fetch(publicAssetPath("map-tax-metrics.json"));
  if (!response.ok) {
    throw new Error(`Could not load map tax metrics: ${response.status}`);
  }
  return (await response.json()) as MapTaxMetricBundle;
}

function interpolate(xs: readonly number[], ys: readonly number[], x: number) {
  if (x <= xs[0]) return ys[0];

  const lastIndex = xs.length - 1;
  if (x >= xs[lastIndex]) {
    const slope = (ys[lastIndex] - ys[lastIndex - 1]) / (xs[lastIndex] - xs[lastIndex - 1]);
    return ys[lastIndex] + (x - xs[lastIndex]) * slope;
  }

  let low = 0;
  let high = lastIndex;
  while (low + 1 < high) {
    const mid = Math.floor((low + high) / 2);
    if (xs[mid] <= x) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const span = xs[high] - xs[low];
  const ratio = span === 0 ? 0 : (x - xs[low]) / span;
  return ys[low] + (ys[high] - ys[low]) * ratio;
}

export function interpolateMapTaxRate(
  bundle: MapTaxMetricBundle,
  cityId: string,
  grossIncome: number,
  kind: MapTaxMetricKind,
) {
  const city = bundle.cities[cityId];
  if (!city) {
    throw new Error(`Missing map tax metric curve for ${cityId}`);
  }

  const values =
    kind === "federal" ? city.federalBps : kind === "state" ? city.stateBps : city.totalBps;
  return interpolate(bundle.grossIncome, values, grossIncome) / 10_000;
}
