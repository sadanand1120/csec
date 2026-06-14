import { useMemo, useState } from "react";
import { formatCurrency, formatPercent } from "../lib/format";
import type {
  EquivalenceResult,
  ExpenseCategory,
  LocationProfile,
  NonHousingExpenseCategory,
  PriceIndexKey,
  TaxBreakdown,
  V0TaxCurve,
} from "../lib/types";
import { V0_DATA } from "../lib/v0Data";

const TAX_CURVES: Record<string, V0TaxCurve> = V0_DATA.taxCurves;

type DetailKind = "source" | "gross" | "tax" | "net" | "colb" | "surplus";

type Detail = {
  id: string;
  title: string;
  value: string;
  kind: DetailKind;
  source: string;
  formula: string;
  notes?: string[];
};

const NONHOUSING_CATEGORIES: NonHousingExpenseCategory[] = [
  "food",
  "transportation",
  "healthcare",
  "internet_mobile",
  "other_nonhousing",
];

const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  housing: "Housing",
  food: "Food",
  transportation: "Transportation",
  healthcare: "Healthcare",
  internet_mobile: "Internet/mobile",
  other_nonhousing: "Other non-housing",
};

function formatIndex(value: number) {
  return value.toFixed(3);
}

function formatMultiplier(value: number) {
  return value.toFixed(6);
}

function pickBasketBand(grossIncome: number) {
  return (
    V0_DATA.basketBands.find(
      (entry) =>
        grossIncome >= entry.minGrossIncome &&
        (entry.maxGrossIncome === null || grossIncome < entry.maxGrossIncome),
    ) ?? V0_DATA.basketBands[V0_DATA.basketBands.length - 1]
  );
}

function categoryPriceMultiplier(location: LocationProfile, category: NonHousingExpenseCategory) {
  const weights = V0_DATA.categoryPriceWeights[category];
  return Object.entries(weights).reduce((sum, [indexKey, weight]) => {
    if (weight === undefined) return sum;
    return sum + (location.priceIndex[indexKey as PriceIndexKey] / 100) * weight;
  }, 0);
}

function taxComponentRows(tax: TaxBreakdown) {
  return [
    ["Federal income tax", tax.federalIncomeTax],
    ["Employee payroll tax", tax.payrollTaxEmployee],
    ["State income tax", tax.stateIncomeTax],
    ["Local income tax", tax.localIncomeTax],
    ["State/local payroll items", tax.statePayrollItems],
    ["Component residual", tax.taxComponentResidual],
  ] as const;
}

function interpolationDetail(result: EquivalenceResult) {
  const curve = TAX_CURVES[result.target.id];
  const requiredNet = result.requiredTargetNetIncome;
  let low = 0;
  let high = curve.netIncome.length - 1;
  while (low + 1 < high) {
    const mid = Math.floor((low + high) / 2);
    if (curve.netIncome[mid] <= requiredNet) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return {
    grossLow: curve.grossIncome[low],
    netLow: curve.netIncome[low],
    grossHigh: curve.grossIncome[high],
    netHigh: curve.netIncome[high],
  };
}

function DetailButton({
  detail,
  activeId,
  onSelect,
  children,
  className = "",
}: {
  detail: Detail;
  activeId: string;
  onSelect: (detail: Detail) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`detail-chip ${detail.kind} ${activeId === detail.id ? "active" : ""} ${className}`}
      type="button"
      onClick={() => onSelect(detail)}
    >
      {children}
    </button>
  );
}

function ExternalInputs({
  result,
  activeId,
  onSelect,
}: {
  result: EquivalenceResult;
  activeId: string;
  onSelect: (detail: Detail) => void;
}) {
  const band = pickBasketBand(result.sourceGrossIncome);
  const cexSummary = [
    `Food ${formatCurrency(band.nationalAnnual.food)}`,
    `Transport ${formatCurrency(band.nationalAnnual.transportation)}`,
    `Healthcare ${formatCurrency(band.nationalAnnual.healthcare)}`,
    `Internet/mobile ${formatCurrency(band.nationalAnnual.internet_mobile)}`,
    `Other ${formatCurrency(band.nationalAnnual.other_nonhousing)}`,
  ].join("; ");
  const rows = [
    {
      label: "Tax county",
      sourceValue: `${result.source.countyName} (${result.source.countyFips})`,
      targetValue: `${result.target.countyName} (${result.target.countyFips})`,
      sourceDetail: `Census geography maps ${result.source.displayName} to ${result.source.countyName} for v0 tax calculation.`,
      targetDetail: `Census geography maps ${result.target.displayName} to ${result.target.countyName} for v0 tax calculation.`,
      dataSource: V0_DATA.sources.census.name,
    },
    {
      label: "Price metro",
      sourceValue: `${result.source.cbsaName} (${result.source.cbsaCode})`,
      targetValue: `${result.target.cbsaName} (${result.target.cbsaCode})`,
      sourceDetail: `BEA Regional Price Parities are read for CBSA ${result.source.cbsaCode}.`,
      targetDetail: `BEA Regional Price Parities are read for CBSA ${result.target.cbsaCode}.`,
      dataSource: V0_DATA.sources.beaRpp.name,
    },
    {
      label: "HUD 1BR FMR",
      sourceValue: `${formatCurrency(result.source.monthlyRent1Br)}/mo`,
      targetValue: `${formatCurrency(result.target.monthlyRent1Br)}/mo`,
      sourceDetail: `${formatCurrency(result.source.monthlyRent1Br)} x 12 = ${formatCurrency(result.source.annualRent1Br)} annual housing COLB.`,
      targetDetail: `${formatCurrency(result.target.monthlyRent1Br)} x 12 = ${formatCurrency(result.target.annualRent1Br)} annual housing COLB.`,
      dataSource: V0_DATA.sources.hudFmr.name,
    },
    {
      label: "BEA goods RPP",
      sourceValue: formatIndex(result.source.priceIndex.goods),
      targetValue: formatIndex(result.target.priceIndex.goods),
      sourceDetail: `Goods price index used directly for food and partly for transportation/other non-housing COLB.`,
      targetDetail: `Goods price index used directly for food and partly for transportation/other non-housing COLB.`,
      dataSource: V0_DATA.sources.beaRpp.name,
    },
    {
      label: "BEA other-services RPP",
      sourceValue: formatIndex(result.source.priceIndex.servicesOther),
      targetValue: formatIndex(result.target.priceIndex.servicesOther),
      sourceDetail: `Other-services price index used for healthcare and internet/mobile, and partly for transportation/other non-housing COLB.`,
      targetDetail: `Other-services price index used for healthcare and internet/mobile, and partly for transportation/other non-housing COLB.`,
      dataSource: V0_DATA.sources.beaRpp.name,
    },
    {
      label: "BLS CEX COLB band",
      sourceValue: `${formatCurrency(band.minGrossIncome)}+`,
      targetValue: `${formatCurrency(band.minGrossIncome)}+`,
      sourceDetail: `${band.label}; ${band.unweightedQuarterRecords} unweighted quarter records. National annual inputs: ${cexSummary}.`,
      targetDetail: `${band.label}; the same source salary band defines the fixed basket being repriced into ${result.target.displayName}.`,
      dataSource: V0_DATA.sources.blsCex.name,
    },
    {
      label: "BLS CPI adjustment",
      sourceValue: `${V0_DATA.dollarNormalization.factor.toFixed(6)}x`,
      targetValue: `${V0_DATA.dollarNormalization.factor.toFixed(6)}x`,
      sourceDetail: `${V0_DATA.dollarNormalization.baseIndex} (${V0_DATA.dollarNormalization.base}) to ${V0_DATA.dollarNormalization.targetIndex} (${V0_DATA.dollarNormalization.target}).`,
      targetDetail: `${V0_DATA.dollarNormalization.baseIndex} (${V0_DATA.dollarNormalization.base}) to ${V0_DATA.dollarNormalization.targetIndex} (${V0_DATA.dollarNormalization.target}).`,
      dataSource: V0_DATA.sources.blsCpi.name,
    },
  ];

  return (
    <section className="calc-section">
      <div className="section-heading">
        <p className="eyebrow">External inputs</p>
        <h3>Public-source data used for this pair</h3>
      </div>
      <div className="input-table">
        <div className="input-row header">
          <span>Input</span>
          <span>{result.source.displayName}</span>
          <span>{result.target.displayName}</span>
        </div>
        {rows.map((row) => (
          <div className="input-row" key={row.label}>
            <span>{row.label}</span>
            <DetailButton
              activeId={activeId}
              className="source-chip"
              detail={{
                id: `source-input-${row.label}`,
                title: `${row.label}: ${result.source.displayName}`,
                value: row.sourceValue,
                kind: "source",
                source: row.dataSource,
                formula: row.sourceDetail,
              }}
              onSelect={onSelect}
            >
              {row.sourceValue}
            </DetailButton>
            <DetailButton
              activeId={activeId}
              className="source-chip"
              detail={{
                id: `target-input-${row.label}`,
                title: `${row.label}: ${result.target.displayName}`,
                value: row.targetValue,
                kind: "source",
                source: row.dataSource,
                formula: row.targetDetail,
              }}
              onSelect={onSelect}
            >
              {row.targetValue}
            </DetailButton>
          </div>
        ))}
      </div>
    </section>
  );
}

function CityFlow({
  cityRole,
  result,
  activeId,
  onSelect,
}: {
  cityRole: "source" | "target";
  result: EquivalenceResult;
  activeId: string;
  onSelect: (detail: Detail) => void;
}) {
  const isSource = cityRole === "source";
  const location = isSource ? result.source : result.target;
  const gross = isSource ? result.sourceGrossIncome : result.targetEquivalentGrossIncome;
  const tax = isSource ? result.sourceTax : result.targetTax;
  const basket = isSource ? result.sourceBasket : result.targetBasket;
  const surplus = isSource ? result.sourceSurplus : result.targetSurplus;
  const interpolation = interpolationDetail(result);
  const taxRows = taxComponentRows(tax);
  const grossDetail: Detail = isSource
    ? {
        id: "source-gross",
        title: `${location.displayName} gross salary`,
        value: formatCurrency(gross),
        kind: "gross",
        source: "User input",
        formula: "This is the pre-tax salary entered in the calculator.",
      }
    : {
        id: "target-gross",
        title: `${location.displayName} equivalent gross salary`,
        value: formatCurrency(gross),
        kind: "gross",
        source: "Solved from PolicyEngine tax curve",
        formula: `Required target net income is ${formatCurrency(result.requiredTargetNetIncome)}. The target tax curve gives ${formatCurrency(interpolation.netLow)} net at ${formatCurrency(interpolation.grossLow)} gross and ${formatCurrency(interpolation.netHigh)} net at ${formatCurrency(interpolation.grossHigh)} gross. Linear interpolation gives ${formatCurrency(gross)} gross.`,
      };

  const steps: Detail[] = [
    grossDetail,
    {
      id: `${cityRole}-tax`,
      title: `${location.displayName} total tax`,
      value: formatCurrency(tax.totalTax),
      kind: "tax",
      source: V0_DATA.sources.policyengine.name,
      formula: `${formatCurrency(tax.federalIncomeTax)} federal income tax + ${formatCurrency(tax.payrollTaxEmployee)} employee payroll tax + ${formatCurrency(tax.stateIncomeTax)} state income tax + ${formatCurrency(tax.localIncomeTax)} local income tax + ${formatCurrency(tax.statePayrollItems)} state/local payroll items + ${formatCurrency(tax.taxComponentResidual)} residual = ${formatCurrency(tax.totalTax)} total tax.`,
      notes: [`Effective tax rate: ${formatPercent(tax.effectiveRate)}.`],
    },
    {
      id: `${cityRole}-net`,
      title: `${location.displayName} net income`,
      value: formatCurrency(tax.netIncome),
      kind: "net",
      source: "Computed from gross and PolicyEngine total tax",
      formula: `${formatCurrency(gross)} gross salary - ${formatCurrency(tax.totalTax)} total tax = ${formatCurrency(tax.netIncome)} net income.`,
    },
    {
      id: `${cityRole}-colb`,
      title: `${location.displayName} total COLB`,
      value: formatCurrency(basket.total),
      kind: "colb",
      source: "HUD FMR + BLS CEX + BEA RPP + BLS CPI",
      formula: Object.entries(basket.categories)
        .map(([category, value]) => `${CATEGORY_LABELS[category as ExpenseCategory]} ${formatCurrency(value)}`)
        .join(" + ")
        .concat(` = ${formatCurrency(basket.total)} total COLB.`),
    },
    {
      id: `${cityRole}-surplus`,
      title: `${location.displayName} post-tax+COLB surplus`,
      value: formatCurrency(surplus),
      kind: "surplus",
      source: "Computed",
      formula: `${formatCurrency(tax.netIncome)} net income - ${formatCurrency(basket.total)} COLB = ${formatCurrency(surplus)} post-tax+COLB surplus.`,
    },
  ];

  return (
    <section className={`flow-card ${cityRole}`}>
      <div className="flow-header">
        <p className="eyebrow">{isSource ? "Source city" : "Target city"}</p>
        <h3>{location.displayName}</h3>
      </div>
      <div className="flow-steps">
        {steps.map((step) => (
          <DetailButton
            activeId={activeId}
            detail={step}
            key={step.id}
            onSelect={onSelect}
          >
            <span>{step.title.replace(`${location.displayName} `, "")}</span>
            <strong>{step.value}</strong>
          </DetailButton>
        ))}
      </div>
      <div className="mini-breakdown">
        <h4>Tax components</h4>
        {taxRows.map(([label, value]) => (
          <DetailButton
            activeId={activeId}
            className="mini-chip"
            detail={{
              id: `${cityRole}-tax-${label}`,
              title: `${location.displayName}: ${label}`,
              value: formatCurrency(value),
              kind: "tax",
              source: V0_DATA.sources.policyengine.name,
              formula: `PolicyEngine component value included in ${location.displayName} total tax.`,
            }}
            key={label}
            onSelect={onSelect}
          >
            <span>{label}</span>
            <strong>{formatCurrency(value)}</strong>
          </DetailButton>
        ))}
      </div>
      <div className="mini-breakdown">
        <h4>COLB components</h4>
        {Object.entries(basket.categories).map(([category, value]) => {
          const expenseCategory = category as ExpenseCategory;
          const categoryDetail =
            expenseCategory === "housing"
              ? `${formatCurrency(location.monthlyRent1Br)} monthly HUD 1BR FMR x 12 = ${formatCurrency(value)}.`
              : `${formatCurrency(pickBasketBand(result.sourceGrossIncome).nationalAnnual[expenseCategory])} national CEX value x ${formatMultiplier(categoryPriceMultiplier(location, expenseCategory))} ${location.displayName} price multiplier = ${formatCurrency(value)}.`;
          return (
            <DetailButton
              activeId={activeId}
              className="mini-chip"
              detail={{
                id: `${cityRole}-colb-${category}`,
                title: `${location.displayName}: ${CATEGORY_LABELS[expenseCategory]} COLB`,
                value: formatCurrency(value),
                kind: "colb",
                source:
                  expenseCategory === "housing"
                    ? V0_DATA.sources.hudFmr.name
                    : "BLS CEX, BLS CPI, BEA RPP",
                formula: categoryDetail,
              }}
              key={category}
              onSelect={onSelect}
            >
              <span>{CATEGORY_LABELS[expenseCategory]}</span>
              <strong>{formatCurrency(value)}</strong>
            </DetailButton>
          );
        })}
      </div>
    </section>
  );
}

function DetailPanel({ detail }: { detail: Detail }) {
  return (
    <aside className={`detail-panel ${detail.kind}`} aria-live="polite">
      <p className="eyebrow">Selected number</p>
      <h3>{detail.title}</h3>
      <strong>{detail.value}</strong>
      <dl>
        <div>
          <dt>Source</dt>
          <dd>{detail.source}</dd>
        </div>
        <div>
          <dt>How it is computed</dt>
          <dd>{detail.formula}</dd>
        </div>
      </dl>
      {detail.notes && (
        <ul>
          {detail.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default function ComputationBreakdown({ result }: { result: EquivalenceResult }) {
  const initialDetail = useMemo<Detail>(
    () => ({
      id: "target-gross",
      title: `${result.target.displayName} equivalent gross salary`,
      value: formatCurrency(result.targetEquivalentGrossIncome),
      kind: "gross",
      source: "Solved from PolicyEngine tax curve",
      formula: `${formatCurrency(result.targetBasket.total)} target COLB + ${formatCurrency(result.sourceSurplus)} preserved source surplus = ${formatCurrency(result.requiredTargetNetIncome)} required target net income. The target gross salary is the gross value whose tax curve reaches that net income.`,
    }),
    [result],
  );
  const [activeDetail, setActiveDetail] = useState<Detail>(initialDetail);

  return (
    <section className="computation-panel" aria-label="Computation breakdown">
      <div className="section-heading">
        <p className="eyebrow">Computation breakdown</p>
        <h2>Click any number to inspect the formula</h2>
      </div>
      <ExternalInputs result={result} activeId={activeDetail.id} onSelect={setActiveDetail} />
      <div className="flow-grid">
        <CityFlow
          activeId={activeDetail.id}
          cityRole="source"
          onSelect={setActiveDetail}
          result={result}
        />
        <div className="flow-link">
          <span>Preserve</span>
          <strong>{formatCurrency(result.sourceSurplus)}</strong>
          <em>post-tax+COLB surplus</em>
        </div>
        <CityFlow
          activeId={activeDetail.id}
          cityRole="target"
          onSelect={setActiveDetail}
          result={result}
        />
      </div>
      <DetailPanel detail={activeDetail} />
    </section>
  );
}
