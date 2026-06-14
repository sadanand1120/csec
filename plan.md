# Plan: U.S. After-Tax Disposable-Income Equivalence Map

Last updated: 2026-06-14

## 0. Project summary

Build a transparent, reproducible, hosted web application that answers:

> If I earn gross salary `X` in source location `A`, what gross salary `Y` do I need in target location `B` to preserve the same after-tax disposable-income position after accounting for taxes and local cost differences?

The product should expose both:

1. A **pairwise city comparison**: source city + target city + gross salary + household/lifestyle settings -> equivalent target gross salary, factor, and explanation.
2. A **U.S. heatmap**: for a chosen source location and gross salary, show every county/metro/city colored by the required target gross salary factor.

The core custom metric is:

> **After-Tax Disposable-Income Equivalence Factor**

Suggested internal abbreviation:

```text
ATDIEF(source_location, target_location, gross_salary, profile, model_version)
```

where:

```text
ATDIEF = equivalent_target_gross_salary / source_gross_salary
```

This is not a simple cost-of-living index. It must combine:

- federal income taxes
- state income taxes
- payroll taxes
- state-specific payroll items, such as California SDI where modeled
- local income taxes where data and model support exist
- housing costs
- non-housing price levels
- household composition
- renter/owner mode
- selected lifestyle basket
- data vintage and source provenance

The key product differentiator is **explainability**. Every displayed factor should decompose into taxes, housing, non-housing expenses, and residual/savings preservation.

---

## 1. Non-negotiable design principles

### 1.1 Reproducibility

Every number displayed in the UI must be traceable to:

- a source dataset
- a data vintage/year
- an ingestion script
- a transformation script
- a model version
- a source file checksum

Do not manually paste values into the application logic.

### 1.2 Transparency

Every pairwise comparison should show:

- source gross salary
- source estimated net income
- source estimated annual tax burden
- source estimated local expense basket
- target required net income
- target estimated expense basket
- target required gross salary
- factor `Y / X`
- component-level deltas
- limitations and confidence level

### 1.3 Data legality

Use public/redistributable government data as the default base.

Do **not** scrape sites whose terms prohibit it. In particular, the MIT Living Wage Calculator methodology is useful, but its site explicitly says not to scrape its data. Treat MIT as:

- a methodology reference
- a validation benchmark
- a possible licensed data source only if permission is obtained

Do not base the core public database on Numbeo, Expatistan, Salary.com, NerdWallet, Bankrate, Zillow, Redfin, Apartments.com, etc. unless their licensing/API terms are explicitly compatible with the intended use.

### 1.4 Geography realism

Do not pretend that “city” is always a clean unit. U.S. cost, tax, rent, and price data usually exist at county, ZIP/ZCTA, metro, or state level.

Canonical database layers should be:

1. **County**: full national coverage; good for heatmap and many cost datasets.
2. **CBSA/MSA metro**: best available unit for BEA Regional Price Parities.
3. **Place/city**: good for search and user-facing labels, but must map to counties/metros/ZCTAs.
4. **ZIP/ZCTA**: useful for Small Area Fair Market Rents and housing detail; treat ZIP and ZCTA carefully because they are not identical.

### 1.5 Salary dependence

The equivalence factor is **salary-dependent**.

A single Austin-to-Sunnyvale factor is not valid for all salaries because:

- income taxes are progressive
- payroll tax caps create nonlinearities
- credits/deductions can create kinks
- fixed expenses become less important as gross income rises

Therefore the UI must include a **gross salary input/slider**, and the database/model should support salary curves or on-demand solving.

---

## 2. Core metric definition

### 2.1 Inputs

```text
source_location: canonical location id
source_gross_salary: annual W-2 gross compensation, default USD/year
target_location: canonical location id
household_profile: tax and family assumptions
lifestyle_profile: housing and expense assumptions
model_version: versioned calculation methodology
data_vintage: dataset versions/years
```

### 2.2 Household profile

MVP profile:

```yaml
filing_status: single
adults: 1
children: 0
w2_income_only: true
standard_deduction: true
pre_tax_401k_contribution: 0
hsa_contribution: 0
health_premium_user_input: null
itemized_deductions: false
other_income: 0
```

Later profiles:

```yaml
filing_status: married_joint | married_separate | head_of_household
adults: 1 | 2
children: 0..n
number_of_earners: 1 | 2
pre_tax_401k_contribution: dollar amount or percentage
hsa_contribution: dollar amount
itemized_deductions: true/false
mortgage_interest: optional
property_tax: optional
student_loan_interest: optional
```

### 2.3 Lifestyle profile

MVP lifestyle profile:

```yaml
housing_mode: renter
bedrooms: 1
rent_source: HUD_FMR_or_SAFMR
transportation_mode: car_default
healthcare_mode: employer_sponsored_default
food_mode: USDA_low_cost_or_CEX_default
nonhousing_mode: BEA_RPP_adjusted_CEX
surplus_mode: preserve_nominal_after_basket_surplus
```

Advanced lifestyle profile:

```yaml
housing_mode: renter | owner | custom
bedrooms: studio | 1 | 2 | 3 | 4
rent_percentile: 40th_FMR | SAFMR | custom_user_input
transportation_mode: car | public_transit | mixed | custom
food_mode: thrifty | low_cost | moderate | liberal | CEX_income_band
healthcare_mode: employer_sponsored | marketplace | custom
retirement_savings_mode: preserve_nominal | preserve_rate | ignore
custom_monthly_rent: optional
custom_monthly_spend_by_category: optional
```

### 2.4 Core equation

For a source gross salary `X`, solve for target gross salary `Y` such that:

```text
NetIncome(Y, target_location, household_profile)
  - TargetCostOfSameLifestyleBasket(source_location, target_location, X, household_profile, lifestyle_profile)
=
NetIncome(X, source_location, household_profile)
  - SourceCostOfLifestyleBasket(source_location, X, household_profile, lifestyle_profile)
```

Then:

```text
EquivalentSalary = Y
ATDIEF = Y / X
```

### 2.5 Default interpretation

Default mode should preserve:

```text
same nominal annual surplus after buying the modeled lifestyle basket
```

For a W-2 renter, this is the most intuitive model:

```text
source net pay - source local costs = target net pay - target local costs
```

### 2.6 Optional interpretations

Implement these later as UI toggles:

#### Mode A: Preserve nominal surplus

```text
source_surplus_dollars = target_surplus_dollars
```

Best for preserving savings/investment capacity in nominal dollars.

#### Mode B: Preserve real surplus

```text
source_surplus / source_nonhousing_price_index
=
target_surplus / target_nonhousing_price_index
```

Best when the leftover surplus is expected to be spent locally.

#### Mode C: Preserve savings rate

```text
source_surplus / source_gross_salary
=
target_surplus / target_gross_salary
```

Best for people who think in savings percentage rather than nominal savings dollars.

#### Mode D: Pure after-tax real income

```text
NetIncome(Y, target) / price_index(target)
=
NetIncome(X, source) / price_index(source)
```

This is simpler and useful as a reference line, but not the main product metric because it hides housing and category-level details.

---

## 3. Data source strategy

### 3.1 Primary recommended sources

Use these as the default public-data stack.

| Need | Primary source | Geography | Why | Notes |
|---|---|---:|---|---|
| Price levels | BEA Regional Price Parities | state, metro | Official U.S. government price-level comparison | Use category-level RPP where available. |
| Housing rent | HUD Fair Market Rents | county/FMR area, ZIP for SAFMR | Official rent estimates, yearly data, API/files | FMR is 40th percentile gross rent, not luxury market rent. |
| Geographies | U.S. Census Gazetteer + Cartographic Boundary Files | place, county, CBSA, state, ZCTA | Official IDs, lat/lon, map boundaries | Use GEOID as primary key. |
| Geocoding | Census Geocoder | address/coordinate -> geography | Official mapping to county/place/tract/etc. | Batch limits apply. |
| Taxes | PolicyEngine US | federal + state | Open-source tax-benefit microsimulation | Inspect exact variable coverage; write adapter tests. |
| Expense methodology | MIT Living Wage methodology | county, metro, state | Excellent public methodology | Do not scrape MIT data without permission. |
| Food | USDA Food Plans | national, household type | Public source for food basket | Adjust regionally using RPP/CPI or external method. |
| Broad consumer spending | BLS Consumer Expenditure Survey | national/region/income band | Category shares by income/household type | Useful for lifestyle basket defaults. |
| Inflation adjustment | BLS CPI-U | national/category | Inflate source data to common dollars | Use annual or monthly CPI depending on data frequency. |

### 3.2 Source pages to inspect and cite in docs

Include these links in the project README and data documentation:

- BEA Regional Price Parities: https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area
- BEA API: https://apps.bea.gov/API/signup/
- HUD FMR: https://www.huduser.gov/portal/datasets/fmr.html
- HUD FMR API: https://www.huduser.gov/portal/dataset/fmr-api.html
- Census cartographic boundary files: https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html
- Census gazetteer files: https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html
- Census geocoder API: https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html
- PolicyEngine US website: https://www.policyengine.org/us
- PolicyEngine US GitHub: https://github.com/PolicyEngine/policyengine-us
- MIT Living Wage methodology: https://livingwage.mit.edu/pages/methodology
- BLS Consumer Expenditure Survey: https://www.bls.gov/cex/
- BLS CPI: https://www.bls.gov/cpi/
- USDA Food Plans: https://www.fns.usda.gov/cnpp/usda-food-plans-cost-food-monthly-reports

### 3.3 Data sources to avoid for the core open database

Do not use these in the reproducible public database unless licensing is resolved:

- MIT raw values scraped from the website
- Numbeo scraped values
- Expatistan scraped values
- Salary.com scraped values
- NerdWallet/Bankrate calculator outputs
- Zillow/Redfin/ApartmentList listings or market-rent estimates without explicit API/license permission
- Levels.fyi scraped compensation data

These may be used only as **manual validation references** if terms allow, never as hidden model inputs.

---

## 4. Geography model

### 4.1 Canonical location types

Implement these location types:

```text
STATE
COUNTY
CBSA
PLACE
ZCTA
```

MVP should use:

- `COUNTY` for national heatmap
- `PLACE` for city search/autocomplete
- `CBSA` for BEA RPP matching when available
- `STATE` for tax model and fallback price levels

### 4.2 Why county-level heatmap is the MVP

County-level heatmap is the right first version because:

- counties cover the full U.S.
- county boundaries are stable and easy to map
- HUD FMR has county/FMR-area data
- taxes can map to state from county
- Census provides official county polygons and centroids
- users can understand county-level results

City-level choropleths are harder because many “cities” are Census places, some cross counties, and cost datasets rarely publish at city boundaries.

### 4.3 City/place handling

A user-facing city should be a Census `PLACE`, but calculations should resolve to a canonical computation geography.

For each place:

```text
place_id -> primary_county_id
place_id -> cbsa_id, if available
place_id -> state_id
place_id -> representative_lat_lon
place_id -> population
place_id -> list of intersecting counties with area/population weights
```

For places spanning multiple counties:

1. If population intersection data is available, use population-weighted counties.
2. Else use area-weighted intersection.
3. Else use Census representative point and assign to containing county.
4. Display a warning in UI: “This place spans multiple counties; results use weighted county approximation.”

### 4.4 Austin/Sunnyvale example resolution

Expected MVP behavior:

```text
Austin, TX -> PLACE -> mostly Travis County, TX -> Austin-Round Rock CBSA -> TX tax profile
Sunnyvale, CA -> PLACE -> Santa Clara County, CA -> San Jose-Sunnyvale-Santa Clara CBSA -> CA tax profile
```

If the user enters a full address or ZIP, use finer geography where possible:

```text
address/ZIP -> Census Geocoder -> county/state/tract/block -> county or ZCTA/ZIP rent layer
```

### 4.5 Geography tables

#### `dim_location`

```sql
CREATE TABLE dim_location (
  location_id TEXT PRIMARY KEY,
  location_type TEXT NOT NULL, -- STATE, COUNTY, CBSA, PLACE, ZCTA
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  state_fips TEXT,
  county_fips TEXT,
  cbsa_code TEXT,
  place_geoid TEXT,
  zcta TEXT,
  state_abbrev TEXT,
  lat DOUBLE,
  lon DOUBLE,
  population INTEGER,
  land_area_sq_m DOUBLE,
  water_area_sq_m DOUBLE,
  source_dataset TEXT NOT NULL,
  source_year INTEGER NOT NULL
);
```

#### `location_crosswalk`

```sql
CREATE TABLE location_crosswalk (
  from_location_id TEXT NOT NULL,
  to_location_id TEXT NOT NULL,
  relationship_type TEXT NOT NULL, -- contains, intersects, primary, cbsa_member, fallback
  weight DOUBLE NOT NULL DEFAULT 1.0,
  weight_basis TEXT, -- population, area, representative_point, exact
  source_dataset TEXT NOT NULL,
  source_year INTEGER NOT NULL,
  PRIMARY KEY (from_location_id, to_location_id, relationship_type)
);
```

#### `geo_boundary_asset`

```sql
CREATE TABLE geo_boundary_asset (
  location_type TEXT NOT NULL,
  source_year INTEGER NOT NULL,
  source_url TEXT NOT NULL,
  local_path TEXT NOT NULL,
  simplified_path TEXT,
  checksum_sha256 TEXT NOT NULL,
  generated_at TIMESTAMP NOT NULL,
  PRIMARY KEY (location_type, source_year)
);
```

---

## 5. Expense model

### 5.1 Expense categories

Normalize all expenses into these categories:

```text
housing_rent
utilities_nonrent
food_home
food_away
transportation
healthcare_premiums
healthcare_out_of_pocket
internet_mobile
personal_care
apparel
household_supplies
recreation
education
miscellaneous
```

For MVP, group into:

```text
housing
food
transportation
healthcare
internet_mobile
other_nonhousing
```

### 5.2 Housing model

#### MVP housing source

Use HUD FMR or SAFMR.

MVP choices:

```yaml
rent_source: HUD_FMR
bedrooms: 1
annual_housing_cost: 12 * fmr_1br
```

HUD FMR is a good transparent baseline, but it is not a luxury-market rent estimate. Make this explicit in UI.

#### Better housing options

Add later:

```yaml
rent_source: HUD_FMR_40th_percentile
rent_source: HUD_SAFMR_zip_level
rent_source: user_custom_monthly_rent
rent_source: licensed_market_rent_dataset
```

SAFMR is better for high-cost metro areas because ZIP-level rent variation matters a lot.

### 5.3 Non-housing price model

Use BEA RPP to adjust categories.

Recommended hierarchy:

1. Use metro-level RPP for a location if it belongs to a CBSA with BEA RPP data.
2. Else use state nonmetropolitan RPP if available.
3. Else use state RPP.
4. Else use national baseline `100.0` and mark low confidence.

For each category:

```text
category_price_index(location, category)
```

Map categories to the best available RPP group:

| Expense category | Preferred RPP group | Fallback |
|---|---|---|
| housing_rent | BEA rents or HUD rent ratio | state/metro all-items RPP |
| food_home | BEA goods | all-items RPP |
| food_away | BEA other services / all-items | all-items RPP |
| transportation | BEA goods/services blend | all-items RPP |
| healthcare | BEA other services | all-items RPP |
| internet_mobile | all-items or services | all-items RPP |
| other_nonhousing | BEA all-items excluding rents if available | all-items RPP |

If category-specific RPP is too coarse, document it and expose confidence.

### 5.4 Source-anchored basket method

This is the recommended default for “same quality of life.”

For source location `S`, target location `T`, and source gross salary `X`:

1. Estimate source net income:

```text
N_S = NetIncome(X, S, profile)
```

2. Build source basket expenses by category:

```text
E_S,c = DefaultSpend(category=c, source=S, salary=X, profile, lifestyle)
```

3. Convert source category spending to implied quantity:

```text
Q_c = E_S,c / PriceIndex(S, c)
```

4. Reprice that basket in target location:

```text
E_T,c = Q_c * PriceIndex(T, c)
```

For housing, use direct rent replacement if possible:

```text
E_T,housing = annual_rent(T, selected_bedrooms, rent_source)
```

rather than broad price-index repricing.

5. Preserve source surplus:

```text
Surplus_S = N_S - sum(E_S,c)
```

6. Required target net income:

```text
RequiredNet_T = sum(E_T,c) + Surplus_S
```

7. Invert target tax model:

```text
Y = GrossIncomeRequiredForNetIncome(RequiredNet_T, T, profile)
```

8. Factor:

```text
ATDIEF = Y / X
```

### 5.5 Default spend estimation

The hardest modeling question is: what is the source basket `E_S,c`?

Implement these modes:

#### Mode 1: Basic baseline basket

Use public-data basic-needs values:

- housing: HUD FMR
- food: USDA Food Plan adjusted by RPP
- transportation: BLS CEX/CNT-style default, adjusted by RPP
- healthcare: employer-sponsored default or user input
- internet/mobile: national default adjusted by RPP
- other: BLS CEX default adjusted by RPP

This mode is transparent and conservative.

#### Mode 2: CEX income-band lifestyle basket

Use BLS Consumer Expenditure Survey category shares by income bin/household type.

For a high-income tech worker, this is more realistic than the basic-needs basket.

Approach:

```text
estimated_total_consumption = f(after_tax_income, assumed_savings_rate)
category_spend = estimated_total_consumption * CEX_category_share(income_bin, household_type)
local_category_spend = category_spend * local_price_index / national_price_index
```

Expose assumed savings rate and allow override.

#### Mode 3: User custom basket

Allow the user to enter:

```yaml
monthly_rent
monthly_food
monthly_transportation
monthly_healthcare
monthly_other
annual_savings_goal
```

Then reprice categories by target/source price ratios.

This mode is most personally accurate.

### 5.6 Expense tables

#### `price_index`

```sql
CREATE TABLE price_index (
  location_id TEXT NOT NULL,
  geography_level TEXT NOT NULL, -- STATE, CBSA, COUNTY_FALLBACK, etc.
  category TEXT NOT NULL,
  index_value DOUBLE NOT NULL, -- national average = 100
  source_dataset TEXT NOT NULL,
  source_year INTEGER NOT NULL,
  confidence TEXT NOT NULL, -- high, medium, low
  notes TEXT,
  PRIMARY KEY (location_id, category, source_dataset, source_year)
);
```

#### `rent_estimate`

```sql
CREATE TABLE rent_estimate (
  location_id TEXT NOT NULL,
  geography_level TEXT NOT NULL, -- COUNTY, FMR_AREA, ZIP, ZCTA
  source_dataset TEXT NOT NULL, -- HUD_FMR, HUD_SAFMR, custom, licensed_market
  source_year INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  monthly_rent DOUBLE NOT NULL,
  includes_utilities BOOLEAN,
  percentile DOUBLE,
  confidence TEXT NOT NULL,
  notes TEXT,
  PRIMARY KEY (location_id, source_dataset, source_year, bedrooms)
);
```

#### `expense_component`

```sql
CREATE TABLE expense_component (
  location_id TEXT NOT NULL,
  profile_id TEXT NOT NULL,
  model_version TEXT NOT NULL,
  source_year INTEGER NOT NULL,
  category TEXT NOT NULL,
  annual_cost DOUBLE NOT NULL,
  source_dataset TEXT NOT NULL,
  confidence TEXT NOT NULL,
  notes TEXT,
  PRIMARY KEY (location_id, profile_id, model_version, source_year, category)
);
```

For source-anchored basket mode, `expense_component` may be generated on demand rather than fully precomputed.

---

## 6. Tax model

### 6.1 Recommended tax engine

Use PolicyEngine US as the primary tax model.

Required work:

1. Install `policyengine-us` in the backend/model package.
2. Build a narrow adapter function for W-2 households.
3. Write tests for known cases.
4. Store complete tax curve outputs for each location/profile/salary grid.

### 6.2 Tax model adapter

Target public interface:

```python
def estimate_net_income(
    gross_income: float,
    location_id: str,
    household_profile: HouseholdProfile,
    tax_year: int,
) -> TaxResult:
    ...
```

Return:

```python
@dataclass(frozen=True)
class TaxResult:
    gross_income: float
    net_income: float
    total_tax: float
    federal_income_tax: float | None
    state_income_tax: float | None
    payroll_tax_employee: float | None
    local_income_tax: float | None
    state_payroll_items: float | None
    credits: float | None
    marginal_rate_estimate: float | None
    effective_rate: float
    warnings: list[str]
```

### 6.3 PolicyEngine adapter details

Codex agent should inspect PolicyEngine US documentation and examples directly rather than guessing variable names.

Implementation steps:

1. Create `src/taxes/policyengine_adapter.py`.
2. Create `tests/test_policyengine_adapter.py`.
3. Implement a minimal “single W-2 adult, no children, standard deduction” situation.
4. Identify the right variables for:
   - employment income
   - state code
   - household or tax unit
   - federal income tax
   - state income tax
   - payroll tax / FICA
   - net income or disposable income if PolicyEngine provides it
5. Validate against simple known cases and external calculators for a few states.
6. If PolicyEngine does not expose a desired local tax or state payroll item, record a warning in `TaxResult.warnings`.

### 6.4 Fallback simplified tax engine

Implement a fallback engine only for debugging and tests.

Fallback should include:

- federal standard deduction
- federal ordinary income tax brackets
- Social Security employee tax with wage base
- Medicare employee tax
- Additional Medicare Tax above threshold
- state income tax brackets where easy
- California SDI if not covered elsewhere

Do **not** use fallback as the production model for all states unless PolicyEngine is unavailable.

### 6.5 Tax curve storage

Because tax inversion is needed often, precompute tax curves.

#### Salary grid

Use a dense grid from low to high salary:

```text
$0 to $100,000: every $1,000
$100,000 to $500,000: every $2,500 or $5,000
$500,000 to $1,500,000: every $10,000
$1,500,000 to $5,000,000: every $25,000 or $50,000
```

For MVP, a simpler grid is acceptable:

```text
0, 5k, 10k, ..., 500k, 510k, ..., 1.5M
```

Use interpolation for UI. For final pairwise result, optionally compute exact bisection server-side.

#### `tax_curve`

```sql
CREATE TABLE tax_curve (
  location_id TEXT NOT NULL,
  profile_id TEXT NOT NULL,
  tax_year INTEGER NOT NULL,
  gross_income DOUBLE NOT NULL,
  net_income DOUBLE NOT NULL,
  total_tax DOUBLE NOT NULL,
  federal_income_tax DOUBLE,
  state_income_tax DOUBLE,
  payroll_tax_employee DOUBLE,
  local_income_tax DOUBLE,
  state_payroll_items DOUBLE,
  effective_tax_rate DOUBLE,
  marginal_tax_rate_estimate DOUBLE,
  model_engine TEXT NOT NULL,
  model_version TEXT NOT NULL,
  warnings_json TEXT,
  PRIMARY KEY (location_id, profile_id, tax_year, gross_income)
);
```

### 6.6 Inverting net income

Implement:

```python
def gross_required_for_net(
    required_net_income: float,
    location_id: str,
    household_profile: HouseholdProfile,
    tax_year: int,
) -> float:
    ...
```

Algorithm:

1. Use precomputed tax curve for initial bracket.
2. Interpolate to estimate gross.
3. If backend is available, refine using bisection with exact tax adapter.
4. Return gross salary and error bound.

Pseudo-code:

```python
def invert_net_income(required_net, net_curve):
    if required_net <= 0:
        return 0.0

    # net_curve sorted by gross_income, net_income monotonic nondecreasing
    lo, hi = find_bracketing_points(net_curve, required_net)
    if hi is None:
        raise OutOfRangeError(required_net)

    # linear interpolation
    g0, n0 = lo.gross_income, lo.net_income
    g1, n1 = hi.gross_income, hi.net_income
    return g0 + (required_net - n0) * (g1 - g0) / (n1 - n0)
```

For exact server-side pairwise results:

```python
def bisect_gross_for_net(required_net, loc, profile, year):
    low = 0
    high = max(required_net * 3, 100_000)
    while estimate_net_income(high, loc, profile, year).net_income < required_net:
        high *= 2
    for _ in range(80):
        mid = (low + high) / 2
        if estimate_net_income(mid, loc, profile, year).net_income < required_net:
            low = mid
        else:
            high = mid
    return high
```

---

## 7. Equivalence engine

### 7.1 Public API

Core Python API:

```python
def compute_equivalence(
    source_location_id: str,
    target_location_id: str,
    source_gross_income: float,
    household_profile: HouseholdProfile,
    lifestyle_profile: LifestyleProfile,
    model_version: str,
    tax_year: int,
) -> EquivalenceResult:
    ...
```

Return:

```python
@dataclass(frozen=True)
class EquivalenceResult:
    source_location_id: str
    target_location_id: str
    source_gross_income: float
    target_equivalent_gross_income: float
    factor: float
    source_net_income: float
    target_net_income: float
    source_total_tax: float
    target_total_tax: float
    source_total_expenses: float
    target_total_expenses: float
    source_surplus: float
    target_surplus: float
    expense_breakdown_source: dict[str, float]
    expense_breakdown_target: dict[str, float]
    tax_breakdown_source: dict[str, float | None]
    tax_breakdown_target: dict[str, float | None]
    model_version: str
    data_vintage: dict[str, str]
    warnings: list[str]
    confidence: str
```

### 7.2 Pairwise calculation pseudo-code

```python
def compute_equivalence(source, target, X, household, lifestyle, year):
    source_tax = estimate_net_income(X, source, household, year)
    source_net = source_tax.net_income

    source_basket = build_source_lifestyle_basket(
        location_id=source,
        gross_income=X,
        net_income=source_net,
        household_profile=household,
        lifestyle_profile=lifestyle,
    )

    target_basket = reprice_basket(
        basket=source_basket,
        source_location_id=source,
        target_location_id=target,
        lifestyle_profile=lifestyle,
    )

    source_surplus = source_net - source_basket.total_annual_cost

    if lifestyle.surplus_mode == "preserve_nominal_after_basket_surplus":
        required_target_surplus = source_surplus
    elif lifestyle.surplus_mode == "preserve_real_after_basket_surplus":
        required_target_surplus = source_surplus * nonhousing_index(target) / nonhousing_index(source)
    elif lifestyle.surplus_mode == "preserve_savings_rate":
        # Need solve because target gross appears in target surplus target.
        # Implement by root finding on target surplus / target gross.
        required_target_surplus = None
    else:
        raise ValueError(lifestyle.surplus_mode)

    if required_target_surplus is not None:
        required_target_net = target_basket.total_annual_cost + required_target_surplus
        Y = gross_required_for_net(required_target_net, target, household, year)
    else:
        Y = solve_preserve_savings_rate(...)

    target_tax = estimate_net_income(Y, target, household, year)

    return EquivalenceResult(...)
```

### 7.3 Heatmap calculation

For a selected source `S` and salary `X`:

1. Build the source basket once.
2. Compute source surplus once.
3. For every target location `T`:
   - reprice basket to `T`
   - compute required target net
   - invert target net curve
   - compute factor
4. Return a vector:

```json
[
  {"location_id": "COUNTY:06085", "factor": 1.61, "equiv_salary": 281750, "confidence": "medium"},
  ...
]
```

### 7.4 Heatmap performance strategy

Do not precompute all pairwise source-target factors for all salaries. That is too large and unnecessary.

Instead precompute reusable primitives:

```text
location -> tax net-income curve
location -> price indices
location -> rent estimates
location -> geographies/boundaries
```

Then compute heatmap dynamically in browser or backend.

Options:

#### Option A: Static frontend with DuckDB-WASM

- Publish compressed Parquet files.
- Browser loads needed files.
- DuckDB-WASM computes heatmap.
- Good for transparency and cheap hosting.
- More frontend complexity.

#### Option B: Backend API with DuckDB/SQLite/Postgres

- Frontend calls `/api/heatmap`.
- Backend computes factors and returns JSON.
- Easier to implement and optimize.
- Requires hosted backend.

Recommended MVP: **backend API**.

Later: add static-data mode.

---

## 8. Database and storage design

### 8.1 Recommended local data stack

Use:

- Python for ETL/modeling
- DuckDB for local analytics and build-time transformations
- Parquet for versioned data artifacts
- SQLite or DuckDB file for simple API serving
- Postgres/Supabase only if multi-user features are needed

### 8.2 Repository layout

```text
atdief-map/
  README.md
  plan.md
  pyproject.toml
  package.json
  pnpm-lock.yaml
  Makefile
  .env.example
  data/
    raw/
      bea/
      bls/
      census/
      hud/
      policyengine/
      usda/
    interim/
    processed/
    public/
  notebooks/
    00_data_exploration.ipynb
    01_austin_sunnyvale_validation.ipynb
  src/
    atdief/
      __init__.py
      config.py
      schemas.py
      geography/
      ingest/
      expenses/
      taxes/
      equivalence/
      validation/
      api/
  web/
    app/
    components/
    lib/
    public/
  tests/
    test_geography.py
    test_expenses.py
    test_taxes.py
    test_equivalence.py
  docs/
    methodology.md
    data_sources.md
    limitations.md
    model_versions.md
```

### 8.3 Data catalog table

Every source file should be registered.

```sql
CREATE TABLE source_file (
  source_file_id TEXT PRIMARY KEY,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  retrieval_method TEXT NOT NULL, -- API, manual_download, static_url
  retrieval_timestamp TIMESTAMP NOT NULL,
  source_year INTEGER,
  local_raw_path TEXT NOT NULL,
  checksum_sha256 TEXT NOT NULL,
  license_notes TEXT,
  citation_text TEXT,
  parser_version TEXT NOT NULL
);
```

### 8.4 Model run table

```sql
CREATE TABLE model_run (
  model_run_id TEXT PRIMARY KEY,
  model_version TEXT NOT NULL,
  git_commit TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  tax_year INTEGER NOT NULL,
  data_vintage_json TEXT NOT NULL,
  config_json TEXT NOT NULL,
  notes TEXT
);
```

### 8.5 Final API tables

Generate compact files for UI/API:

```text
locations.parquet
location_search_index.json
county_boundaries_simplified.geojson
county_factor_values.json  # generated on demand or cached
price_indices.parquet
rent_estimates.parquet
tax_curves.parquet
```

---

## 9. ETL pipeline

### 9.1 Build pipeline commands

Provide these Makefile targets:

```makefile
setup:
	uv sync
	pnpm install

fetch-data:
	uv run python -m atdief.ingest.fetch_all

build-geographies:
	uv run python -m atdief.geography.build

build-price-indices:
	uv run python -m atdief.expenses.build_price_indices

build-rents:
	uv run python -m atdief.expenses.build_rents

build-tax-curves:
	uv run python -m atdief.taxes.build_curves

build-model:
	uv run python -m atdief.equivalence.build_artifacts

validate:
	uv run python -m pytest
	uv run python -m atdief.validation.run_all

build-web:
	pnpm --dir web build

dev-web:
	pnpm --dir web dev

all: fetch-data build-geographies build-price-indices build-rents build-tax-curves build-model validate build-web
```

### 9.2 Fetch scripts

Implement one source-specific fetcher per dataset:

```text
src/atdief/ingest/fetch_bea.py
src/atdief/ingest/fetch_hud.py
src/atdief/ingest/fetch_census.py
src/atdief/ingest/fetch_bls.py
src/atdief/ingest/fetch_usda.py
```

Each fetcher must:

1. Download source files or call API.
2. Save raw files without modification.
3. Compute SHA-256 checksum.
4. Register source in `source_file`.
5. Never silently overwrite a file with the same version unless checksum matches.

### 9.3 Transform scripts

Implement:

```text
src/atdief/geography/build_locations.py
src/atdief/geography/build_crosswalks.py
src/atdief/geography/simplify_boundaries.py
src/atdief/expenses/build_rpp.py
src/atdief/expenses/build_rents.py
src/atdief/expenses/build_baskets.py
src/atdief/taxes/build_tax_curves.py
src/atdief/equivalence/build_demo_cases.py
```

### 9.4 Data quality checks

Add validation checks:

```text
- every county has a state
- every county has rent fallback
- every county has a price-index fallback
- every place maps to at least one county
- every location has lat/lon
- every tax curve is monotonic nondecreasing in net income
- no negative rent values
- no missing source_file references
- all final values have model_version
```

---

## 10. Backend API

### 10.1 Recommended backend

Use either:

- FastAPI + DuckDB/SQLite
- Next.js API routes + DuckDB/SQLite

Recommended MVP:

```text
FastAPI backend + Next.js frontend
```

Reason: Python already owns the model and tax code, so backend can directly reuse the same modules.

### 10.2 API endpoints

#### `GET /api/locations/search`

Inputs:

```text
q: string
limit: int = 10
```

Returns:

```json
[
  {
    "location_id": "PLACE:0647700",
    "display_name": "Sunnyvale, CA",
    "location_type": "PLACE",
    "state": "CA",
    "lat": 37.3688,
    "lon": -122.0363,
    "resolved_computation_location_id": "COUNTY:06085"
  }
]
```

#### `POST /api/equivalence`

Input:

```json
{
  "source_location_id": "PLACE:4845700",
  "target_location_id": "PLACE:0677000",
  "source_gross_income": 175000,
  "household_profile": {
    "filing_status": "single",
    "children": 0,
    "standard_deduction": true
  },
  "lifestyle_profile": {
    "housing_mode": "renter",
    "bedrooms": 1,
    "rent_source": "HUD_FMR",
    "basket_mode": "basic_baseline",
    "surplus_mode": "preserve_nominal_after_basket_surplus"
  }
}
```

Output:

```json
{
  "source_gross_income": 175000,
  "target_equivalent_gross_income": 281000,
  "factor": 1.6057,
  "source_net_income": 132000,
  "target_net_income": 190000,
  "breakdown": {
    "tax_delta": 22000,
    "housing_delta": 26000,
    "nonhousing_delta": 12000,
    "gross_up_due_to_progressive_taxes": 46000
  },
  "warnings": [
    "Sunnyvale is resolved to Santa Clara County and San Jose-Sunnyvale-Santa Clara CBSA.",
    "Rent uses HUD 40th percentile FMR, not live market asking rent."
  ],
  "data_vintage": {
    "bea_rpp": "2024 release, published 2026-02-19",
    "hud_fmr": "FY2026",
    "tax_model": "PolicyEngine US version ..."
  }
}
```

#### `POST /api/heatmap`

Input:

```json
{
  "source_location_id": "PLACE:4845700",
  "source_gross_income": 175000,
  "target_layer": "COUNTY",
  "household_profile": {...},
  "lifestyle_profile": {...}
}
```

Output:

```json
{
  "source_location_id": "PLACE:4845700",
  "target_layer": "COUNTY",
  "values": [
    {"location_id": "COUNTY:06085", "factor": 1.61, "equivalent_salary": 281000, "confidence": "medium"},
    {"location_id": "COUNTY:48453", "factor": 1.00, "equivalent_salary": 175000, "confidence": "high"}
  ],
  "legend": {
    "min": 0.72,
    "max": 2.40,
    "source_factor": 1.00
  },
  "warnings": []
}
```

#### `GET /api/methodology`

Returns current model version, source datasets, and limitations.

#### `GET /api/health`

Returns build metadata and data vintage.

---

## 11. Frontend/UI plan

### 11.1 Recommended stack

Use:

```text
Next.js
TypeScript
React
MapLibre GL or react-map-gl
TanStack Query
Tailwind CSS or shadcn/ui
```

Alternative:

```text
Vite + React + TypeScript + MapLibre GL
```

Next.js is acceptable if using server routes; Vite is simpler for static deployment.

### 11.2 Main page layout

Desktop layout:

```text
┌───────────────────────────────────────────────────────────────┐
│ Header: After-Tax Salary Equivalence Map                       │
├───────────────────────┬───────────────────────────────────────┤
│ Control Panel          │ U.S. Map Heatmap                      │
│ - Source city          │ - County/metro choropleth             │
│ - Salary               │ - Hover tooltip                       │
│ - Target city          │ - Click to compare                    │
│ - Household profile    │ - Legend                              │
│ - Housing settings     │                                       │
│ - Basket mode          │                                       │
├───────────────────────┴───────────────────────────────────────┤
│ Result Panel: Equivalent salary + factor + decomposition        │
├───────────────────────────────────────────────────────────────┤
│ Methodology / Caveats / Data sources                            │
└───────────────────────────────────────────────────────────────┘
```

Mobile layout:

```text
Controls accordion -> result card -> map -> explanation accordion
```

### 11.3 Core UI controls

Controls:

```text
Source location autocomplete
Target location autocomplete
Source gross salary input
Salary slider
Filing status selector
Children selector
Housing mode selector
Bedrooms selector
Rent source selector
Basket mode selector
Surplus preservation mode selector
```

MVP defaults:

```text
Source: Austin, TX
Target: Sunnyvale, CA
Gross salary: 175000
Filing status: single
Children: 0
Housing: renter, 1BR, HUD FMR
Basket: basic baseline
Surplus: preserve nominal surplus
```

### 11.4 Result card

Show:

```text
$175,000 in Austin, TX ≈ $281,000 in Sunnyvale, CA
Factor: 1.61×
```

Then show a breakdown:

```text
Source after-tax income: $...
Target required after-tax income: $...
Added housing cost: $...
Added non-housing cost: $...
Added taxes/gross-up: $...
```

Use a waterfall chart for component deltas.

### 11.5 Map behavior

Map layer options:

```text
County heatmap/chloropleth
Metro heatmap/chloropleth
City/place point layer
```

MVP:

- county choropleth
- place markers only for searched source/target

Hover tooltip:

```text
Santa Clara County, CA
Equivalent salary: $281,000
Factor: 1.61×
Confidence: medium
Biggest drivers: housing, CA taxes
```

Click behavior:

- Click county: set as target and update result panel.
- Shift-click or right panel action: compare to source.

### 11.6 Explainability panel

The page must have an explanation section for every result.

Minimum content:

```text
This estimate solves for the target gross salary required so that target after-tax pay minus target cost of the modeled basket equals source after-tax pay minus source cost of the same basket.
```

Then display:

```text
Data used:
- Taxes: PolicyEngine US, tax year YYYY
- Housing: HUD FMR FYYYYY, 1BR
- Price levels: BEA Regional Price Parities YYYY
- Geography: Census YYYY Gazetteer/Boundaries
```

Then display warnings:

```text
- Rent uses HUD 40th percentile rent, not live market rent.
- City results are resolved to county/metro approximations.
- Employer benefits, RSUs, relocation costs, property taxes for owners, and personal consumption choices are not fully modeled unless entered manually.
```

### 11.7 Methodology page

Create `/methodology` with:

1. Metric definition.
2. Tax method.
3. Expense method.
4. Geography resolution method.
5. Data sources and vintages.
6. Known limitations.
7. Validation examples.
8. Link to GitHub repo and data build scripts.

---

## 12. Validation plan

### 12.1 Unit tests

Implement tests for:

```text
- geography ID parsing
- city -> county resolution
- county -> state resolution
- CBSA fallback
- price-index lookup fallback
- rent lookup fallback
- tax net income monotonicity
- net income inversion accuracy
- pairwise factor identity: source == target -> factor ≈ 1
- no missing source provenance
```

### 12.2 Golden test cases

Create `tests/golden_cases.yaml`:

```yaml
- name: same_location_identity
  source: Austin, TX
  target: Austin, TX
  gross: 175000
  expected_factor_range: [0.99, 1.01]

- name: austin_to_sunnyvale_single_renter
  source: Austin, TX
  target: Sunnyvale, CA
  gross: 175000
  expected_factor_range: [1.45, 1.85]

- name: sunnyvale_to_austin_inverse
  source: Sunnyvale, CA
  target: Austin, TX
  gross: 280000
  expected_equiv_range: [155000, 205000]

- name: no_income_tax_state_to_high_tax_state
  source: Dallas, TX
  target: San Francisco, CA
  gross: 200000
  expected_factor_gt: 1.4
```

Do not hardcode final public claims from these tests until data pipeline is complete.

### 12.3 External validation references

Use external calculators only for sanity checks, not as source-of-truth:

- Salary.com cost-of-living comparison
- NerdWallet cost-of-living calculator
- Bankrate cost-of-living calculator
- SmartAsset paycheck calculator
- ADP paycheck calculator
- MIT Living Wage Calculator public outputs, viewed manually or licensed if used systematically

Validation report should compare:

```text
our estimate vs external calculator estimate
absolute difference
likely reason for difference
```

### 12.4 Austin/Sunnyvale validation notebook

Create:

```text
notebooks/01_austin_sunnyvale_validation.ipynb
```

It should print:

```text
Source location resolution
Target location resolution
Source taxes
Target taxes
Source basket
Target basket
Equivalent salary
Factor
Component breakdown
Sensitivity to rent source
Sensitivity to salary
Sensitivity to surplus mode
```

### 12.5 Sensitivity analysis

For each selected pair, compute sensitivity to:

```text
rent source: FMR vs custom rent
bedrooms: studio/1BR/2BR
salary: 100k, 150k, 175k, 250k, 400k
filing status: single vs married
surplus mode: nominal vs real vs savings rate
price-index fallback: county/metro/state
```

Show this in development docs and optionally in the UI.

---

## 13. Accuracy/confidence model

### 13.1 Confidence levels

Each output should have a confidence label:

```text
high
medium
low
```

Suggested criteria:

#### High confidence

- county/city maps cleanly to one county or metro
- tax model covers state well
- HUD rent available directly
- BEA RPP available for relevant metro/state
- no major fallback used

#### Medium confidence

- city spans multiple counties but weighted resolution is available
- RPP is available only at metro/state level
- housing uses county FMR rather than ZIP SAFMR
- some category-level price indices use fallback categories

#### Low confidence

- rural/nonmetro fallback uses state price levels
- local city/county income tax may be missing
- housing data unavailable or highly imputed
- geography mapping ambiguous

### 13.2 Warning system

Implement warnings as structured codes:

```python
class WarningCode(str, Enum):
    CITY_SPANS_MULTIPLE_COUNTIES = "CITY_SPANS_MULTIPLE_COUNTIES"
    USING_STATE_RPP_FALLBACK = "USING_STATE_RPP_FALLBACK"
    USING_COUNTY_FMR_NOT_ZIP_RENT = "USING_COUNTY_FMR_NOT_ZIP_RENT"
    LOCAL_TAX_NOT_MODELED = "LOCAL_TAX_NOT_MODELED"
    POLICYENGINE_VARIABLE_MISSING = "POLICYENGINE_VARIABLE_MISSING"
    HIGH_INCOME_EXTRAPOLATION = "HIGH_INCOME_EXTRAPOLATION"
```

UI should translate codes into readable messages.

---

## 14. Model versioning

### 14.1 Version names

Use explicit semantic versions:

```text
model_v0_1_basic_fmr_rpp_policyengine
model_v0_2_safmr_cex_category_basket
model_v1_0_public_release
```

### 14.2 Version documentation

Create `docs/model_versions.md`:

```markdown
# Model Versions

## model_v0_1_basic_fmr_rpp_policyengine

Tax engine: PolicyEngine US
Housing: HUD FY2026 FMR, county/FMR area
Non-housing prices: BEA 2024 RPP, metro/state fallback
Basket: basic baseline
Surplus: preserve nominal after-basket surplus
Known limitations: ...
```

### 14.3 Reproducible outputs

Every API response should include:

```json
{
  "model_version": "model_v0_1_basic_fmr_rpp_policyengine",
  "data_vintage": {
    "bea_rpp": "2024",
    "hud_fmr": "FY2026",
    "census_geography": "2025",
    "tax_year": "2026"
  }
}
```

---

## 15. Implementation phases

## Phase 0: Project initialization

### Goals

Create the repository skeleton, data contracts, and demo stubs.

### Tasks

- [ ] Create GitHub repository.
- [ ] Add `README.md` with project purpose.
- [ ] Add `plan.md`.
- [ ] Set up Python project with `uv` or Poetry.
- [ ] Set up TypeScript frontend.
- [ ] Add linting/formatting:
  - Python: ruff, mypy optional
  - TypeScript: eslint, prettier
- [ ] Add test runner:
  - Python: pytest
  - Frontend: vitest or Playwright later
- [ ] Add CI workflow:
  - install
  - lint
  - test
  - build

### Deliverables

```text
repo builds locally
placeholder web page runs
placeholder API health endpoint returns version
```

---

## Phase 1: Data exploration and source validation

### Goals

Confirm exact files/APIs, licenses, fields, and granularity before building production ETL.

### Tasks

- [ ] Inspect BEA RPP downloadable data and/or API.
- [ ] Identify RPP fields for metro/state and categories.
- [ ] Inspect HUD FMR API and downloadable xlsx files.
- [ ] Identify fields for county/FMR area/SAFMR, bedrooms, year.
- [ ] Inspect Census Gazetteer files for states/counties/places/ZCTAs.
- [ ] Inspect Census cartographic boundary files for county/CBSA/place.
- [ ] Inspect PolicyEngine US examples and variable names.
- [ ] Inspect BLS CEX data format and category mappings.
- [ ] Inspect USDA Food Plan reports and machine-readable access options.
- [ ] Produce `docs/data_sources.md` with exact source URLs, licensing notes, and field names.

### Deliverables

```text
docs/data_sources.md
notebooks/00_data_exploration.ipynb
source-file download proof of concept
```

### Acceptance criteria

- [ ] Every planned data source has a source URL.
- [ ] Every planned data source has license/terms notes.
- [ ] Every source has a known ingestion path.
- [ ] No prohibited scraping is required.

---

## Phase 2: Geography database

### Goals

Build canonical location tables and map assets.

### Tasks

- [ ] Download Census Gazetteer files.
- [ ] Parse state, county, place, CBSA if available, ZCTA where needed.
- [ ] Download Census cartographic boundary files for counties.
- [ ] Build `dim_location`.
- [ ] Build `location_crosswalk`.
- [ ] Resolve place -> county mappings.
- [ ] Resolve county -> state mappings.
- [ ] Resolve county/place -> CBSA mappings.
- [ ] Generate simplified county GeoJSON for frontend.
- [ ] Generate search index for autocomplete.

### Deliverables

```text
data/processed/locations.parquet
data/processed/location_crosswalk.parquet
data/public/county_boundaries_simplified.geojson
data/public/location_search_index.json
```

### Acceptance criteria

- [ ] Austin, TX resolves correctly.
- [ ] Sunnyvale, CA resolves correctly.
- [ ] Every county has state, lat/lon, display name.
- [ ] Every Census place has at least one computation fallback.
- [ ] County GeoJSON renders in frontend.

---

## Phase 3: Cost database

### Goals

Build rent and price-index tables.

### Tasks

- [ ] Download/import BEA RPP.
- [ ] Normalize BEA RPP to `price_index` table.
- [ ] Build county/place fallback to CBSA/state RPP.
- [ ] Download/import HUD FMR county/FMR area data.
- [ ] Download/import HUD SAFMR ZIP-level data if feasible.
- [ ] Normalize HUD data to `rent_estimate` table.
- [ ] Implement rent lookup function.
- [ ] Implement category price-index lookup function.
- [ ] Implement default source basket builder.
- [ ] Implement basket repricing across locations.

### Deliverables

```text
data/processed/price_indices.parquet
data/processed/rent_estimates.parquet
src/atdief/expenses/*.py
tests/test_expenses.py
```

### Acceptance criteria

- [ ] Every county has a housing cost for MVP profile.
- [ ] Every county has nonhousing price-index fallback.
- [ ] Austin and Sunnyvale show plausible housing difference.
- [ ] Source-basket repricing returns category-level breakdown.
- [ ] All fallback usage is recorded as warnings.

---

## Phase 4: Tax engine

### Goals

Build and validate tax curves.

### Tasks

- [ ] Install and inspect PolicyEngine US.
- [ ] Implement `PolicyEngineTaxAdapter`.
- [ ] Implement `TaxResult` schema.
- [ ] Implement single W-2 adult MVP profile.
- [ ] Add state mapping from location to tax jurisdiction.
- [ ] Generate tax curves for all states or all counties.
- [ ] Implement net-income inversion.
- [ ] Validate monotonicity of curves.
- [ ] Compare sample outputs with external paycheck calculators.

### Deliverables

```text
data/processed/tax_curves.parquet
src/atdief/taxes/policyengine_adapter.py
src/atdief/taxes/inversion.py
tests/test_taxes.py
```

### Acceptance criteria

- [ ] Austin/TX tax estimates reflect no Texas individual income tax.
- [ ] California target estimates include California state tax effects where PolicyEngine models them.
- [ ] Payroll taxes are included.
- [ ] Net income curves are monotonic for every state/profile.
- [ ] Inversion error is below $100 for tested salary grid cases.

---

## Phase 5: Equivalence engine

### Goals

Implement pairwise and heatmap calculation.

### Tasks

- [ ] Implement `compute_equivalence`.
- [ ] Implement `compute_heatmap_values`.
- [ ] Implement component breakdown.
- [ ] Implement warning/confidence aggregation.
- [ ] Implement Austin -> Sunnyvale notebook.
- [ ] Implement golden tests.
- [ ] Generate demo fixture for frontend.

### Deliverables

```text
src/atdief/equivalence/engine.py
src/atdief/equivalence/heatmap.py
notebooks/01_austin_sunnyvale_validation.ipynb
data/public/demo_austin_sunnyvale.json
tests/test_equivalence.py
```

### Acceptance criteria

- [ ] Same source/target gives factor approximately 1.0.
- [ ] Austin -> Sunnyvale at $175k gives a reasonable >1.0 factor.
- [ ] Sunnyvale -> Austin gives a reciprocal-ish but not exactly reciprocal result due tax nonlinearity.
- [ ] Output includes full tax and expense breakdown.
- [ ] Heatmap returns results for all counties.

---

## Phase 6: Backend API

### Goals

Serve calculations to frontend.

### Tasks

- [ ] Create FastAPI app.
- [ ] Add `/api/health`.
- [ ] Add `/api/locations/search`.
- [ ] Add `/api/equivalence`.
- [ ] Add `/api/heatmap`.
- [ ] Add request/response Pydantic schemas.
- [ ] Add basic caching for heatmap queries.
- [ ] Add API tests.
- [ ] Add deployment config.

### Deliverables

```text
src/atdief/api/main.py
src/atdief/api/schemas.py
tests/test_api.py
```

### Acceptance criteria

- [ ] API returns Austin/Sunnyvale pairwise result.
- [ ] API returns county heatmap values in under 2 seconds on local machine for MVP grid.
- [ ] API response includes model version and data vintages.
- [ ] Invalid inputs return useful errors.

---

## Phase 7: Frontend MVP

### Goals

Build an interactive, usable web page.

### Tasks

- [ ] Create Next.js app shell.
- [ ] Implement location autocomplete.
- [ ] Implement salary input and slider.
- [ ] Implement household/lifestyle controls.
- [ ] Implement result card.
- [ ] Implement component breakdown chart.
- [ ] Implement county map with MapLibre.
- [ ] Implement hover/click tooltip.
- [ ] Implement methodology drawer.
- [ ] Implement loading/error states.

### Deliverables

```text
web/app/page.tsx
web/components/LocationSearch.tsx
web/components/SalaryControl.tsx
web/components/ResultCard.tsx
web/components/BreakdownChart.tsx
web/components/USMap.tsx
web/components/MethodologyPanel.tsx
```

### Acceptance criteria

- [ ] User can enter Austin and Sunnyvale.
- [ ] User can change source salary.
- [ ] Result updates correctly.
- [ ] Heatmap updates correctly.
- [ ] Clicking a county sets target.
- [ ] Explanation panel clearly shows data sources and caveats.

---

## Phase 8: Deployment

### Goals

Host a public demo.

### Option A: Vercel + hosted FastAPI

- Frontend: Vercel
- Backend: Render/Fly.io/Railway
- Data: packaged DuckDB/SQLite file or hosted object storage

### Option B: Single-container deployment

- Docker image with FastAPI serving API and static frontend build
- Deploy on Fly.io/Render/Railway

### Option C: Static-only advanced deployment

- Precomputed data as Parquet/JSON
- Frontend computes with DuckDB-WASM
- Deploy on GitHub Pages/Cloudflare Pages/Vercel static

Recommended MVP: **Option B** for simplicity.

### Tasks

- [ ] Create Dockerfile.
- [ ] Create production build script.
- [ ] Add environment variables for data path and API base URL.
- [ ] Add smoke test after deployment.
- [ ] Add scheduled data rebuild workflow if desired.

### Deliverables

```text
Dockerfile
render.yaml or fly.toml
.github/workflows/build.yml
.github/workflows/deploy.yml
```

---

## 16. UI copy guidelines

### 16.1 Main headline

```text
After-tax salary equivalence across U.S. cities
```

### 16.2 Result sentence

```text
$175,000 in Austin, TX is approximately equivalent to $281,000 in Sunnyvale, CA under the selected assumptions.
```

### 16.3 Methodology sentence

```text
We solve for the target gross salary required so that target after-tax income minus the target cost of the modeled lifestyle basket equals source after-tax income minus the source cost of the same basket.
```

### 16.4 Caveat sentence

```text
This is an estimate, not financial or tax advice. Results depend strongly on rent, household profile, tax assumptions, and the selected lifestyle basket.
```

### 16.5 Housing caveat

```text
Default rent uses HUD Fair Market Rent, which estimates 40th percentile gross rent for standard-quality units. It may understate or overstate the rent you personally expect to pay.
```

---

## 17. Example Austin -> Sunnyvale explanation format

The UI should produce an explanation similar to this:

```markdown
## $175,000 in Austin, TX -> Sunnyvale, CA

Estimated equivalent gross salary: **$Y**
Factor: **F×**

### Why

Your selected source salary produces approximately **$A** after tax in Austin. Under the selected basket, modeled annual expenses in Austin are **$B**, leaving **$C** of after-basket surplus.

To preserve that same surplus in Sunnyvale, the model estimates annual expenses of **$D**. Therefore, the target location requires approximately **$E** after tax. After California/federal/payroll taxes, the gross salary needed to produce that net income is **$Y**.

### Main drivers

- Housing difference: +$...
- Non-housing price difference: +$...
- State/payroll tax difference and gross-up: +$...

### Data used

- Taxes: PolicyEngine US, tax year YYYY
- Housing: HUD FMR FYYYYY, 1BR renter profile
- Prices: BEA Regional Price Parities YYYY
- Geography: Census YYYY

### Limitations

- City is resolved to county/metro approximations.
- HUD FMR is not live luxury-market rent.
- RSUs, bonuses, relocation costs, and employer-specific benefits are not modeled unless entered manually.
```

---

## 18. Engineering details

### 18.1 Python dependencies

Suggested dependencies:

```toml
[project]
dependencies = [
  "duckdb",
  "polars",
  "pandas",
  "pyarrow",
  "pydantic",
  "requests",
  "httpx",
  "geopandas",
  "shapely",
  "pyogrio",
  "fastapi",
  "uvicorn",
  "policyengine-us",
  "numpy",
  "scipy",
  "rich",
]
```

If `geopandas` dependency is painful, use `ogr2ogr`/`tippecanoe` externally for geospatial conversion and keep Python geospatial work minimal.

### 18.2 Frontend dependencies

Suggested dependencies:

```json
{
  "dependencies": {
    "@tanstack/react-query": "latest",
    "maplibre-gl": "latest",
    "react-map-gl": "latest",
    "zod": "latest",
    "d3-scale": "latest",
    "d3-format": "latest",
    "cmdk": "latest",
    "recharts": "latest"
  }
}
```

### 18.3 Precision conventions

- Store dollars as floats in analytical tables, but round only at display time.
- API should return full numeric values and display-friendly rounded values.
- UI salary should round to nearest `$1,000` by default.
- Internal solver tolerance: `$1` to `$100` depending on mode.
- Public display: nearest `$500` or `$1,000`.

### 18.4 Performance targets

MVP targets:

```text
location search: <100 ms backend
pairwise comparison: <300 ms backend if tax curves are precomputed
county heatmap: <2 seconds backend
frontend map render: <1 second after values arrive
```

Optimized targets:

```text
pairwise comparison: <100 ms
county heatmap: <500 ms
```

Use caching by key:

```text
source_location_id
gross_income rounded to nearest $1,000
household_profile hash
lifestyle_profile hash
model_version
target_layer
```

---

## 19. Known limitations to document honestly

Include these limitations in docs and UI:

1. **No model can capture exact personal quality of life.** The app estimates a financial equivalence under explicit assumptions.
2. **Housing dominates results.** Users should enter custom rent if they know what they would pay.
3. **City boundaries are messy.** Many user-facing cities are approximated by county/metro/ZIP data.
4. **Rent data may be conservative.** HUD FMR is 40th percentile standard-quality rent, not live market asking rent.
5. **High-income tech compensation is complex.** RSUs, bonuses, AMT, capital gains, and relocation benefits are not included in the MVP W-2 salary model.
6. **Employer benefits vary.** Health premiums, 401(k) match, ESPP, and commuter benefits can materially change equivalence.
7. **Owner costs are harder than renter costs.** Mortgage rates, down payment, property tax, insurance, maintenance, and SALT deduction interactions need separate modeling.
8. **Local taxes may be incomplete.** PolicyEngine coverage should be checked and warnings shown.
9. **The factor is not symmetric.** `factor(A->B, X)` is not necessarily exactly `1 / factor(B->A, Y)` due to progressive taxes and nonlinear assumptions.
10. **The factor is salary-dependent.** Always display the salary used.

---

## 20. First MVP scope

Build this first:

```text
Input:
- source place/city
- target place/city
- source gross salary
- single adult, no children, W-2
- renter, 1BR
- preserve nominal after-basket surplus

Data:
- Census locations/boundaries
- BEA RPP price indices
- HUD FMR rent
- PolicyEngine US taxes

Output:
- pairwise equivalent salary
- county heatmap
- breakdown and caveats
```

Do **not** start with:

```text
- owner/mortgage model
- RSU/capital gains model
- live market-rent scraping
- family/childcare complexity
- ZIP-level interactive map
- authentication/accounts
- personalized saved profiles
```

Those are later additions.

---

## 21. Suggested Codex execution order

Give Codex issues in this order:

### Issue 1: Repository scaffold

```text
Create project scaffold with Python package, FastAPI placeholder, Next.js frontend placeholder, tests, linting, Makefile, and docs folders.
```

### Issue 2: Data source exploration doc

```text
Inspect BEA, HUD, Census, PolicyEngine, BLS CEX, USDA sources. Create docs/data_sources.md listing exact URLs, fields, vintages, licenses, and proposed parser functions. Do not implement full ETL yet.
```

### Issue 3: Geography ETL

```text
Implement Census Gazetteer and county boundary ingestion. Build dim_location, location_crosswalk, simplified county GeoJSON, and search index. Add tests for Austin and Sunnyvale resolution.
```

### Issue 4: Rent and price-index ETL

```text
Implement HUD FMR ingestion and BEA RPP ingestion. Normalize to rent_estimate and price_index tables. Add fallback logic and tests.
```

### Issue 5: Tax adapter

```text
Implement PolicyEngine US tax adapter for single W-2 adult profile. Build tax curves and net-income inversion. Add monotonicity and known-case tests.
```

### Issue 6: Equivalence engine

```text
Implement source basket, basket repricing, target net requirement, gross inversion, pairwise result, breakdown, warnings, and confidence score. Add Austin->Sunnyvale notebook and golden tests.
```

### Issue 7: API

```text
Implement FastAPI endpoints for location search, pairwise equivalence, heatmap values, methodology, and health. Add API tests.
```

### Issue 8: Frontend MVP

```text
Implement React UI with controls, result card, explanation panel, and county map heatmap. Wire to API. Add Austin/Sunnyvale default demo.
```

### Issue 9: Deployment

```text
Create Docker deployment and publish public demo. Add build metadata and data-vintage display.
```

---

## 22. Final acceptance criteria for MVP release

The MVP is complete only when all are true:

- [ ] User can search Austin, TX and Sunnyvale, CA.
- [ ] User can enter `$175,000` as source gross salary.
- [ ] App returns equivalent Sunnyvale gross salary and factor.
- [ ] Result includes tax and expense breakdown.
- [ ] Result includes data source vintages.
- [ ] Result includes limitations/warnings.
- [ ] U.S. county heatmap renders for selected source/salary.
- [ ] Clicking a county changes target comparison.
- [ ] Same-location comparison returns factor approximately `1.00`.
- [ ] All data artifacts are reproducible from scripts.
- [ ] No prohibited scraping is used.
- [ ] Docs explain methodology clearly enough for a user to challenge the assumptions.

---

## 23. Open questions for later

Codex should not block MVP on these, but should create GitHub issues for them:

1. Should default high-income tech lifestyle use CEX top-income-bin spending rather than basic-needs basket?
2. Should RSUs be modeled separately from W-2 base salary?
3. Should pretax 401(k)/HSA contributions be included by default?
4. Should custom rent be the primary default for serious pairwise comparisons?
5. Should target salary preserve nominal savings, real savings, or savings rate by default?
6. How should owner costs be modeled?
7. Should the map show county, metro, or place by default?
8. Can a legally licensed market-rent dataset be integrated?
9. Should local sales tax be modeled separately or treated as embedded in observed price levels?
10. Should employer benefit differences be included?

---

## 24. Recommended product name ideas

Internal names:

```text
atdief-map
salary-equivalence-map
real-salary-map
city-salary-converter
```

User-facing names:

```text
RealSalary Map
AfterTax Atlas
Salary Equivalence Map
Disposable Income Map
```

Use neutral naming until methodology is stable.

---

## 25. Minimal demo target

Before building the full database, create a tiny deterministic demo with only:

```text
Austin, TX
Sunnyvale, CA
New York, NY
Seattle, WA
Denver, CO
Raleigh, NC
```

Hardcode only for the demo fixture, clearly marked as fake/temporary.

Then replace with real ETL outputs.

Demo should validate UX quickly without waiting for every data source.

---

## 26. Core formula summary for docs

Use this exact math in methodology docs:

```text
Given:
  S = source location
  T = target location
  X = source gross income
  P = household/tax profile
  B = lifestyle basket settings

Compute:
  N_S = after_tax_income(X, S, P)
  C_S = annual_cost_of_basket(S, X, P, B)
  R_S = N_S - C_S

Find Y such that:
  after_tax_income(Y, T, P) - annual_cost_of_same_basket(T, S, X, P, B) = R_S

Then:
  equivalent_salary = Y
  equivalence_factor = Y / X
```

Plain-English version:

```text
We estimate what you keep after taxes in the source city, subtract what the selected lifestyle costs there, then find the target-city gross salary that leaves you with the same amount after paying target-city taxes and buying the same lifestyle basket at target-city prices.
```

---

## 27. Immediate next action for Codex

Start with this command sequence:

```bash
mkdir atdief-map
cd atdief-map
git init
mkdir -p src/atdief/{ingest,geography,expenses,taxes,equivalence,validation,api} web docs data/{raw,interim,processed,public} notebooks tests
```

Then create:

```text
README.md
pyproject.toml
Makefile
.env.example
docs/methodology.md
docs/data_sources.md
src/atdief/schemas.py
src/atdief/config.py
```

First real implementation task:

```text
Implement the location/geography ETL and make Austin/Sunnyvale resolve correctly.
```

Reason: everything else depends on stable location IDs and geography crosswalks.
