import type { LocationProfile, TaxBreakdown } from "./types";

const FEDERAL_STANDARD_DEDUCTION_SINGLE = 15_000;
const SOCIAL_SECURITY_WAGE_BASE = 176_100;

type Bracket = {
  upTo: number;
  rate: number;
};

const FEDERAL_SINGLE_BRACKETS: Bracket[] = [
  { upTo: 11_925, rate: 0.1 },
  { upTo: 48_475, rate: 0.12 },
  { upTo: 103_350, rate: 0.22 },
  { upTo: 197_300, rate: 0.24 },
  { upTo: 250_525, rate: 0.32 },
  { upTo: 626_350, rate: 0.35 },
  { upTo: Number.POSITIVE_INFINITY, rate: 0.37 },
];

const CA_SINGLE_BRACKETS: Bracket[] = [
  { upTo: 10_756, rate: 0.01 },
  { upTo: 25_499, rate: 0.02 },
  { upTo: 40_245, rate: 0.04 },
  { upTo: 55_866, rate: 0.06 },
  { upTo: 70_606, rate: 0.08 },
  { upTo: 360_659, rate: 0.093 },
  { upTo: 432_787, rate: 0.103 },
  { upTo: 721_314, rate: 0.113 },
  { upTo: Number.POSITIVE_INFINITY, rate: 0.123 },
];

const NY_SINGLE_BRACKETS: Bracket[] = [
  { upTo: 8_500, rate: 0.04 },
  { upTo: 11_700, rate: 0.045 },
  { upTo: 13_900, rate: 0.0525 },
  { upTo: 80_650, rate: 0.0585 },
  { upTo: 215_400, rate: 0.0625 },
  { upTo: 1_077_550, rate: 0.0685 },
  { upTo: Number.POSITIVE_INFINITY, rate: 0.0965 },
];

function progressiveTax(taxableIncome: number, brackets: Bracket[]) {
  let tax = 0;
  let lower = 0;

  for (const bracket of brackets) {
    if (taxableIncome <= lower) break;
    const amountInBracket = Math.min(taxableIncome, bracket.upTo) - lower;
    tax += amountInBracket * bracket.rate;
    lower = bracket.upTo;
  }

  return Math.max(0, tax);
}

function federalIncomeTax(grossIncome: number) {
  const taxableIncome = Math.max(0, grossIncome - FEDERAL_STANDARD_DEDUCTION_SINGLE);
  return progressiveTax(taxableIncome, FEDERAL_SINGLE_BRACKETS);
}

function employeePayrollTax(grossIncome: number) {
  const socialSecurity = Math.min(grossIncome, SOCIAL_SECURITY_WAGE_BASE) * 0.062;
  const medicare = grossIncome * 0.0145;
  const additionalMedicare = Math.max(0, grossIncome - 200_000) * 0.009;
  return socialSecurity + medicare + additionalMedicare;
}

function stateTax(grossIncome: number, location: LocationProfile) {
  const taxableIncome = Math.max(0, grossIncome - FEDERAL_STANDARD_DEDUCTION_SINGLE);

  if (location.state === "CA") {
    return progressiveTax(Math.max(0, grossIncome - 5_400), CA_SINGLE_BRACKETS);
  }

  if (location.state === "NY") {
    return progressiveTax(Math.max(0, grossIncome - 8_000), NY_SINGLE_BRACKETS);
  }

  if (location.state === "CO") {
    return taxableIncome * 0.044;
  }

  if (location.state === "NC") {
    return taxableIncome * 0.0425;
  }

  return 0;
}

function localIncomeTax(grossIncome: number, location: LocationProfile) {
  if (location.id === "PLACE:3651000") {
    return Math.max(0, grossIncome - 8_000) * 0.03876;
  }

  return 0;
}

function statePayrollItems(grossIncome: number, location: LocationProfile) {
  if (location.state === "CA") {
    return Math.min(grossIncome, 168_600) * 0.011;
  }

  if (location.state === "WA") {
    return grossIncome * 0.0058;
  }

  return 0;
}

export function estimateTax(grossIncome: number, location: LocationProfile): TaxBreakdown {
  const federal = federalIncomeTax(grossIncome);
  const payroll = employeePayrollTax(grossIncome);
  const state = stateTax(grossIncome, location);
  const local = localIncomeTax(grossIncome, location);
  const statePayroll = statePayrollItems(grossIncome, location);
  const totalTax = federal + payroll + state + local + statePayroll;
  const netIncome = grossIncome - totalTax;

  return {
    federalIncomeTax: federal,
    stateIncomeTax: state,
    payrollTaxEmployee: payroll,
    localIncomeTax: local,
    statePayrollItems: statePayroll,
    totalTax,
    netIncome,
    effectiveRate: grossIncome > 0 ? totalTax / grossIncome : 0,
  };
}

export function grossRequiredForNet(requiredNetIncome: number, location: LocationProfile) {
  let low = 0;
  let high = Math.max(requiredNetIncome * 2, 50_000);

  while (estimateTax(high, location).netIncome < requiredNetIncome) {
    high *= 1.5;
  }

  for (let i = 0; i < 80; i += 1) {
    const mid = (low + high) / 2;
    if (estimateTax(mid, location).netIncome < requiredNetIncome) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return Math.round(high / 500) * 500;
}
