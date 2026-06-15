import { Suspense, lazy, useEffect, useState } from "react";
import ComputationBreakdown from "./components/ComputationBreakdown";
import LocationSelect from "./components/LocationSelect";
import ResultCard from "./components/ResultCard";
import SalaryControl from "./components/SalaryControl";
import {
  DEFAULT_GROSS_INCOME,
  DEFAULT_SOURCE_ID,
  DEFAULT_TARGET_ID,
  FIXED_PROFILE,
  LOCATIONS,
  MODEL_VERSION,
  computeEquivalence,
  computeHeatmap,
} from "./lib/equivalence";
import type { HeatmapValue } from "./lib/equivalence";
import type { EquivalenceResult } from "./lib/types";
import { V0_DATA } from "./lib/v0Data";

const DemoMap = lazy(() => import("./components/DemoMap"));

type PageName = "calculator" | "methodology" | "sources";
type SourceKey = keyof typeof V0_DATA.sources;

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
      "PolicyEngine US is an open-source tax and benefit calculation engine. In this app it turns a gross salary into federal income tax, employee payroll tax, state income tax, supported local tax, total household tax, and net income for the fixed single W-2 profile.",
    usedFor:
      "The backend builds tax year 2026 curves for Austin, Sunnyvale, New York, Seattle, Denver, and Raleigh over the full v0 salary grid. The frontend interpolates those precomputed curves instead of running tax code in the browser.",
  },
  {
    key: "hudFmr",
    title: "U.S. Department of Housing and Urban Development Fair Market Rents",
    description:
      "The U.S. Department of Housing and Urban Development publishes Fair Market Rents, often abbreviated HUD FMR. FMR is a gross-rent standard used in housing programs; it includes shelter rent plus tenant-paid utilities for a typical rental unit size.",
    usedFor:
      "The annual housing part of the cost-of-living-basket: each city uses the fiscal year 2026 one-bedroom FMR multiplied by twelve. The six v0 monthly rent values are stored in the generated data artifact after being extracted from the HUD FY2026 schedule rows for the relevant FMR areas.",
  },
  {
    key: "beaRpp",
    title: "Bureau of Economic Analysis Regional Price Parities",
    description:
      "The Bureau of Economic Analysis, abbreviated BEA, publishes Regional Price Parities, abbreviated RPP. RPP compares price levels across metro areas relative to the national average of 100. The backend downloads the BEA MARPP file and reads line code 1 for all items, line code 2 for goods, line code 3 for housing, line code 4 for utilities, and line code 5 for other services.",
    usedFor:
      "V0 currently uses line code 2, goods, and line code 5, other services, to reprice the non-housing COLB categories. Line code 1, all items, line code 3, housing, and line code 4, utilities, are kept in the local data artifact for auditability and future model work, but they are not used in the current calculator formula because housing comes from HUD FMR.",
  },
  {
    key: "blsCex",
    title: "Bureau of Labor Statistics Consumer Expenditure Survey",
    description:
      "The Bureau of Labor Statistics, abbreviated BLS, runs the Consumer Expenditure Survey, abbreviated CEX. The public-use microdata files contain anonymized household-level spending records.",
    usedFor:
      "The backend uses the 2024 Interview Survey public-use microdata to estimate national non-housing COLB categories for single-person renter consumer units with wage or salary income and no farm or non-farm business income. It reads the BLS family summary files and combines the quarter suffixes specified in the BLS public-use microdata layout.",
  },
  {
    key: "blsCpi",
    title: "Bureau of Labor Statistics Consumer Price Index",
    description:
      "The Consumer Price Index, abbreviated CPI, measures how consumer prices change over time. This app uses CPI-U, the Consumer Price Index for All Urban Consumers.",
    usedFor:
      "The backend calls the BLS public API for CPI-U all items, U.S. city average, not seasonally adjusted. It inflates 2024 Consumer Expenditure Survey dollar amounts and income-band thresholds to the latest available 2026 CPI month used by the generated artifact.",
  },
  {
    key: "census",
    title: "U.S. Census Bureau Geography",
    description:
      "The U.S. Census Bureau publishes official place, county, and metro-area identifiers. TIGERweb is a Census mapping service, and CBSA means Core Based Statistical Area, the official metro-area grouping used by several federal datasets.",
    usedFor:
      "V0 uses fixed Census-derived city-to-county and city-to-CBSA mappings for the six places. The county feeds the tax simulation; the CBSA selects the metro Regional Price Parity values used to reprice non-housing COLB.",
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
    <section className="fixed-profile" aria-label="Fixed v0 profile">
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
        <h3>Equivalent salary factor</h3>
      </div>
      <div className="map-loading" role="status">
        <strong>Loading city tax curves</strong>
        <span>Fetching the city-level files needed for the map.</span>
      </div>
    </section>
  );
}

function MethodologyPage() {
  return (
    <main className="article-page">
      <TopNav page="methodology" />
      <article className="article-doc">
        <p className="eyebrow">Six-city v0 methodology</p>
        <h1>How the salary equivalence calculation works</h1>
        <p className="article-lede">
          The calculator answers one question: what gross salary in a target city leaves the same
          post-tax+COLB surplus as a known gross salary in a source city? COLB means
          cost-of-living-basket: the fixed bundle of housing and non-housing costs used by this
          v0 model.
        </p>

        <h2>The fixed profile</h2>
        <p>
          V0 intentionally keeps the household simple: one single W-2 employee, a U.S. citizen,
          single tax filer, no children or dependents, renting a one-bedroom apartment alone.
          There are no visa, spouse, dependent, owner-cost, bonus, stock-compensation, or itemized
          deduction branches in this version.
        </p>

        <h2>The language used in the calculator</h2>
        <p>
          Gross salary means pre-tax salary. Net income means post-tax income. More generally,
          <strong> pre-X</strong> means before deducting X, and <strong>post-X</strong> means after
          deducting X. So post-COLB income is income after the cost-of-living-basket is paid, and
          post-tax+COLB surplus is what remains after both taxes and the modeled COLB are paid.
        </p>

        <h2>The actual equation</h2>
        <p>
          First, the app computes the source city net income from the source gross salary. Then it
          subtracts the source city COLB. That gives source post-tax+COLB surplus.
        </p>
        <pre>{`source_net = post_tax(source_gross, source_city)
source_surplus = source_net - COLB(source_city)

Find target_gross such that:
post_tax(target_gross, target_city) - COLB(target_city)
  = source_surplus`}</pre>
        <p>
          In other words, the target gross salary is not chosen by matching rent alone or tax alone.
          It is chosen by preserving the same post-tax+COLB surplus.
        </p>

        <h2>What is inside COLB</h2>
        <p>
          The cost-of-living-basket has one housing line and five non-housing lines: food,
          transportation, healthcare, internet/mobile, and other non-housing spending. Housing is
          the one-bedroom fair-market rent for the location. Non-housing spending starts from a
          national COLB estimate for similar single renter households, then gets repriced with
          metro-area price indexes.
        </p>

        <h2>How the target salary is solved</h2>
        <p>
          The backend precomputes tax curves into one generated file per city. A curve says, for
          many possible gross salaries, what the post-tax net income would be. During interaction,
          the frontend lazily loads the city curve files it needs, then finds the target gross salary
          whose net income is just high enough to pay the target COLB while preserving the source
          surplus. If the exact salary falls between two curve points, it uses linear interpolation.
        </p>

        <h2>Important limits</h2>
        <p>
          V0 uses one county and one metro area for each city. It does not model neighborhood-level
          rents, employer benefits, pre-tax retirement contributions, health savings accounts,
          flexible spending accounts, alternative minimum tax, relocation costs, or ownership costs.
          The result is salary-dependent and directional: Austin to Sunnyvale is not the same
          operation as Sunnyvale to Austin.
        </p>

        <h2>Concrete model assumptions in v0</h2>
        <ul>
          <li>The person is one adult, modeled as age 30 for tax-simulation purposes.</li>
          <li>The person is a U.S. citizen, single, unmarried, with no children or dependents.</li>
          <li>All compensation entered in the calculator is W-2 wage income.</li>
          <li>No bonuses, restricted stock units, stock options, self-employment income, capital gains, or investment income are modeled.</li>
          <li>No pre-tax 401(k), health savings account, flexible spending account, commuter benefit, or insurance-premium deductions are modeled.</li>
          <li>The person takes whatever baseline tax treatment PolicyEngine applies for this simple single-filer situation; no custom itemized deductions are entered.</li>
          <li>The person rents alone in a one-bedroom apartment.</li>
          <li>Housing COLB is exactly HUD fiscal year 2026 one-bedroom Fair Market Rent multiplied by twelve.</li>
          <li>Non-housing COLB uses BLS Consumer Expenditure Survey single-person renter consumer units with wage or salary income and no farm or non-farm business income.</li>
          <li>2024 Consumer Expenditure Survey dollar amounts are inflated to May 2026 using CPI-U, the Consumer Price Index for All Urban Consumers.</li>
          <li>Food uses the BEA goods price index.</li>
          <li>Transportation uses 65% BEA goods and 35% BEA other-services price indexes.</li>
          <li>Healthcare uses the BEA other-services price index.</li>
          <li>Internet/mobile uses the BEA other-services price index.</li>
          <li>Other non-housing COLB uses 45% BEA goods and 55% BEA other-services price indexes.</li>
          <li>Each city is resolved to one tax county and one metro area in v0.</li>
          <li>Target gross salary is solved by linear interpolation over precomputed PolicyEngine tax curves.</li>
          <li>Tax component lines are explanatory; total tax and net income are anchored to PolicyEngine <code>household_tax</code>.</li>
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
        <p className="eyebrow">Backend sources</p>
        <h1>What data powers the calculator</h1>
        <p className="article-lede">
          The app uses generated local data artifacts: <code>src/lib/v0Data.ts</code> for shared
          metadata and <code>src/lib/cities/</code> for one tax-curve file per city. Those files are
          built from the public external data sources listed below. This page explains each source
          in plain language.
        </p>

        <div className="source-list">
          {SOURCE_EXPLAINERS.map((entry) => {
            const source = V0_DATA.sources[entry.key];
            return (
              <section className="source-entry" key={entry.key}>
                <h2>{entry.title}</h2>
                <p>{entry.description}</p>
                <p>{entry.usedFor}</p>
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
  const [sourceId, setSourceId] = useState<string>(DEFAULT_SOURCE_ID);
  const [targetId, setTargetId] = useState<string>(DEFAULT_TARGET_ID);
  const [salary, setSalary] = useState<number>(DEFAULT_GROSS_INCOME);
  const [result, setResult] = useState<EquivalenceResult | null>(null);
  const [heatmap, setHeatmap] = useState<HeatmapValue[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [resultLoading, setResultLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setResultLoading(true);
    setResult(null);
    setLoadError(null);

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

  useEffect(() => {
    let cancelled = false;
    setHeatmap(null);

    computeHeatmap(sourceId, salary)
      .then((nextHeatmap) => {
        if (!cancelled) {
          setHeatmap(nextHeatmap);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setLoadError(errorMessage(error));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [sourceId, salary]);

  return (
    <main className="app-shell">
      <TopNav page="calculator" />
      <header className="app-header">
        <div>
          <p className="eyebrow">Six-city real-source v0</p>
          <h1>Post-tax+COLB salary equivalence across U.S. cities</h1>
          <p>
            Compare gross salaries for a fixed single W-2 profile using PolicyEngine taxes,
            HUD 1BR FMR rent, BEA metro price parities, and BLS spending data.
          </p>
        </div>
        <div className="version-badge">{MODEL_VERSION}</div>
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
            locations={LOCATIONS}
            onChange={setSourceId}
          />
          <LocationSelect
            id="target"
            label="Target city"
            value={targetId}
            locations={LOCATIONS}
            onChange={setTargetId}
          />
          <SalaryControl value={salary} onChange={setSalary} />
          <FixedProfileSummary />
        </aside>
        {heatmap ? (
          <Suspense fallback={<MapLoadingPanel />}>
            <DemoMap
              values={heatmap}
              sourceId={sourceId}
              targetId={targetId}
              onSelectTarget={setTargetId}
            />
          </Suspense>
        ) : (
          <MapLoadingPanel />
        )}
      </section>

      {loadError && (
        <StatusPanel
          title="Could not load city data"
          message={loadError}
          tone="error"
        />
      )}

      {resultLoading && !result && (
        <StatusPanel
          title="Loading selected comparison"
          message="Fetching the city-level tax curve files for the selected source and target."
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
