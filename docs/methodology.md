# Methodology

Given:

```text
S = source location
T = target location
X = source gross income
P = household/tax profile
B = lifestyle basket settings
```

Compute:

```text
N_S = after_tax_income(X, S, P)
C_S = annual_cost_of_basket(S, X, P, B)
R_S = N_S - C_S
```

Find `Y` such that:

```text
after_tax_income(Y, T, P) - annual_cost_of_same_basket(T, S, X, P, B) = R_S
```

Then:

```text
equivalent_salary = Y
equivalence_factor = Y / X
```

Plain English: estimate what you keep after taxes in the source city, subtract what the selected lifestyle costs there, then find the target-city gross salary that leaves you with the same amount after paying target-city taxes and buying the same lifestyle basket at target-city prices.

## Current Prototype

This local demo uses temporary fixture values for six locations. The calculation structure mirrors the planned model, but the data values are not production data.

## Planned Data Sources

- Taxes: PolicyEngine US.
- Housing: HUD Fair Market Rents.
- Price levels: BEA Regional Price Parities.
- Geography: U.S. Census Gazetteer and cartographic boundary files.
- Food and consumer spending: USDA Food Plans and BLS Consumer Expenditure Survey.

## Known Limitations

- City results are resolved to county/metro approximations.
- Demo rents and price indices are temporary placeholders.
- RSUs, bonuses, relocation costs, AMT, employer benefits, and owner costs are not modeled.
- The factor is salary-dependent and not symmetric.
