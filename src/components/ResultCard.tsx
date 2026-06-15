import { formatCurrency, formatFactor, formatPercent } from "../lib/format";
import type { EquivalenceResult } from "../lib/types";
import IconGlyph from "./IconGlyph";

type ResultCardProps = {
  result: EquivalenceResult;
};

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <section className="result-card" aria-label="Equivalent salary result">
      <div>
        <p className="eyebrow">Equivalent gross salary</p>
        <h2>
          {formatCurrency(result.sourceGrossIncome)} in {result.source.displayName} is about{" "}
          {formatCurrency(result.targetEquivalentGrossIncome)} in {result.target.displayName}
        </h2>
      </div>
      <div className="factor-pill">{formatFactor(result.factor)}</div>
      <div className="metric-grid">
        <div className="metric-card">
          <IconGlyph name="net" />
          <span>Source net income</span>
          <strong>{formatCurrency(result.sourceTax.netIncome)}</strong>
          <small>{formatPercent(result.sourceTax.effectiveRate)} effective tax</small>
        </div>
        <div className="metric-card">
          <IconGlyph name="equal" />
          <span>Target required net income</span>
          <strong>{formatCurrency(result.requiredTargetNetIncome)}</strong>
          <small>{formatPercent(result.targetTax.effectiveRate)} target effective tax</small>
        </div>
        <div className="metric-card">
          <IconGlyph name="basket" />
          <span>Source cost basket</span>
          <strong>{formatCurrency(result.sourceBasket.total)}</strong>
          <small>{formatCurrency(result.sourceSurplus)} surplus</small>
        </div>
        <div className="metric-card">
          <IconGlyph name="housing" />
          <span>Target cost basket</span>
          <strong>{formatCurrency(result.targetBasket.total)}</strong>
          <small>{formatCurrency(result.targetSurplus)} surplus</small>
        </div>
      </div>
    </section>
  );
}
