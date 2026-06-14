# Methodology

V0 computes salary equivalence for one fixed profile:

- Single W-2 employee.
- U.S. citizen, single filer.
- No children or dependents.
- Renter living alone in a 1BR apartment.

Given:

```text
S = source city
T = target city
X = source gross W-2 salary
P = fixed v0 profile
```

Compute:

```text
N_S = post_tax_income(X, S, P)
C_S = COLB(S, X, P)
R_S = N_S - C_S
```

Find `Y` such that:

```text
post_tax_income(Y, T, P) - COLB(T, S, X, P) = R_S
```

Then:

```text
equivalent_salary = Y
equivalence_factor = Y / X
```

Plain English: estimate the source-city net income, subtract the modeled source-city cost-of-living-basket, then find the target-city gross salary that leaves the same post-tax+COLB surplus.

## V0 Data Path

`scripts/build_v0_data.py` builds `src/lib/v0Data.ts`.

- Taxes: PolicyEngine US `1.729.0`, tax year 2026, single filing status, W-2 employment income only. The frontend uses precomputed gross-to-tax curves and interpolation.
- Housing: HUD FY2026 1BR Fair Market Rent, annualized as monthly FMR x 12. FMR is a gross rent standard, not a live market rent.
- Non-housing COLB: BLS 2024 Consumer Expenditure Survey Interview PUMD, filtered to single-person renter consumer units with wage/salary income and no farm or non-farm business income.
- Dollar normalization: BLS CPI-U all items, U.S. city average, not seasonally adjusted; 2024 CEX dollars are inflated to May 2026.
- Local prices: BEA 2024 metro Regional Price Parities. Broad BEA categories are mapped to app categories with documented weights in the generated data.
- Geography: each v0 city maps to one county for tax calculation and one CBSA for metro price parities.

## Known Limits

- BLS CEX does not identify “1BR apartment living alone” as exactly as the app profile; v0 uses HUD for the 1BR housing cost and CEX for non-housing COLB inputs.
- Some final 2026 state forms may not be published yet; PolicyEngine is pinned for reproducibility and should be refreshed deliberately.
- City-neighborhood variation, employer benefits, pre-tax deductions, RSUs, bonuses, AMT, itemized deductions, moving costs, owner costs, and retirement contributions are excluded.
- The equivalence factor is salary-dependent and directional.
