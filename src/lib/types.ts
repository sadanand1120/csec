export type ExpenseCategory =
  | "housing"
  | "food"
  | "transportation"
  | "healthcare"
  | "internet_mobile"
  | "other_nonhousing";

export type TaxBreakdown = {
  federalIncomeTax: number;
  stateIncomeTax: number;
  payrollTaxEmployee: number;
  localIncomeTax: number;
  statePayrollItems: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
};

export type LocationProfile = {
  id: string;
  displayName: string;
  shortName: string;
  countyName: string;
  state: string;
  stateName: string;
  cbsaName: string;
  computationLocationId: string;
  lat: number;
  lon: number;
  mapX: number;
  mapY: number;
  annualRent1Br: number;
  priceIndex: Record<Exclude<ExpenseCategory, "housing">, number>;
  confidence: "high" | "medium" | "low";
  notes: string[];
};

export type Basket = {
  categories: Record<ExpenseCategory, number>;
  total: number;
};

export type EquivalenceResult = {
  source: LocationProfile;
  target: LocationProfile;
  sourceGrossIncome: number;
  targetEquivalentGrossIncome: number;
  factor: number;
  sourceTax: TaxBreakdown;
  targetTax: TaxBreakdown;
  sourceBasket: Basket;
  targetBasket: Basket;
  sourceSurplus: number;
  targetSurplus: number;
  requiredTargetNetIncome: number;
  breakdown: {
    housingDelta: number;
    nonhousingDelta: number;
    targetTaxDelta: number;
    grossUpDueToTaxes: number;
  };
  warnings: string[];
  confidence: "high" | "medium" | "low";
  modelVersion: string;
  dataVintage: Record<string, string>;
};
