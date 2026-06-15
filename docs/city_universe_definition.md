# City Universe Definition

The nationwide calculator will initially cover U.S. Census subcounty
city/town-estimate records with July 1, 2025 resident population greater than
or equal to 100,000.

## Inclusion Rule

A place is included when all of the following are true:

- It appears in the U.S. Census Bureau `SUB-EST2025` subcounty population
  estimates CSV.
- `SUMLEV == 162`.
- `POPESTIMATE2025 >= 100000`.
- It joins to a 2025 Census Gazetteer place record by Census place GEOID.

## Exclusions

- Census-designated places are excluded for this initial nationwide build,
  except Urban Honolulu CDP, Hawaii, which is included in the official Census
  city/town estimates convention that produces the 343-place count.
- U.S. territories are excluded unless they meet the same incorporated-place
  table rule and are explicitly approved later.
- Places below 100,000 population are excluded unless a later product decision
  creates a reviewed manual include list.

## Why This Rule

The rule matches the user's target scale of roughly 300 cities while staying
fully reproducible from official Census data. Using Census place records gives
every included city a stable place GEOID needed for later county, metro,
housing, and tax mapping.
