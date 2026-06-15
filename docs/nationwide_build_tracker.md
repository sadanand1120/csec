# Nationwide Data Build Tracker

This tracker keeps the 343-city expansion split into reviewable stages. Do not
advance a stage into app data until its source files, transforms, and QA outputs
exist with provenance.

## Scope

- Universe: U.S. Census subcounty city/town estimate records with
  `SUMLEV == 162` and July 1, 2025 population greater than or equal to 100,000.
- Note: the official 343-place Census convention includes Urban Honolulu CDP,
  Hawaii; general census-designated places are not otherwise included.
- Expected count: 343 cities.
- Profile: single W-2 individual, U.S. citizen, single filer, no children or
  dependents, renter living alone in a one-bedroom apartment.

## Stages

| Stage | Status | Owner | Output Gate |
| --- | --- | --- | --- |
| 0. Scope and schema | Complete | Lead agent | Scope docs and schema docs exist |
| 1. Census city universe | Complete | Lead agent + Census reviewer | 343 canonical city records with GEOIDs and provenance |
| 2. County and metro mapping | Complete | Lead agent + Geography agents | Every city has county/CBSA crosswalk rows and multi-county review packet |
| 2b. Local-tax mapping | Complete with explicit gap flags | Tax agents | Every city has reviewed local-tax jurisdiction flags |
| 3. HUD housing mapping | Complete | Housing agents | Every city maps to one reviewed 1BR FMR value |
| 4. BEA/BLS basket and price inputs | Complete | Spending/price agents | Shared basket and metro price inputs are reproducible |
| 5. PolicyEngine tax curves | Complete with raw-curve QA notes | Tax agents | Every city has a tax curve or explicit unsupported warning |
| 6. Integrated city files | Complete | Lead agent | Lazy-load city files and index generated from manifests |
| 7. QA and spot checks | In progress | Lead agent + QA agents | Structural, numerical, and human spot-check reports pass |

## Active Constraints

- No more than 10 sub-agents active at once.
- No agent may both gather a source dataset and approve its final integration.
- Every numeric field that reaches app data needs source, vintage, row/key, and
  transform provenance.
- Unsupported or ambiguous city mappings must become visible confidence flags,
  not silent defaults.

## Generated Artifacts

- City universe:
  `data/intermediate/city_universe/canonical_places_2025_pop_ge_100k.json`
  with `343` records.
- City universe manifest:
  `data/provenance/city_universe_manifest.json`.
- County/CBSA crosswalk:
  `data/intermediate/geography/place_county_cbsa_crosswalk.json` with `343`
  records.
- Geography review packet:
  `data/review/geography/multi_county_cbsa_review.json` with `65` flagged
  multi-county records.
- HUD FMR crosswalk:
  `data/intermediate/housing/place_hud_area_crosswalk.json` with all `343`
  cities resolved.
- Price and spending inputs:
  `data/intermediate/prices/city_cbsa_rpp_mapping.json`,
  `data/intermediate/spending/cex_single_renter_bands.json`, and
  `data/intermediate/inflation/cpi_normalization.json`.
- Tax jurisdiction manifest:
  `data/intermediate/tax/tax_jurisdiction_manifest.json`.
- PolicyEngine tax curves:
  `data/intermediate/tax/curves/*.json` with `343` generated city curves.
- App data:
  `src/lib/nationwideData.ts`, `src/lib/cityTaxCurves.ts`, and `src/lib/cities/*.ts`.

## Current QA Counts

- Multi-county places: `65`.
- Positive-population multi-county places: `57`.
- Positive-population multi-CBSA places: `9`.
- Non-CBSA county parts among the 343: `0`.
- HUD unresolved cities: `0`.
- BEA RPP mapped cities: `343`.
- Tax curves generated: `343`.
- City tax coverage status: `323` supported, `20` partial local missing.
