# Nationwide Agent Handoff Plan

The lead agent owns orchestration, final integration, schema changes, and app
changes. Sub-agents work on bounded source or QA slices and never approve their
own gathered data for final app use.

## Concurrency Rule

Keep at most 10 agents active. Prefer 3-6 agents per wave so review stays
manageable.

## Wave 1: Source Method Lockdown

Goal: turn the remaining source families into exact, reproducible ingestion
plans before writing broad data.

| Agent | Role | Scope | Deliverable |
| --- | --- | --- | --- |
| Geography reviewer | Explorer | Census place/county geometry, CBSA mapping source, multi-county policy | Exact source URLs, join keys, caveats |
| HUD reviewer | Explorer | FY2026 1BR FMR data and FMR area definitions | Exact table/API/file, fields, city-to-FMR mapping method |
| BEA/BLS reviewer | Explorer | BEA RPP, BLS CEX, BLS CPI | Exact files/API, line codes, category mapping risks |
| Tax reviewer | Explorer | PolicyEngine state/local support | Unsupported jurisdictions, local tax flags, curve-generation risks |

No app files are edited in Wave 1.

## Wave 2: Geography Shards

Goal: map the 343 Census places to computation geographies.

| Agent | Role | Scope | Output |
| --- | --- | --- | --- |
| Northeast geography worker | Worker | Northeast state shard | County/CBSA crosswalk rows + notes |
| South geography worker | Worker | South state shard | County/CBSA crosswalk rows + notes |
| Midwest geography worker | Worker | Midwest state shard | County/CBSA crosswalk rows + notes |
| West geography worker | Worker | West state shard | County/CBSA crosswalk rows + notes |
| Geography QA reviewer | Explorer | All geography outputs | Duplicate/missing/ambiguous mapping report |

Workers write only under `data/intermediate/geography/` and
`data/review/geography/`.

## Wave 3: Housing and Price Inputs

Goal: create reviewed city-to-HUD and city-to-BEA/BLS inputs.

| Agent | Role | Scope | Output |
| --- | --- | --- | --- |
| HUD worker A | Worker | HUD source ingest | Raw/intermediate FY2026 1BR FMR data |
| HUD worker B | Worker | City-to-FMR mapping | Place-to-HUD crosswalk |
| BEA worker | Worker | BEA RPP ingest | Metro/state/nonmetro RPP table |
| BLS worker | Worker | CEX/CPI shared basket | Shared basket bands and CPI normalization |
| Housing/price QA reviewer | Explorer | Cross-source checks | Missing/ambiguous source report |

Workers write only under `data/intermediate/housing/`,
`data/intermediate/prices/`, `data/intermediate/spending/`,
`data/intermediate/inflation/`, and matching provenance folders.

## Wave 4: Tax Curves

Goal: generate PolicyEngine curves only after tax geography is stable.

| Agent | Role | Scope | Output |
| --- | --- | --- | --- |
| Tax support reviewer | Explorer | PolicyEngine variable support | Support matrix and unsupported local tax list |
| Tax worker shard 1 | Worker | City tax-curve shard | Intermediate curve files |
| Tax worker shard 2 | Worker | City tax-curve shard | Intermediate curve files |
| Tax worker shard 3 | Worker | City tax-curve shard | Intermediate curve files |
| Tax QA reviewer | Explorer | All curve outputs | Monotonicity/component/net checks |

Workers write only under `data/intermediate/tax/` until QA passes.

## Wave 5: Integration and QA

Goal: produce app-ready data only from reviewed intermediate files.

| Agent | Role | Scope | Output |
| --- | --- | --- | --- |
| Lead agent | Orchestrator | Generated TypeScript city index and lazy files | `src/lib/nationwideData.ts`, `src/lib/cities/*.ts`, loader map |
| Structural QA reviewer | Explorer | Generated app data | Required fields, duplicate IDs, bundle size |
| Numerical QA reviewer | Explorer | Calculator outputs | Reverse checks, baseline regression, extreme salaries |
| Source-page reviewer | Explorer | User-facing provenance text | Clear source explanations and warnings |

Final app integration is done by the lead agent after QA findings are resolved.
