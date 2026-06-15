# City Salary Equivalence Calculator

Local app for transparent city-to-city gross salary equivalence. It estimates the target-city gross salary needed to preserve the same surplus after taxes and modeled living costs.

The current dataset covers 343 U.S. Census city/town estimate records with 2025 population of at least 100,000. Data is generated from official government sources plus the open-source PolicyEngine US tax model.

## Run Locally

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## Rebuild Data

```bash
npm run build:data
```

The data pipeline builds the Census city universe, geography crosswalks, HUD rent inputs, BEA/BLS spending and price inputs, PolicyEngine US tax curves, and app-ready lazy city modules.

## Fixed Profile

- Single W-2 employee.
- U.S. citizen, single filer.
- No children or dependents.
- Lives alone in a 1BR rental apartment.

## Sources

- HUD FY2026 Fair Market Rents for 1BR gross rent.
- BEA 2024 metro Regional Price Parities for price repricing.
- BLS 2024 Consumer Expenditure Survey PUMD for single-person cost-of-living-basket inputs.
- PolicyEngine US for federal, state, payroll, and supported local tax curves.
- U.S. Census geography identifiers for city/county/CBSA mapping.
