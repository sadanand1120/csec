import { useMemo, useState } from "react";
import AssumptionControls from "./components/AssumptionControls";
import BreakdownChart from "./components/BreakdownChart";
import DemoMap from "./components/DemoMap";
import ExplanationPanel from "./components/ExplanationPanel";
import LocationSelect from "./components/LocationSelect";
import ResultCard from "./components/ResultCard";
import SalaryControl from "./components/SalaryControl";
import {
  DEFAULT_GROSS_INCOME,
  DEFAULT_SOURCE_ID,
  DEFAULT_TARGET_ID,
  DEMO_LOCATIONS,
} from "./lib/demoData";
import { computeEquivalence, computeHeatmap } from "./lib/equivalence";

function MethodologyPage() {
  return (
    <main className="methodology-page">
      <nav className="top-nav">
        <a href="/">Calculator</a>
        <a href="/methodology" aria-current="page">
          Methodology
        </a>
      </nav>
      <section className="methodology-hero">
        <p className="eyebrow">Methodology</p>
        <h1>After-tax disposable-income equivalence</h1>
        <p>
          We estimate what you keep after taxes in the source city, subtract what the selected
          lifestyle costs there, then find the target-city gross salary that leaves you with the
          same amount after paying target-city taxes and buying the same basket at target-city
          prices.
        </p>
      </section>
      <section className="method-grid">
        <div className="panel">
          <h2>Core formula</h2>
          <pre>{`N_S = after_tax_income(X, S, P)
C_S = annual_cost_of_basket(S, X, P, B)
R_S = N_S - C_S

Find Y:
after_tax_income(Y, T, P)
  - annual_cost_of_same_basket(T, S, X, P, B)
  = R_S`}</pre>
        </div>
        <div className="panel">
          <h2>Current prototype</h2>
          <p>
            This local version uses six temporary fixture locations so the full interaction can be
            tested before implementing Census, HUD, BEA, BLS, USDA, and PolicyEngine pipelines.
          </p>
        </div>
        <div className="panel">
          <h2>Planned data</h2>
          <ul>
            <li>PolicyEngine US for federal, state, and payroll taxes.</li>
            <li>HUD Fair Market Rents for renter housing costs.</li>
            <li>BEA Regional Price Parities for non-housing price levels.</li>
            <li>Census files for locations, crosswalks, and county boundaries.</li>
          </ul>
        </div>
        <div className="panel">
          <h2>Limitations</h2>
          <ul>
            <li>Fixture values are not production estimates.</li>
            <li>City geography is approximated by county and metro labels.</li>
            <li>RSUs, bonuses, AMT, owner costs, and employer benefits are excluded.</li>
            <li>The factor is salary-dependent and not symmetric.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

function CalculatorPage() {
  const [sourceId, setSourceId] = useState(DEFAULT_SOURCE_ID);
  const [targetId, setTargetId] = useState(DEFAULT_TARGET_ID);
  const [salary, setSalary] = useState(DEFAULT_GROSS_INCOME);

  const result = useMemo(
    () => computeEquivalence(sourceId, targetId, salary),
    [sourceId, targetId, salary],
  );
  const heatmap = useMemo(() => computeHeatmap(sourceId, salary), [sourceId, salary]);

  return (
    <main className="app-shell">
      <nav className="top-nav">
        <a href="/" aria-current="page">
          Calculator
        </a>
        <a href="/methodology">Methodology</a>
      </nav>
      <header className="app-header">
        <div>
          <p className="eyebrow">Local deterministic demo</p>
          <h1>After-tax salary equivalence across U.S. cities</h1>
          <p>
            Compare gross salaries after taxes, housing, local prices, and preserved after-basket
            surplus.
          </p>
        </div>
        <div className="version-badge">demo_v0_1</div>
      </header>

      <section className="workspace">
        <aside className="control-panel">
          <div className="section-heading">
            <p className="eyebrow">Controls</p>
            <h2>Scenario</h2>
          </div>
          <LocationSelect
            id="source"
            label="Source city"
            value={sourceId}
            locations={DEMO_LOCATIONS}
            onChange={setSourceId}
          />
          <LocationSelect
            id="target"
            label="Target city"
            value={targetId}
            locations={DEMO_LOCATIONS}
            onChange={setTargetId}
          />
          <SalaryControl value={salary} onChange={setSalary} />
          <AssumptionControls />
        </aside>
        <DemoMap
          values={heatmap}
          sourceId={sourceId}
          targetId={targetId}
          onSelectTarget={setTargetId}
        />
      </section>

      <ResultCard result={result} />

      <section className="detail-grid">
        <BreakdownChart result={result} />
        <ExplanationPanel result={result} />
      </section>
    </main>
  );
}

export default function App() {
  if (window.location.pathname === "/methodology") {
    return <MethodologyPage />;
  }

  return <CalculatorPage />;
}
