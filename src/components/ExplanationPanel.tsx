import { formatCurrency, formatFactor } from "../lib/format";
import type { EquivalenceResult } from "../lib/types";

type ExplanationPanelProps = {
  result: EquivalenceResult;
};

export default function ExplanationPanel({ result }: ExplanationPanelProps) {
  return (
    <section className="panel explanation">
      <div className="section-heading">
        <p className="eyebrow">Explainability</p>
        <h3>
          {result.source.displayName} to {result.target.displayName}
        </h3>
      </div>
      <p>
        The demo solves for the target gross salary required so that target after-tax income
        minus the target cost of the modeled basket equals source after-tax income minus the
        source cost of the same basket.
      </p>
      <p>
        {formatCurrency(result.sourceGrossIncome)} produces about{" "}
        {formatCurrency(result.sourceTax.netIncome)} after tax in {result.source.displayName}.
        The modeled source basket costs {formatCurrency(result.sourceBasket.total)}, leaving{" "}
        {formatCurrency(result.sourceSurplus)} of after-basket surplus. Preserving that surplus
        in {result.target.displayName} requires about{" "}
        {formatCurrency(result.requiredTargetNetIncome)} after tax, or{" "}
        {formatCurrency(result.targetEquivalentGrossIncome)} gross. The factor is{" "}
        {formatFactor(result.factor)}.
      </p>
      <div className="data-list">
        {Object.entries(result.dataVintage).map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div>
        <h4>Warnings</h4>
        <ul>
          {result.warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
