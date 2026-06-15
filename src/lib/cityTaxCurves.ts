import type { V0TaxCurve } from "./types";

type CityTaxCurveModule = {
  CITY_TAX_CURVE: V0TaxCurve;
};

const LOADERS: Record<string, () => Promise<CityTaxCurveModule>> = {
  "PLACE:4805000": () => import("./cities/austinTx"),
  "PLACE:0677000": () => import("./cities/sunnyvaleCa"),
  "PLACE:3651000": () => import("./cities/newYorkNy"),
  "PLACE:5363000": () => import("./cities/seattleWa"),
  "PLACE:0820000": () => import("./cities/denverCo"),
  "PLACE:3755000": () => import("./cities/raleighNc"),
};

const CACHE = new Map<string, Promise<V0TaxCurve>>();

export function loadTaxCurve(locationId: string): Promise<V0TaxCurve> {
  const loader = LOADERS[locationId];
  if (!loader) {
    throw new Error(`Missing city tax curve loader for ${locationId}`);
  }

  let cached = CACHE.get(locationId);
  if (!cached) {
    cached = loader().then((module) => module.CITY_TAX_CURVE);
    CACHE.set(locationId, cached);
  }

  return cached;
}

export async function loadTaxCurveMap(
  locationIds: readonly string[],
): Promise<Record<string, V0TaxCurve>> {
  const entries = await Promise.all(
    locationIds.map(async (locationId) => [locationId, await loadTaxCurve(locationId)] as const),
  );
  return Object.fromEntries(entries);
}
