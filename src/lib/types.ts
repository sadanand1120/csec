export type ExpenseCategory =
  | "housing"
  | "food"
  | "transportation"
  | "healthcare"
  | "internet_mobile"
  | "other_nonhousing";

export type NonHousingExpenseCategory = Exclude<ExpenseCategory, "housing">;

export type PriceIndexKey = "all" | "goods" | "housing" | "utilities" | "servicesOther";

export type TaxBreakdown = {
  federalIncomeTax: number;
  stateIncomeTax: number;
  payrollTaxEmployee: number;
  localIncomeTax: number;
  statePayrollItems: number;
  taxComponentResidual: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
};

export type LocationProfile = {
  id: string;
  displayName: string;
  shortName: string;
  placeGeoid: string;
  countyFips: string;
  countyName: string;
  state: string;
  stateName: string;
  cbsaCode: string;
  cbsaName: string;
  lat: number;
  lon: number;
  mapX: number;
  mapY: number;
  monthlyRent1Br: number;
  annualRent1Br: number;
  priceIndex: Record<PriceIndexKey, number>;
  taxFlags: {
    inNyc?: boolean;
    denverOccupationalPrivilegeTax?: boolean;
  };
  taxCoverageStatus?: "supported" | "partial_local_missing" | "unsupported";
  taxNotes?: readonly string[];
  resolutionNote: string;
  confidence: "high" | "medium" | "low";
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
  targetTaxInterpolation: {
    grossLow: number;
    netLow: number;
    grossHigh: number;
    netHigh: number;
  };
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

export type BasketBand = {
  id: string;
  label: string;
  minGrossIncome: number;
  maxGrossIncome: number | null;
  sourceYearMinGrossIncome: number;
  sourceYearMaxGrossIncome: number | null;
  nationalAnnual: Record<NonHousingExpenseCategory, number>;
  sourceYearNationalAnnual?: Record<NonHousingExpenseCategory, number>;
  unweightedQuarterRecords: number;
  weightedQuarterRecords?: number;
  filter?: Record<string, string | number>;
  qa?: Record<string, unknown>;
};

export type TaxCurve = {
  grossIncome: readonly number[];
  netIncome: readonly number[];
  netIncomeForInversion?: readonly number[];
  totalTax: readonly number[];
  federalIncomeTax: readonly number[];
  stateIncomeTax: readonly number[];
  payrollTaxEmployee: readonly number[];
  localIncomeTax: readonly number[];
  statePayrollItems: readonly number[];
  taxComponentResidual: readonly number[];
};

export type DataSource = {
  name: string;
  vintage: string;
  url: string;
  notes: string;
};

export type SalaryDataset = {
  modelVersion: string;
  defaultSourceId: string;
  defaultTargetId: string;
  defaultGrossIncome: number;
  taxYear: number;
  dollarNormalization: {
    seriesId: string;
    base: string;
    target: string;
    baseIndex: number;
    targetIndex: number;
    factor: number;
  };
  fixedProfile: {
    filingStatus: "single";
    citizenship: "US citizen";
    incomeType: "W-2 wages only";
    adults: 1;
    children: 0;
    housing: string;
  };
  categoryPriceWeights: Record<NonHousingExpenseCategory, Partial<Record<PriceIndexKey, number>>>;
  basketBands: readonly BasketBand[];
  locations: readonly LocationProfile[];
  sources: Record<string, DataSource>;
};
