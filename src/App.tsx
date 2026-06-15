import { Suspense, lazy, useEffect, useState } from "react";
import ComputationBreakdown from "./components/ComputationBreakdown";
import LocationSelect from "./components/LocationSelect";
import ResultCard from "./components/ResultCard";
import SalaryControl from "./components/SalaryControl";
import {
  DEFAULT_GROSS_INCOME,
  FIXED_PROFILE,
  LOCATIONS,
  computeEquivalence,
} from "./lib/equivalence";
import type { EquivalenceResult } from "./lib/types";
import { SALARY_DATA } from "./lib/nationwideData";

const DemoMap = lazy(() => import("./components/DemoMap"));

type PageName = "calculator" | "methodology" | "sources";
type SourceKey = keyof typeof SALARY_DATA.sources;

const SOURCE_EXPLAINERS: Array<{
  key: SourceKey;
  title: string;
  description: string;
  usedFor: string;
}> = [
  {
    key: "policyengine",
    title: "PolicyEngine US",
    description:
      "PolicyEngine US is an open-source tax and benefit engine. Here it converts gross W-2 salary into federal income tax, payroll tax, supported state/local taxes, total tax, and net income for the fixed single-filer profile.",
    usedFor:
      "Tax year 2026 gross-to-net curves for all supported cities. The browser loads only the selected city curves and interpolates them when solving for the target salary. Known municipal-tax gaps are flagged on affected cities.",
  },
  {
    key: "hudFmr",
    title: "U.S. Department of Housing and Urban Development Fair Market Rents",
    description:
      "The U.S. Department of Housing and Urban Development publishes Fair Market Rents, often abbreviated HUD FMR. FMR is a gross-rent standard used in housing programs; it includes shelter rent plus tenant-paid utilities for a typical rental unit size.",
    usedFor:
      "Annual housing cost: fiscal year 2026 one-bedroom FMR multiplied by twelve.",
  },
  {
    key: "beaRpp",
    title: "Bureau of Economic Analysis Regional Price Parities",
    description:
      "The Bureau of Economic Analysis, abbreviated BEA, publishes Regional Price Parities, abbreviated RPP. RPP compares metro-area price levels against the national average of 100.",
    usedFor:
      "Goods and other-services RPP values reprice food, transportation, healthcare, internet/mobile, and other non-housing spending. Housing comes from HUD FMR instead.",
  },
  {
    key: "blsCex",
    title: "Bureau of Labor Statistics Consumer Expenditure Survey",
    description:
      "The Bureau of Labor Statistics, abbreviated BLS, runs the Consumer Expenditure Survey, abbreviated CEX. The public-use microdata files contain anonymized household-level spending records.",
    usedFor:
      "National non-housing spending estimates for single-person renter consumer units with wage or salary income.",
  },
  {
    key: "blsCpi",
    title: "Bureau of Labor Statistics Consumer Price Index",
    description:
      "The Consumer Price Index, abbreviated CPI, measures how consumer prices change over time. This app uses CPI-U, the Consumer Price Index for All Urban Consumers.",
    usedFor:
      "Inflates 2024 Consumer Expenditure Survey dollar amounts and income-band thresholds to May 2026 dollars.",
  },
  {
    key: "census",
    title: "U.S. Census Bureau Geography",
    description:
      "The U.S. Census Bureau publishes official place, county, and metro-area identifiers. TIGERweb is a Census mapping service, and CBSA means Core Based Statistical Area, the official metro-area grouping used by several federal datasets.",
    usedFor:
      "Defines the 343-city universe using 2025 Census city/town population estimates, maps each city to county parts, and selects the primary metro area used for BEA price indexes.",
  },
];

function TopNav({ page }: { page: PageName }) {
  return (
    <nav className="top-nav">
      <a href="/" aria-current={page === "calculator" ? "page" : undefined}>
        Calculator
      </a>
      <a href="/methodology" aria-current={page === "methodology" ? "page" : undefined}>
        Methodology
      </a>
      <a href="/sources" aria-current={page === "sources" ? "page" : undefined}>
        Sources
      </a>
    </nav>
  );
}

function FixedProfileSummary() {
  return (
    <section className="fixed-profile" aria-label="Fixed household profile">
      <p className="eyebrow">Fixed profile</p>
      <ul>
        <li>Single W-2 employee</li>
        <li>U.S. citizen, single filer</li>
        <li>No children or dependents</li>
        <li>{FIXED_PROFILE.housing}</li>
      </ul>
    </section>
  );
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function StatusPanel({ title, message, tone = "neutral" }: { title: string; message: string; tone?: "neutral" | "error" }) {
  return (
    <section className={`status-panel ${tone}`} role={tone === "error" ? "alert" : "status"}>
      <p className="eyebrow">{tone === "error" ? "Data load error" : "Loading"}</p>
      <h3>{title}</h3>
      <p>{message}</p>
    </section>
  );
}

function MapLoadingPanel() {
  return (
    <section className="map-panel">
      <div className="section-heading">
        <p className="eyebrow">Interactive U.S. map</p>
        <h3>Pick cities on the map</h3>
      </div>
      <div className="map-loading" role="status">
        <strong>Loading map</strong>
        <span>Preparing the city map.</span>
      </div>
    </section>
  );
}

function MethodologyPage() {
  return (
    <main className="article-page">
      <TopNav page="methodology" />
      <article className="article-doc">
        <p className="eyebrow">Methodology</p>
        <h1>How the salary equivalence calculation works</h1>
        <p className="article-lede">
          <strong>
            Have you ever asked what salary in one city matches your salary in another, then gotten
            wildly different answers?
          </strong>{" "}
          Public tools like{" "}
          <a href="https://www.forbes.com/advisor/mortgages/real-estate/cost-of-living-calculator/">
            Forbes Advisor
          </a>,{" "}
          <a href="https://www.nerdwallet.com/cost-of-living-calculator">NerdWallet</a>, and{" "}
          <a href="https://www.bankrate.com/personal-finance/cost-of-living-calculator/">
            Bankrate
          </a>{" "}
          are useful quick checks, but they usually do not expose the full tax, rent, spending, and
          interpolation math. That opacity is exactly how a city salary conversion can badly over-
          or under-estimate for a specific person.
        </p>

        <section className="article-callout" aria-label="TLDR">
          <h2>TLDR</h2>
          <p>
            This calculator makes the comparison explicit: compute net income after taxes, subtract
            a modeled cost-of-living basket, then solve for the target-city gross salary that
            preserves the same surplus.
          </p>
        </section>

        <h2>The actual equation</h2>
        <p>
          Gross salary is pre-tax W-2 wage income. Net income is gross salary minus modeled taxes.
          Surplus is net income minus the cost-of-living basket.
        </p>
        <pre>{`source_net = post_tax(source_gross, source_city)
source_surplus = source_net - cost_basket(source_city)

Find target_gross such that:
post_tax(target_gross, target_city) - cost_basket(target_city)
  = source_surplus`}</pre>
        <p>
          The target gross salary is therefore not just a rent adjustment or a tax adjustment. It is
          the salary that preserves the same surplus after both are included.
        </p>

        <h2>What is inside the cost-of-living basket</h2>
        <ul className="component-list">
          <li>
            <strong>Housing:</strong> one-bedroom Fair Market Rent from the U.S. Department of
            Housing and Urban Development, multiplied by twelve.
          </li>
          <li>
            <strong>Food:</strong> national single-renter spending from the Consumer Expenditure
            Survey, repriced with the metro goods price index.
          </li>
          <li>
            <strong>Transportation:</strong> national spending repriced with a weighted goods and
            other-services price index.
          </li>
          <li>
            <strong>Healthcare:</strong> national spending repriced with the metro other-services
            price index.
          </li>
          <li>
            <strong>Internet/mobile:</strong> national spending repriced with the metro
            other-services price index.
          </li>
          <li>
            <strong>Other non-housing:</strong> remaining modeled spending repriced with a weighted
            goods and other-services price index.
          </li>
        </ul>

        <h2>How the target salary is solved</h2>
          <p>
            The tax side comes from PolicyEngine US. For each city, the app stores a precomputed tax
          curve for tax year 2026: gross salary in, net income out. During interaction, the browser
          loads only the selected city curve files, computes the target net income needed, then
          interpolates on the target city's PolicyEngine curve.
        </p>
        <pre>{`target_required_net = target_cost_basket + source_surplus
target_gross = interpolate(
    target_policyengine_curve.net_income,
    target_policyengine_curve.gross_salary,
    target_required_net,
)`}</pre>

        <h2>Scope and assumptions</h2>
        <ul className="assumption-list">
          <li>Profile: one U.S. citizen, single filer, W-2 income only, no children or dependents.</li>
          <li>Housing: renter living alone in a one-bedroom apartment; no owner costs.</li>
          <li>Coverage: 343 U.S. Census city/town estimate records with 2025 population of at least 100,000.</li>
          <li>Taxes: PolicyEngine US tax year 2026, with supported state and local taxes; known unsupported municipal taxes are flagged city by city.</li>
          <li>Excluded income: bonuses, equity compensation, self-employment, and investment income.</li>
          <li>Excluded deductions: custom itemization, pre-tax retirement, HSA/FSA, commuter benefits, and insurance-premium deductions.</li>
        </ul>
      </article>
    </main>
  );
}

function SourcesPage() {
  return (
    <main className="article-page">
      <TopNav page="sources" />
      <article className="article-doc">
        <p className="eyebrow">Data sources</p>
        <h1>What data powers the calculator</h1>
        <p className="article-lede">
          The calculator is built from trusted official government sources, plus the open-source
          PolicyEngine tax model. This page explains what each source contributes.
        </p>

        <div className="source-list">
          {SOURCE_EXPLAINERS.map((entry, index) => {
            const source = SALARY_DATA.sources[entry.key];
            return (
              <section className="source-entry" key={entry.key}>
                <div className="source-entry-heading">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{entry.title}</h2>
                </div>
                <div className="source-copy">
                  <p>
                    <strong>What it is:</strong> {entry.description}
                  </p>
                  <p>
                    <strong>How it is used:</strong> {entry.usedFor}
                  </p>
                </div>
                <dl>
                  <div>
                    <dt>Vintage used</dt>
                    <dd>{source.vintage}</dd>
                  </div>
                  <div>
                    <dt>Source link</dt>
                    <dd>
                      <a href={source.url}>{source.url}</a>
                    </dd>
                  </div>
                </dl>
              </section>
            );
          })}
        </div>
      </article>
    </main>
  );
}

function CalculatorPage() {
  const [sourceId, setSourceId] = useState<string | null>(null);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [salary, setSalary] = useState<number>(DEFAULT_GROSS_INCOME);
  const [result, setResult] = useState<EquivalenceResult | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [resultLoading, setResultLoading] = useState(false);

  function updateSource(nextSourceId: string | null) {
    setSourceId(nextSourceId);
    setTargetId((currentTargetId) =>
      nextSourceId !== null && currentTargetId === nextSourceId ? null : currentTargetId,
    );
  }

  function updateTarget(nextTargetId: string | null) {
    setTargetId(nextTargetId !== null && nextTargetId === sourceId ? null : nextTargetId);
  }

  function selectMapLocation(locationId: string) {
    if (sourceId === locationId) {
      setSourceId(null);
      return;
    }
    if (targetId === locationId) {
      setTargetId(null);
      return;
    }
    if (sourceId === null) {
      setSourceId(locationId);
      return;
    }
    if (targetId === null) {
      setTargetId(locationId);
      return;
    }
    setTargetId(locationId);
  }

  useEffect(() => {
    let cancelled = false;
    setResult(null);
    setLoadError(null);

    if (sourceId === null || targetId === null) {
      setResultLoading(false);
      return () => {
        cancelled = true;
      };
    }

    setResultLoading(true);
    computeEquivalence(sourceId, targetId, salary)
      .then((nextResult) => {
        if (!cancelled) {
          setResult(nextResult);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setLoadError(errorMessage(error));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setResultLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [sourceId, targetId, salary]);

  return (
    <main className="app-shell">
      <TopNav page="calculator" />
      <header className="app-header">
        <div>
          <p className="eyebrow">Salary comparison tool</p>
          <h1>City Salary Equivalence Calculator</h1>
          <p>
            Estimate the gross salary you would need in another city to preserve your surplus after
            both taxes and cost of living are included. Taxes cover federal, payroll, state, and
            supported local taxes; living costs include one-bedroom rent plus everyday spending.
            The current dataset covers 343 large U.S. cities.
          </p>
          <div className="intro-summary" aria-label="Quick explanation">
            <div>
              <strong>How to use it</strong>
              <span>Pick a source city, target city, and gross salary. The map and dropdowns stay in sync.</span>
            </div>
            <div>
              <strong>Equivalent salary</strong>
              <span>The target gross salary that preserves the same surplus after taxes and living costs.</span>
            </div>
            <div>
              <strong>Living costs</strong>
              <span>One-bedroom rent plus food, transportation, healthcare, internet/mobile, and other spending.</span>
            </div>
            <div>
              <strong>Fixed profile</strong>
              <span>Single W-2 U.S. citizen, single filer, no dependents, renting alone.</span>
            </div>
          </div>
        </div>
      </header>

      <section className="workspace">
        <aside className="control-panel">
          <div className="section-heading">
            <p className="eyebrow">Controls</p>
            <h2>Choose your comparison</h2>
          </div>
          <LocationSelect
            id="source"
            label="Source city"
            value={sourceId}
            locations={LOCATIONS}
            onChange={updateSource}
            placeholder="Select source city"
          />
          <LocationSelect
            id="target"
            label="Target city"
            value={targetId}
            locations={LOCATIONS}
            onChange={updateTarget}
            placeholder="Select target city"
          />
          <SalaryControl value={salary} onChange={setSalary} />
          <FixedProfileSummary />
        </aside>
        <Suspense fallback={<MapLoadingPanel />}>
          <DemoMap
            locations={LOCATIONS}
            sourceId={sourceId}
            targetId={targetId}
            onSelectLocation={selectMapLocation}
          />
        </Suspense>
      </section>

      {loadError && (
        <StatusPanel
          title="Could not load city data"
          message={loadError}
          tone="error"
        />
      )}

      {sourceId !== null && targetId !== null && resultLoading && !result && (
        <StatusPanel
          title="Loading selected comparison"
          message="Fetching the selected city data and tax curves."
        />
      )}

      {result && (
        <>
          <ResultCard result={result} />
          <ComputationBreakdown result={result} />
        </>
      )}
    </main>
  );
}

export default function App() {
  if (window.location.pathname === "/methodology") {
    return <MethodologyPage />;
  }
  if (window.location.pathname === "/sources") {
    return <SourcesPage />;
  }

  return <CalculatorPage />;
}
