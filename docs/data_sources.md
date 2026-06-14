# Data Sources

The production data pipeline has not been implemented yet. These are the intended public sources from `plan.md`.

| Need | Planned source | Notes |
|---|---|---|
| Price levels | BEA Regional Price Parities | State and metro price-level comparison. |
| Housing rent | HUD Fair Market Rents | Public rent estimates by county/FMR area, later SAFMR by ZIP. |
| Geographies | U.S. Census Gazetteer and Cartographic Boundary Files | Official IDs, labels, centroids, and map boundaries. |
| Taxes | PolicyEngine US | Federal, state, payroll, and supported local tax modeling. |
| Food | USDA Food Plans | Public food basket inputs. |
| Spending shares | BLS Consumer Expenditure Survey | Category shares by income and household type. |
| Inflation | BLS CPI-U | Normalize datasets to a common dollar year. |

The local app currently uses `src/lib/demoData.ts`, a tiny clearly marked fixture. No prohibited scraping is used.
