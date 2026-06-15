# Data Sources

The app uses generated data in `src/lib/nationwideData.ts` and lazy tax-curve modules in `src/lib/cities/`.

| Need | Source | Usage |
|---|---|---|
| Federal, state, payroll, and supported local taxes | PolicyEngine US `1.729.0` | Generates 2026 tax curves for a single W-2 filer with no dependents. Supported local taxes are enabled where PolicyEngine exposes the needed variables; known local gaps are flagged city by city. |
| 1BR renter housing | HUD FY2026 Fair Market Rents | Uses 1BR monthly FMR x 12 as annual gross rent. |
| Metro price levels | BEA 2024 Regional Price Parities | Uses metro goods and other-services indices to reprice non-housing CEX categories through documented category weights. |
| Non-housing living-cost inputs | BLS 2024 Consumer Expenditure Survey PUMD | Uses single-person renter consumer units with wage/salary income and no farm or non-farm business income, grouped by income band. |
| Dollar-year normalization | BLS CPI-U all items, U.S. city average | Inflates 2024 CEX dollar amounts and income-band thresholds to May 2026 dollars. |
| Geography identifiers | U.S. Census place/county/CBSA identifiers | Defines the 343-city universe, maps places to county parts, and chooses a primary metro area. |

## Source Notes

- HUD FMR values come from the FY2026 revised workbook and are joined through HUD FMR area codes.
- BEA RPP indices are metro-level, not neighborhood-level.
- BLS CEX does not exactly encode “living alone in a 1BR apartment”; the app uses CEX only for non-housing categories and HUD for the 1BR rent anchor.
- Tax component subtotals are explanatory. Total tax and net income are anchored to PolicyEngine `household_tax`.
