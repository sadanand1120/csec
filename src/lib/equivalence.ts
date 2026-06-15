import { V0_DATA } from "./v0Data";
import { loadTaxCurveMap } from "./cityTaxCurves";
import type {
  Basket,
  EquivalenceResult,
  ExpenseCategory,
  LocationProfile,
  NonHousingExpenseCategory,
  TaxBreakdown,
  V0BasketBand,
  V0TaxCurve,
} from "./types";

const NONHOUSING_CATEGORIES: NonHousingExpenseCategory[] = [
  "food",
  "transportation",
  "healthcare",
  "internet_mobile",
  "other_nonhousing",
];

export const LOCATIONS = V0_DATA.locations;
export const DEFAULT_SOURCE_ID = V0_DATA.defaultSourceId;
export const DEFAULT_TARGET_ID = V0_DATA.defaultTargetId;
export const DEFAULT_GROSS_INCOME = V0_DATA.defaultGrossIncome;
export const MODEL_VERSION = V0_DATA.modelVersion;
export const FIXED_PROFILE = V0_DATA.fixedProfile;

const DATA_VINTAGE = Object.fromEntries(
  Object.entries(V0_DATA.sources).map(([key, source]) => [key, source.vintage]),
);

export type HeatmapValue = {
  location: LocationProfile;
  factor: number;
  equivalentSalary: number;
  confidence: "high" | "medium" | "low";
};

export function getLocation(locationId: string) {
  const location = LOCATIONS.find((entry) => entry.id === locationId);
  if (!location) {
    throw new Error(`Unknown location: ${locationId}`);
  }
  return location;
}

function pickBasketBand(grossIncome: number): V0BasketBand {
  const band = V0_DATA.basketBands.find(
    (entry) =>
      grossIncome >= entry.minGrossIncome &&
      (entry.maxGrossIncome === null || grossIncome < entry.maxGrossIncome),
  );
  return band ?? V0_DATA.basketBands[V0_DATA.basketBands.length - 1];
}

function categoryPriceMultiplier(
  location: LocationProfile,
  category: NonHousingExpenseCategory,
) {
  const weights = V0_DATA.categoryPriceWeights[category];
  return Object.entries(weights).reduce((sum, [indexKey, weight]) => {
    if (weight === undefined) return sum;
    const priceIndex = location.priceIndex[indexKey as keyof LocationProfile["priceIndex"]];
    return sum + (priceIndex / 100) * weight;
  }, 0);
}

function buildSourceBasket(location: LocationProfile, grossIncome: number): Basket {
  const band = pickBasketBand(grossIncome);
  const categories: Record<ExpenseCategory, number> = {
    housing: location.annualRent1Br,
    food: 0,
    transportation: 0,
    healthcare: 0,
    internet_mobile: 0,
    other_nonhousing: 0,
  };

  for (const category of NONHOUSING_CATEGORIES) {
    categories[category] = band.nationalAnnual[category] * categoryPriceMultiplier(location, category);
  }

  return {
    categories,
    total: Object.values(categories).reduce((sum, value) => sum + value, 0),
  };
}

function repriceBasket(
  sourceBasket: Basket,
  source: LocationProfile,
  target: LocationProfile,
): Basket {
  const categories: Record<ExpenseCategory, number> = {
    housing: target.annualRent1Br,
    food: 0,
    transportation: 0,
    healthcare: 0,
    internet_mobile: 0,
    other_nonhousing: 0,
  };

  for (const category of NONHOUSING_CATEGORIES) {
    const sourceMultiplier = categoryPriceMultiplier(source, category);
    const targetMultiplier = categoryPriceMultiplier(target, category);
    categories[category] = sourceBasket.categories[category] * (targetMultiplier / sourceMultiplier);
  }

  return {
    categories,
    total: Object.values(categories).reduce((sum, value) => sum + value, 0),
  };
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

function taxCurveFor(
  curves: Record<string, V0TaxCurve>,
  location: LocationProfile,
): V0TaxCurve {
  const curve = curves[location.id];
  if (!curve) {
    throw new Error(`Missing tax curve for ${location.id}`);
  }
  return curve;
}

function estimateTax(
  grossIncome: number,
  location: LocationProfile,
  curves: Record<string, V0TaxCurve>,
): TaxBreakdown {
  const curve = taxCurveFor(curves, location);
  const grossGrid = curve.grossIncome;
  const totalTax = interpolate(grossGrid, curve.totalTax, grossIncome);

  return {
    federalIncomeTax: interpolate(grossGrid, curve.federalIncomeTax, grossIncome),
    stateIncomeTax: interpolate(grossGrid, curve.stateIncomeTax, grossIncome),
    payrollTaxEmployee: interpolate(grossGrid, curve.payrollTaxEmployee, grossIncome),
    localIncomeTax: interpolate(grossGrid, curve.localIncomeTax, grossIncome),
    statePayrollItems: interpolate(grossGrid, curve.statePayrollItems, grossIncome),
    taxComponentResidual: interpolate(grossGrid, curve.taxComponentResidual, grossIncome),
    totalTax,
    netIncome: grossIncome - totalTax,
    effectiveRate: grossIncome <= 0 ? 0 : totalTax / grossIncome,
  };
}

function interpolationBounds(xs: readonly number[], ys: readonly number[], x: number) {
  const lastIndex = xs.length - 1;
  let low = 0;
  let high = 1;

  if (x >= xs[lastIndex]) {
    low = lastIndex - 1;
    high = lastIndex;
  } else if (x > xs[0]) {
    high = lastIndex;
    while (low + 1 < high) {
      const mid = Math.floor((low + high) / 2);
      if (xs[mid] <= x) {
        low = mid;
      } else {
        high = mid;
      }
    }
  }

  return {
    grossLow: ys[low],
    netLow: xs[low],
    grossHigh: ys[high],
    netHigh: xs[high],
  };
}

function grossRequiredForNet(
  netIncome: number,
  location: LocationProfile,
  curves: Record<string, V0TaxCurve>,
) {
  const curve = taxCurveFor(curves, location);
  return {
    grossIncome: interpolate(curve.netIncome, curve.grossIncome, netIncome),
    bounds: interpolationBounds(curve.netIncome, curve.grossIncome, netIncome),
  };
}

function nonhousingTotal(basket: Basket) {
  return NONHOUSING_CATEGORIES.reduce((sum, category) => sum + basket.categories[category], 0);
}

function confidenceFor(source: LocationProfile, target: LocationProfile): "high" | "medium" | "low" {
  if (source.confidence === "low" || target.confidence === "low") return "low";
  if (source.confidence === "medium" || target.confidence === "medium") return "medium";
  return "high";
}

function computeEquivalenceWithCurves(
  sourceLocationId: string,
  targetLocationId: string,
  sourceGrossIncome: number,
  curves: Record<string, V0TaxCurve>,
): EquivalenceResult {
  const source = getLocation(sourceLocationId);
  const target = getLocation(targetLocationId);
  const sourceTax = estimateTax(sourceGrossIncome, source, curves);
  const sourceBasket = buildSourceBasket(source, sourceGrossIncome);
  const targetBasket = repriceBasket(sourceBasket, source, target);
  const sourceSurplus = sourceTax.netIncome - sourceBasket.total;
  const requiredTargetNetIncome = targetBasket.total + sourceSurplus;
  const targetGross = grossRequiredForNet(requiredTargetNetIncome, target, curves);
  const targetEquivalentGrossIncome = targetGross.grossIncome;
  const targetTax = estimateTax(targetEquivalentGrossIncome, target, curves);
  const targetSurplus = targetTax.netIncome - targetBasket.total;
  const targetTaxDelta = targetTax.totalTax - sourceTax.totalTax;
  const warnings = Array.from(
    new Set([
      "Fixed profile only: single U.S. citizen, W-2 wages, single filer, no children, renter living alone in a 1BR apartment.",
      `${source.displayName} resolves to ${source.countyName}; ${target.displayName} resolves to ${target.countyName}.`,
      "HUD FMR is a gross-rent affordability standard, not a live apartment listing or owner-cost estimate.",
      "BEA RPP is metro-level; city-neighborhood variation inside each metro is not modeled in v0.",
      "BLS CEX COLB inputs are national single-person renter wage/salary consumer-unit averages by income band, then CPI-adjusted and repriced by BEA metro indices.",
      "Tax component lines are explanatory; total tax and net income are anchored to PolicyEngine household_tax.",
      "RSUs, bonuses, retirement contributions, itemized deductions, AMT, moving costs, owner costs, and employer benefits are excluded.",
      source.resolutionNote,
      target.resolutionNote,
    ]),
  );

  return {
    source,
    target,
    sourceGrossIncome,
    targetEquivalentGrossIncome,
    factor: targetEquivalentGrossIncome / sourceGrossIncome,
    sourceTax,
    targetTax,
    sourceBasket,
    targetBasket,
    sourceSurplus,
    targetSurplus,
    requiredTargetNetIncome,
    targetTaxInterpolation: targetGross.bounds,
    breakdown: {
      housingDelta: targetBasket.categories.housing - sourceBasket.categories.housing,
      nonhousingDelta: nonhousingTotal(targetBasket) - nonhousingTotal(sourceBasket),
      targetTaxDelta,
      grossUpDueToTaxes: targetEquivalentGrossIncome - requiredTargetNetIncome,
    },
    warnings,
    confidence: confidenceFor(source, target),
    modelVersion: MODEL_VERSION,
    dataVintage: DATA_VINTAGE,
  };
}

export async function computeEquivalence(
  sourceLocationId: string,
  targetLocationId: string,
  sourceGrossIncome: number,
): Promise<EquivalenceResult> {
  const curves = await loadTaxCurveMap([sourceLocationId, targetLocationId]);
  return computeEquivalenceWithCurves(sourceLocationId, targetLocationId, sourceGrossIncome, curves);
}

export async function computeHeatmap(
  sourceLocationId: string,
  sourceGrossIncome: number,
): Promise<HeatmapValue[]> {
  const locationIds = LOCATIONS.map((location) => location.id);
  const curves = await loadTaxCurveMap([sourceLocationId, ...locationIds]);

  return LOCATIONS.map((location) => {
    const result = computeEquivalenceWithCurves(
      sourceLocationId,
      location.id,
      sourceGrossIncome,
      curves,
    );
    return {
      location,
      factor: result.factor,
      equivalentSalary: result.targetEquivalentGrossIncome,
      confidence: result.confidence,
    };
  });
}
