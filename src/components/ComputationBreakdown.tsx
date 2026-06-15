import { Fragment, useEffect, useState } from "react";
import { formatCurrency, formatPercent } from "../lib/format";
import IconGlyph, { type IconName } from "./IconGlyph";
import type {
  EquivalenceResult,
  ExpenseCategory,
  LocationProfile,
  NonHousingExpenseCategory,
  PriceIndexKey,
  TaxBreakdown,
} from "../lib/types";
import { SALARY_DATA } from "../lib/nationwideData";

type DetailKind = "gross" | "tax" | "net" | "colb" | "surplus";

type Detail = {
  id: string;
  title: string;
  value: string;
  kind: DetailKind;
  icon?: IconName;
  source: string;
  formula: string;
  notes?: string[];
};

type ClosingDetail = {
  detail: Detail;
  key: number;
};

const DETAIL_ANIMATION_MS = 220;

const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  housing: "Housing",
  food: "Food",
  transportation: "Transportation",
  healthcare: "Healthcare",
  internet_mobile: "Internet/mobile",
  other_nonhousing: "Other non-housing",
};

const CATEGORY_CODE_NAMES: Record<ExpenseCategory, string> = {
  housing: "housing",
  food: "food",
  transportation: "transportation",
  healthcare: "healthcare",
  internet_mobile: "internet_mobile",
  other_nonhousing: "other_nonhousing",
};

const CATEGORY_ICONS: Record<ExpenseCategory, IconName> = {
  housing: "housing",
  food: "food",
  transportation: "transport",
  healthcare: "healthcare",
  internet_mobile: "phone",
  other_nonhousing: "other",
};

const PRICE_INDEX_CODE_NAMES: Record<PriceIndexKey, string> = {
  all: "all_items_rpp",
  goods: "goods_rpp",
  housing: "housing_rpp",
  servicesOther: "other_services_rpp",
  utilities: "utilities_rpp",
};

const TAX_COMPONENT_CODE_NAMES: Record<string, string> = {
  "Federal income tax": "federal_income_tax",
  "Federal payroll (FICA)": "federal_payroll_tax",
  "State income tax, net": "state_income_tax_net",
  "Local income tax": "local_income_tax",
  "State/local payroll taxes": "state_local_payroll_taxes",
};

function codeNumber(value: number, digits = 0) {
  return digits === 0 ? String(Math.round(value)) : value.toFixed(digits);
}

function pickBasketBand(grossIncome: number) {
  return (
    SALARY_DATA.basketBands.find(
      (entry) =>
        grossIncome >= entry.minGrossIncome &&
        (entry.maxGrossIncome === null || grossIncome < entry.maxGrossIncome),
    ) ?? SALARY_DATA.basketBands[SALARY_DATA.basketBands.length - 1]
  );
}

function taxComponentRows(tax: TaxBreakdown) {
  const stateIncomeTaxNet = tax.stateIncomeTax + tax.taxComponentResidual;
  return [
    ["Federal income tax", tax.federalIncomeTax],
    ["Federal payroll (FICA)", tax.payrollTaxEmployee],
    ["State income tax, net", stateIncomeTaxNet],
    ["Local income tax", tax.localIncomeTax],
    ["State/local payroll taxes", tax.statePayrollItems],
  ] as const;
}

function interpolationDetail(result: EquivalenceResult) {
  return result.targetTaxInterpolation;
}

function sourceGrossCode(gross: number) {
  return [
    "# User-entered pre-tax W-2 wage income",
    `gross_salary = ${codeNumber(gross)}`,
  ].join("\n");
}

function targetGrossCode(result: EquivalenceResult) {
  const interpolation = interpolationDetail(result);
  return [
    "# Solve for the target gross salary that preserves source surplus",
    `target_cost_basket = ${codeNumber(result.targetBasket.total, 2)}`,
    `source_surplus = ${codeNumber(result.sourceSurplus, 2)}`,
    "required_net_income = target_cost_basket + source_surplus",
    "",
    "# Interpolate on the target city's PolicyEngine tax curve",
    `gross_low = ${codeNumber(interpolation.grossLow)}`,
    `net_low = ${codeNumber(interpolation.netLow, 2)}`,
    `gross_high = ${codeNumber(interpolation.grossHigh)}`,
    `net_high = ${codeNumber(interpolation.netHigh, 2)}`,
    "equivalent_gross = gross_low + (",
    "    (required_net_income - net_low)",
    "    / (net_high - net_low)",
    "    * (gross_high - gross_low)",
    ")",
    `# equivalent_gross = ${formatCurrency(result.targetEquivalentGrossIncome)}`,
  ].join("\n");
}

function taxCode(location: LocationProfile, gross: number, tax: TaxBreakdown) {
  return [
    `# Source: ${SALARY_DATA.sources.policyengine.name}, ${SALARY_DATA.sources.policyengine.vintage}`,
    `tax_year = ${SALARY_DATA.taxYear}`,
    `county_fips = "${location.countyFips}"  # ${location.countyName}`,
    `gross_salary = ${codeNumber(gross)}`,
    "",
    `federal_income_tax = ${codeNumber(tax.federalIncomeTax, 2)}`,
    `federal_payroll_tax = ${codeNumber(tax.payrollTaxEmployee, 2)}`,
    `state_income_tax_net = ${codeNumber(tax.stateIncomeTax + tax.taxComponentResidual, 2)}`,
    `local_income_tax = ${codeNumber(tax.localIncomeTax, 2)}`,
    `state_local_payroll_taxes = ${codeNumber(tax.statePayrollItems, 2)}`,
    "total_tax = (",
    "    federal_income_tax",
    "    + federal_payroll_tax",
    "    + state_income_tax_net",
    "    + local_income_tax",
    "    + state_local_payroll_taxes",
    ")",
    `# total_tax = ${formatCurrency(tax.totalTax)}`,
  ].join("\n");
}

function taxComponentCode(
  location: LocationProfile,
  gross: number,
  label: string,
  value: number,
) {
  const variableName = TAX_COMPONENT_CODE_NAMES[label] ?? "tax_component";
  return [
    `# Source: ${SALARY_DATA.sources.policyengine.name}, ${SALARY_DATA.sources.policyengine.vintage}`,
    `tax_year = ${SALARY_DATA.taxYear}`,
    `county_fips = "${location.countyFips}"  # ${location.countyName}`,
    `gross_salary = ${codeNumber(gross)}`,
    `${variableName} = ${codeNumber(value, 2)}`,
    `# ${variableName} = ${formatCurrency(value)}`,
  ].join("\n");
}

function netIncomeCode(gross: number, tax: TaxBreakdown) {
  return [
    `gross_salary = ${codeNumber(gross, 2)}`,
    `total_tax = ${codeNumber(tax.totalTax, 2)}`,
    "net_income = gross_salary - total_tax",
    `# net_income = ${formatCurrency(tax.netIncome)}`,
  ].join("\n");
}

function priceMultiplierCode(location: LocationProfile, category: NonHousingExpenseCategory) {
  const weights = SALARY_DATA.categoryPriceWeights[category];
  const entries = Object.entries(weights).flatMap(([indexKey, weight]) =>
    weight === undefined ? [] : [[indexKey as PriceIndexKey, weight] as const],
  );
  const indexLines = entries.map(([indexKey]) => {
    const variableName = PRICE_INDEX_CODE_NAMES[indexKey];
    return `${variableName} = ${location.priceIndex[indexKey].toFixed(3)}  # BEA RPP for ${location.cbsaName}`;
  });
  const expression = entries
    .map(([indexKey, weight]) => {
      const variableName = PRICE_INDEX_CODE_NAMES[indexKey];
      return weight === 1
        ? `${variableName} / 100`
        : `${codeNumber(weight, 2)} * (${variableName} / 100)`;
    })
    .join(" + ");
  return { expression, indexLines };
}

function categoryCostCode(
  location: LocationProfile,
  category: ExpenseCategory,
  value: number,
  sourceGrossIncome: number,
) {
  const variableName = CATEGORY_CODE_NAMES[category];
  if (category === "housing") {
    return [
      "# Source: HUD FY2026 one-bedroom Fair Market Rent",
      `hud_fmr_1br_monthly = ${codeNumber(location.monthlyRent1Br)}  # ${location.displayName}`,
      "housing = hud_fmr_1br_monthly * 12",
      `# housing = ${formatCurrency(value)}`,
    ].join("\n");
  }

  const band = pickBasketBand(sourceGrossIncome);
  const { expression, indexLines } = priceMultiplierCode(location, category);
  return [
    "# Sources: BLS CEX spending, BLS CPI inflation adjustment, BEA RPP price index",
    `# Spending band: ${band.label}`,
    `national_${variableName} = ${codeNumber(band.nationalAnnual[category], 2)}`,
    ...indexLines,
    `price_multiplier = ${expression}`,
    `${variableName} = national_${variableName} * price_multiplier`,
    `# ${variableName} = ${formatCurrency(value)}`,
  ].join("\n");
}

function basketCode(basket: EquivalenceResult["sourceBasket"]) {
  const lines = Object.entries(basket.categories).map(([category, value]) => {
    const variableName = CATEGORY_CODE_NAMES[category as ExpenseCategory];
    return `${variableName} = ${codeNumber(value, 2)}`;
  });
  return [
    ...lines,
    "cost_basket = (",
    "    housing",
    "    + food",
    "    + transportation",
    "    + healthcare",
    "    + internet_mobile",
    "    + other_nonhousing",
    ")",
    `# cost_basket = ${formatCurrency(basket.total)}`,
  ].join("\n");
}

function surplusCode(tax: TaxBreakdown, basket: EquivalenceResult["sourceBasket"], surplus: number) {
  return [
    `net_income = ${codeNumber(tax.netIncome, 2)}`,
    `cost_basket = ${codeNumber(basket.total, 2)}`,
    "surplus = net_income - cost_basket",
    `# surplus = ${formatCurrency(surplus)}`,
  ].join("\n");
}

function DetailButton({
  detail,
  activeId,
  onSelect,
  children,
  className = "",
}: {
  detail: Detail;
  activeId: string | null;
  onSelect: (detail: Detail) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const isActive = activeId === detail.id;
  return (
    <button
      aria-expanded={isActive}
      className={`detail-chip ${detail.kind} ${isActive ? "active" : ""} ${className}`}
      type="button"
      onClick={() => onSelect(detail)}
    >
      {detail.icon && <IconGlyph name={detail.icon} />}
      {children}
    </button>
  );
}

function CityFlow({
  cityRole,
  result,
  activeId,
  closingDetail,
  onSelect,
}: {
  cityRole: "source" | "target";
  result: EquivalenceResult;
  activeId: string | null;
  closingDetail: ClosingDetail | null;
  onSelect: (detail: Detail) => void;
}) {
  const isSource = cityRole === "source";
  const location = isSource ? result.source : result.target;
  const gross = isSource ? result.sourceGrossIncome : result.targetEquivalentGrossIncome;
  const tax = isSource ? result.sourceTax : result.targetTax;
  const basket = isSource ? result.sourceBasket : result.targetBasket;
  const surplus = isSource ? result.sourceSurplus : result.targetSurplus;
  const taxRows = taxComponentRows(tax);
  const grossDetail: Detail = isSource
    ? {
        id: "source-gross",
        title: `${location.displayName} gross salary`,
        value: formatCurrency(gross),
        kind: "gross",
        icon: "salary",
        source: "User input",
        formula: sourceGrossCode(gross),
      }
    : {
        id: "target-gross",
        title: `${location.displayName} equivalent gross salary`,
        value: formatCurrency(gross),
        kind: "gross",
        icon: "equal",
        source: "Solved from PolicyEngine tax curve",
        formula: targetGrossCode(result),
      };

  const steps: Detail[] = [
    grossDetail,
    {
      id: `${cityRole}-tax`,
      title: `${location.displayName} total tax`,
      value: formatCurrency(tax.totalTax),
      kind: "tax",
      icon: "tax",
      source: SALARY_DATA.sources.policyengine.name,
      formula: taxCode(location, gross, tax),
      notes: [`Effective tax rate: ${formatPercent(tax.effectiveRate)}.`],
    },
    {
      id: `${cityRole}-net`,
      title: `${location.displayName} net income`,
      value: formatCurrency(tax.netIncome),
      kind: "net",
      icon: "net",
      source: "Computed from gross and PolicyEngine total tax",
      formula: netIncomeCode(gross, tax),
    },
    {
      id: `${cityRole}-colb`,
      title: `${location.displayName} cost-of-living basket`,
      value: formatCurrency(basket.total),
      kind: "colb",
      icon: "basket",
      source:
        "HUD Fair Market Rents, BLS Consumer Expenditure Survey, BLS Consumer Price Index, BEA Regional Price Parities",
      formula: basketCode(basket),
    },
    {
      id: `${cityRole}-surplus`,
      title: `${location.displayName} surplus`,
      value: formatCurrency(surplus),
      kind: "surplus",
      icon: "surplus",
      source: "Computed",
      formula: surplusCode(tax, basket, surplus),
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
          <Fragment key={step.id}>
            <DetailButton
              activeId={activeId}
              detail={step}
              onSelect={onSelect}
            >
              <span>{step.title.replace(`${location.displayName} `, "")}</span>
              <strong>{step.value}</strong>
            </DetailButton>
            <DetailSlot activeId={activeId} closingDetail={closingDetail} detail={step} />
          </Fragment>
        ))}
      </div>
      <div className="mini-breakdown">
        <h4>Tax components</h4>
        {taxRows.map(([label, value]) => {
          const detail: Detail = {
            id: `${cityRole}-tax-${label}`,
            title: `${location.displayName}: ${label}`,
            value: formatCurrency(value),
            kind: "tax",
            icon: "tax",
            source: SALARY_DATA.sources.policyengine.name,
            formula: taxComponentCode(location, gross, label, value),
          };
          return (
            <Fragment key={label}>
              <DetailButton
                activeId={activeId}
                className="mini-chip"
                detail={detail}
                onSelect={onSelect}
              >
                <span>{label}</span>
                <strong>{formatCurrency(value)}</strong>
              </DetailButton>
              <DetailSlot activeId={activeId} closingDetail={closingDetail} detail={detail} />
            </Fragment>
          );
        })}
      </div>
      <div className="mini-breakdown">
        <h4>Cost basket components</h4>
        {Object.entries(basket.categories).map(([category, value]) => {
          const expenseCategory = category as ExpenseCategory;
          const detail: Detail = {
            id: `${cityRole}-colb-${category}`,
            title: `${location.displayName}: ${CATEGORY_LABELS[expenseCategory]} cost`,
            value: formatCurrency(value),
            kind: "colb",
            icon: CATEGORY_ICONS[expenseCategory],
            source:
              expenseCategory === "housing"
                ? "HUD Fair Market Rents"
                : "BLS Consumer Expenditure Survey, BLS Consumer Price Index, BEA Regional Price Parities",
            formula: categoryCostCode(
              location,
              expenseCategory,
              value,
              result.sourceGrossIncome,
            ),
          };
          return (
            <Fragment key={category}>
              <DetailButton
                activeId={activeId}
                className="mini-chip"
                detail={detail}
                onSelect={onSelect}
              >
                <span>{CATEGORY_LABELS[expenseCategory]}</span>
                <strong>{formatCurrency(value)}</strong>
              </DetailButton>
              <DetailSlot activeId={activeId} closingDetail={closingDetail} detail={detail} />
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}

function DetailSlot({
  activeId,
  closingDetail,
  detail,
}: {
  activeId: string | null;
  closingDetail: ClosingDetail | null;
  detail: Detail;
}) {
  const isOpen = activeId === detail.id;
  const isClosing = closingDetail?.detail.id === detail.id;
  if (!isOpen && !isClosing) return null;

  return (
    <InlineDetail
      detail={isClosing ? closingDetail.detail : detail}
      state={isOpen ? "open" : "closing"}
      key={isClosing ? closingDetail.key : detail.id}
    />
  );
}

function InlineDetail({ detail, state }: { detail: Detail; state: "open" | "closing" }) {
  return (
    <div className={`inline-detail-shell ${state}`}>
      <div
        aria-hidden={state === "closing"}
        className={`inline-detail ${detail.kind}`}
        role="region"
        aria-label={`${detail.title} details`}
      >
        <div className="inline-detail-header">
          <h4>{detail.title}</h4>
          <strong>{detail.value}</strong>
        </div>
        <dl>
          <div>
            <dt>Source</dt>
            <dd>{detail.source}</dd>
          </div>
          <div>
            <dt>How it is computed</dt>
            <dd>
              <pre className="formula-code">
                <code>{detail.formula}</code>
              </pre>
            </dd>
          </div>
        </dl>
        {detail.notes && (
          <ul>
            {detail.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function ComputationBreakdown({ result }: { result: EquivalenceResult }) {
  const [activeDetail, setActiveDetail] = useState<Detail | null>(null);
  const [closingDetail, setClosingDetail] = useState<ClosingDetail | null>(null);

  useEffect(() => {
    setActiveDetail(null);
    setClosingDetail(null);
  }, [result]);

  useEffect(() => {
    if (closingDetail === null) return undefined;
    const timeoutId = window.setTimeout(() => {
      setClosingDetail((currentDetail) =>
        currentDetail?.key === closingDetail.key ? null : currentDetail,
      );
    }, DETAIL_ANIMATION_MS);
    return () => window.clearTimeout(timeoutId);
  }, [closingDetail]);

  function toggleDetail(detail: Detail) {
    if (activeDetail?.id === detail.id) {
      setClosingDetail({ detail: activeDetail, key: Date.now() });
      setActiveDetail(null);
      return;
    }
    if (activeDetail !== null) {
      setClosingDetail({ detail: activeDetail, key: Date.now() });
    }
    setActiveDetail(detail);
  }

  return (
    <section className="computation-panel" aria-label="Computation breakdown">
      <div className="section-heading">
        <p className="eyebrow">Computation breakdown</p>
        <h2>Click any number to see how it was calculated</h2>
      </div>
      <div className="flow-grid">
        <CityFlow
          activeId={activeDetail?.id ?? null}
          cityRole="source"
          closingDetail={closingDetail}
          onSelect={toggleDetail}
          result={result}
        />
        <div className="flow-link">
          <span>Preserve</span>
          <strong>{formatCurrency(result.sourceSurplus)}</strong>
          <em>surplus</em>
        </div>
        <CityFlow
          activeId={activeDetail?.id ?? null}
          cityRole="target"
          closingDetail={closingDetail}
          onSelect={toggleDetail}
          result={result}
        />
      </div>
    </section>
  );
}
