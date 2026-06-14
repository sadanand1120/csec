import { formatCurrency } from "../lib/format";
import type { EquivalenceResult } from "../lib/types";

type BreakdownChartProps = {
  result: EquivalenceResult;
};

export default function BreakdownChart({ result }: BreakdownChartProps) {
  const rows = [
    {
      label: "Housing COLB",
      value: result.breakdown.housingDelta,
      tone: "rent",
    },
    {
      label: "Non-housing COLB",
      value: result.breakdown.nonhousingDelta,
      tone: "prices",
    },
    {
      label: "Target tax difference",
      value: result.breakdown.targetTaxDelta,
      tone: "tax",
    },
  ];

  const maxAbs = Math.max(...rows.map((row) => Math.abs(row.value)), 1);

  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">Main drivers</p>
        <h3>Component deltas</h3>
      </div>
      <div className="waterfall">
        {rows.map((row) => (
          <div className="bar-row" key={row.label}>
            <span>{row.label}</span>
            <div className="bar-track" aria-hidden="true">
              <div
                className={`bar-fill ${row.tone}`}
                style={{ width: `${Math.max(8, (Math.abs(row.value) / maxAbs) * 100)}%` }}
              />
            </div>
            <strong>{formatCurrency(row.value)}</strong>
          </div>
        ))}
      </div>
      <div className="tax-grid">
        <div>
          <span>Source taxes</span>
          <strong>{formatCurrency(result.sourceTax.totalTax)}</strong>
        </div>
        <div>
          <span>Target taxes</span>
          <strong>{formatCurrency(result.targetTax.totalTax)}</strong>
        </div>
        <div>
          <span>Federal target</span>
          <strong>{formatCurrency(result.targetTax.federalIncomeTax)}</strong>
        </div>
        <div>
          <span>State/local/residual target</span>
          <strong>
            {formatCurrency(
              result.targetTax.stateIncomeTax +
                result.targetTax.localIncomeTax +
                result.targetTax.statePayrollItems +
                result.targetTax.taxComponentResidual,
            )}
          </strong>
        </div>
      </div>
    </section>
  );
}
