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
        The v0 model solves for the target gross salary required so that target net income minus
        the target cost-of-living-basket equals source net income minus the source
        cost-of-living-basket.
      </p>
      <p>
        {formatCurrency(result.sourceGrossIncome)} produces about{" "}
        {formatCurrency(result.sourceTax.netIncome)} net income in {result.source.displayName}.
        The source cost-of-living-basket costs {formatCurrency(result.sourceBasket.total)}, leaving{" "}
        {formatCurrency(result.sourceSurplus)} of post-tax+COLB surplus. Preserving that surplus in{" "}
        {result.target.displayName} requires about{" "}
        {formatCurrency(result.requiredTargetNetIncome)} net income, or{" "}
        {formatCurrency(result.targetEquivalentGrossIncome)} gross. The factor is{" "}
        {formatFactor(result.factor)}.
      </p>
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
