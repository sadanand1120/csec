# Wave 1 Source Method Notes

These notes summarize the first read-only source-review wave. They are working
implementation constraints, not final user-facing methodology text.

## Census Geography

- City universe source: Census `SUB-EST2025` CSV.
- City rule: `SUMLEV == 162` and `POPESTIMATE2025 >= 100000`.
- Count: 343.
- Important caveat: Urban Honolulu CDP, Hawaii is included in the Census
  city/town estimates convention; strict legally incorporated-only coverage
  would be 342.
- Place-to-county source: same `SUB-EST2025` CSV with `SUMLEV == 157`.
- Place-to-county join: `state_fips + place_fips`.
- Store all county parts. Do not flatten multi-county cities silently.
- Initial reviewer check: 65 of 343 places have multiple county-part rows; 57
  have positive population in more than one county; 9 positive-pop county-part
  sets span multiple CBSA codes.
- County-to-CBSA source: July 2023 OMB/Census delineation List 1.
- County-to-CBSA join: `FIPS State Code + FIPS County Code`.
- Use CBSA code for BEA joins; names are supplemental.

## HUD Housing

- Authoritative FY2026 FMR source: `FY26_FMRs_revised.xlsx`.
- Use `fmr_1` for one-bedroom Fair Market Rent.
- Use `hud_area_code` as canonical FMR area ID.
- HUD `fips` is a 10-character local key:
  `state_fips + county_fips + town_or_99999`.
- Most non-New-England rows can join by county GEOID via `fips[:5]`.
- New England needs town/county-subdivision handling.
- Use the PDF schedule only for human spot checks, not bulk ETL.
- Use HUD API only for QA spot checks unless a token/config decision is made.

## BEA/BLS Basket and Prices

- BEA metro RPP source: `MARPP.zip`, file `MARPP_MSA_2008_2024.csv`.
- Add fallbacks: `SARPP.zip` for states and `PARPP.zip` for state
  metro/nonmetro portions.
- BEA line codes:
  - `1`: all items
  - `2`: goods
  - `3`: services: housing
  - `4`: services: utilities
  - `5`: services: other
- Use goods/services/utilities line codes for non-housing repricing; keep HUD
  housing separate.
- BLS CEX source: 2024 CSV Interview Survey `intrvw24.zip`.
- CEX filter should require `FAM_SIZE == 1`, `CUTENURE == "4"`,
  `FSALARYX > 0`, and `FSMPFRMX == 0`.
- The initial local script used absent fields for part of the income exclusion;
  the nationwide pipeline must fail loudly if required fields are absent.
- `TELEPH` is telephone spending, not guaranteed full internet/mobile spending.
  Review category naming before final user-facing text.
- CPI source: `CUUR0000SA0`, CPI-U all items, U.S. city average, not
  seasonally adjusted.

## Taxes

- Initial local variables:
  `household_tax`, `income_tax`, `state_income_tax`, `local_income_tax`,
  `employee_social_security_tax`, `employee_medicare_tax`,
  `additional_medicare_tax`, `employee_state_payroll_tax`,
  `local_occupational_tax`.
- Build a reviewed tax-jurisdiction manifest before generating 343 curves.
- `state_code + county_fips` is not enough for all local taxes.
- Add `taxCoverageStatus`: `supported`, `partial_local_missing`, or
  `unsupported`.
- High-risk local-tax areas include NY, PA, OH, MI, MD, IN, KY, MO, OR, CO,
  IA, and AL city/local taxes.
- Generate tax curves in resumable city shards, with monotonicity and component
  checks before app integration.
