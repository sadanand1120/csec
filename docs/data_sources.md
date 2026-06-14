# Data Sources

The local v0 uses generated public-source data in `src/lib/v0Data.ts`.

| Need | Source | V0 usage |
|---|---|---|
| Federal, state, payroll, and supported local taxes | PolicyEngine US `1.729.0` | Generates 2026 tax curves for a single W-2 filer with no dependents. NYC resident tax and Denver employee OPT are enabled for the relevant cities. |
| 1BR renter housing | HUD FY2026 Fair Market Rents | Uses 1BR monthly FMR x 12 as annual gross rent. |
| Metro price levels | BEA 2024 Regional Price Parities | Uses metro goods, housing, utilities, and other-services indices; v0 reprices non-housing CEX categories through documented category weights. |
| Non-housing COLB inputs | BLS 2024 Consumer Expenditure Survey PUMD | Uses single-person renter consumer units with wage/salary income and no farm or non-farm business income, grouped by income band. |
| Dollar-year normalization | BLS CPI-U all items, U.S. city average | Inflates 2024 CEX dollar amounts and income-band thresholds to May 2026 dollars. |
| Geography identifiers | U.S. Census place/county/CBSA identifiers | Maps the six v0 places to one tax county and one BEA metro area. |

## Six-City V0 Geography

| City | Tax county | Price metro |
|---|---|---|
| Austin, TX | Travis County | Austin-Round Rock-San Marcos, TX |
| Sunnyvale, CA | Santa Clara County | San Jose-Sunnyvale-Santa Clara, CA |
| New York, NY | New York County, with NYC resident tax | New York-Newark-Jersey City, NY-NJ |
| Seattle, WA | King County | Seattle-Tacoma-Bellevue, WA |
| Denver, CO | Denver County, with Denver employee OPT | Denver-Aurora-Centennial, CO |
| Raleigh, NC | Wake County | Raleigh-Cary, NC |

## Source Notes

- HUD FMR values are source-anchored constants in the builder for the six FMR areas; a later production pipeline should ingest HUD machine-readable files directly.
- BEA RPP indices are metro-level, not neighborhood-level.
- BLS CEX does not exactly encode “living alone in a 1BR apartment”; v0 uses CEX only for non-housing categories and HUD for the 1BR rent anchor.
- Tax component subtotals are explanatory. Total tax and net income are anchored to PolicyEngine `household_tax`.
