import {
  DATA_VINTAGE,
  DEMO_LOCATIONS,
  DISCRETIONARY_GROSS_SHARE,
  MODEL_VERSION,
  NATIONAL_BASELINE_EXPENSES,
  OTHER_BASELINE_EXPENSE,
} from "./demoData";
import { estimateTax, grossRequiredForNet } from "./tax";
import type { Basket, EquivalenceResult, ExpenseCategory, LocationProfile } from "./types";

const NONHOUSING_CATEGORIES: Exclude<ExpenseCategory, "housing">[] = [
  "food",
  "transportation",
  "healthcare",
  "internet_mobile",
  "other_nonhousing",
];

export function getLocation(locationId: string) {
  const location = DEMO_LOCATIONS.find((entry) => entry.id === locationId);
  if (!location) {
    throw new Error(`Unknown location: ${locationId}`);
  }
  return location;
}

function buildSourceBasket(location: LocationProfile, grossIncome: number): Basket {
  const categories = {
    housing: location.annualRent1Br,
    food: NATIONAL_BASELINE_EXPENSES.food * (location.priceIndex.food / 100),
    transportation:
      NATIONAL_BASELINE_EXPENSES.transportation * (location.priceIndex.transportation / 100),
    healthcare: NATIONAL_BASELINE_EXPENSES.healthcare * (location.priceIndex.healthcare / 100),
    internet_mobile:
      NATIONAL_BASELINE_EXPENSES.internet_mobile * (location.priceIndex.internet_mobile / 100),
    other_nonhousing:
      (OTHER_BASELINE_EXPENSE + grossIncome * DISCRETIONARY_GROSS_SHARE) *
      (location.priceIndex.other_nonhousing / 100),
  };

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
    const sourceIndex = source.priceIndex[category];
    const targetIndex = target.priceIndex[category];
    categories[category] = sourceBasket.categories[category] * (targetIndex / sourceIndex);
  }

  return {
    categories,
    total: Object.values(categories).reduce((sum, value) => sum + value, 0),
  };
}

function nonhousingTotal(basket: Basket) {
  return NONHOUSING_CATEGORIES.reduce((sum, category) => sum + basket.categories[category], 0);
}

function confidenceFor(source: LocationProfile, target: LocationProfile): "high" | "medium" | "low" {
  if (source.id === target.id) return "high";
  if (source.confidence === "low" || target.confidence === "low") return "low";
  return "medium";
}

export function computeEquivalence(
  sourceLocationId: string,
  targetLocationId: string,
  sourceGrossIncome: number,
): EquivalenceResult {
  const source = getLocation(sourceLocationId);
  const target = getLocation(targetLocationId);
  const sourceTax = estimateTax(sourceGrossIncome, source);
  const sourceBasket = buildSourceBasket(source, sourceGrossIncome);
  const targetBasket = repriceBasket(sourceBasket, source, target);
  const sourceSurplus = sourceTax.netIncome - sourceBasket.total;
  const requiredTargetNetIncome = targetBasket.total + sourceSurplus;
  const targetEquivalentGrossIncome = grossRequiredForNet(requiredTargetNetIncome, target);
  const targetTax = estimateTax(targetEquivalentGrossIncome, target);
  const targetSurplus = targetTax.netIncome - targetBasket.total;
  const sourceTaxAtEquivalentGross = estimateTax(targetEquivalentGrossIncome, source);
  const targetTaxDelta = targetTax.totalTax - sourceTax.totalTax;
  const grossUpDueToTaxes =
    targetEquivalentGrossIncome - sourceGrossIncome - (targetBasket.total - sourceBasket.total);
  const warnings = Array.from(
    new Set([
      "This local demo uses temporary six-location fixture data, not final public ETL outputs.",
      `${source.displayName} resolves to ${source.countyName}; ${target.displayName} resolves to ${target.countyName}.`,
      "Default rent is shaped like HUD FMR 1BR data, but these demo values are placeholders.",
      "RSUs, bonuses, relocation costs, owner costs, and employer-specific benefits are not modeled.",
      ...source.notes,
      ...target.notes,
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
    breakdown: {
      housingDelta: targetBasket.categories.housing - sourceBasket.categories.housing,
      nonhousingDelta: nonhousingTotal(targetBasket) - nonhousingTotal(sourceBasket),
      targetTaxDelta,
      grossUpDueToTaxes:
        grossUpDueToTaxes - (sourceTaxAtEquivalentGross.totalTax - sourceTax.totalTax),
    },
    warnings,
    confidence: confidenceFor(source, target),
    modelVersion: MODEL_VERSION,
    dataVintage: DATA_VINTAGE,
  };
}

export function computeHeatmap(sourceLocationId: string, sourceGrossIncome: number) {
  return DEMO_LOCATIONS.map((location) => {
    const result = computeEquivalence(sourceLocationId, location.id, sourceGrossIncome);
    return {
      location,
      factor: result.factor,
      equivalentSalary: result.targetEquivalentGrossIncome,
      confidence: result.confidence,
    };
  });
}
