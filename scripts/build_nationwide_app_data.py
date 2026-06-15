"""Generate app-ready nationwide TypeScript data from reviewed artifacts."""

from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

CITY_UNIVERSE = ROOT / "data/intermediate/city_universe/canonical_places_2025_pop_ge_100k.json"
GEOGRAPHY = ROOT / "data/intermediate/geography/place_county_cbsa_crosswalk.json"
HOUSING = ROOT / "data/intermediate/housing/place_hud_area_crosswalk.json"
PRICE_MAPPING = ROOT / "data/intermediate/prices/city_cbsa_rpp_mapping.json"
SPENDING_BANDS = ROOT / "data/intermediate/spending/cex_single_renter_bands.json"
CATEGORY_PRICE_WEIGHTS = ROOT / "data/intermediate/spending/category_price_weights.json"
CPI_NORMALIZATION = ROOT / "data/intermediate/inflation/cpi_normalization.json"
TAX_JURISDICTIONS = ROOT / "data/intermediate/tax/tax_jurisdiction_manifest.json"
TAX_CURVE_MANIFEST = ROOT / "data/provenance/tax_curve_manifest.json"

OUT_DATA = ROOT / "src/lib/nationwideData.ts"
OUT_CURVE_LOADER = ROOT / "src/lib/cityTaxCurves.ts"
OUT_CITY_DIR = ROOT / "src/lib/cities"

MODEL_VERSION = "nationwide_2026_343_city"
DEFAULT_SOURCE_ID = "PLACE:4805000"
DEFAULT_TARGET_ID = "PLACE:0677000"
DEFAULT_GROSS_INCOME = 175_000


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def camel_case_slug(slug: str) -> str:
    parts = re.sub(r"[^A-Za-z0-9]+", " ", slug).split()
    return parts[0].lower() + "".join(part[:1].upper() + part[1:].lower() for part in parts[1:])


def convert_price_index(rpp: dict) -> dict:
    return {
        "all": rpp["all_items"],
        "goods": rpp["goods"],
        "housing": rpp["housing"],
        "utilities": rpp["utilities"],
        "servicesOther": rpp["other_services"],
    }


def convert_weights(weights: dict) -> dict:
    return {
        category: {
            ("servicesOther" if key == "other_services" else key): value
            for key, value in category_weights.items()
        }
        for category, category_weights in weights.items()
    }


def make_resolution_note(geo: dict, housing: dict, tax: dict) -> str:
    notes = [
        f"{geo['display_name']} uses {geo['computation_county_name']} as the computation county."
    ]
    if geo["flags"]["multi_county"]:
        notes.append(
            f"The city spans {len(geo['county_parts'])} county parts; the computation county has "
            f"{geo['computation_county_population_share_2025']:.1%} of 2025 city population."
        )
    if geo["flags"]["multi_cbsa"]:
        notes.append("The city spans multiple CBSAs; the primary CBSA is chosen by population share.")
    if housing["flags"]["multi_hud"]:
        selected = housing["selected_hud_area"]
        notes.append(
            f"Housing uses the dominant HUD FMR area ({selected['hud_area_name']}, "
            f"{selected['population_share_2025']:.1%} population share)."
        )
    if tax["coverage"] != "supported":
        notes.extend(tax["notes"])
    return " ".join(notes)


def make_confidence(geo: dict, housing: dict, price: dict, tax: dict) -> str:
    if tax["coverage"] != "supported":
        return "low"
    if geo["flags"]["multi_cbsa"] or housing["flags"]["multi_hud"] or price["mapping_confidence"] != "high":
        return "medium"
    return "high"


def write_typescript_dataset(dataset: dict) -> None:
    OUT_DATA.write_text(
        "import type { SalaryDataset } from \"./types\";\n\n"
        f"export const SALARY_DATA = {json.dumps(dataset, indent=2, sort_keys=True)} as const satisfies SalaryDataset;\n",
        encoding="utf-8",
    )


def write_city_curves(cities: list[dict], manifest: dict) -> None:
    shutil.rmtree(OUT_CITY_DIR, ignore_errors=True)
    OUT_CITY_DIR.mkdir(parents=True, exist_ok=True)
    path_by_id = {entry["id"]: ROOT / entry["path"] for entry in manifest["curves"]}
    loader_entries = []
    for city in cities:
        module_name = camel_case_slug(city["slug"])
        curve = load_json(path_by_id[city["id"]])
        (OUT_CITY_DIR / f"{module_name}.ts").write_text(
            "import type { TaxCurve } from \"../types\";\n\n"
            f"export const CITY_ID = {json.dumps(city['id'])};\n\n"
            f"export const CITY_TAX_CURVE = {json.dumps(curve, separators=(',', ':'), sort_keys=True)} as const satisfies TaxCurve;\n",
            encoding="utf-8",
        )
        loader_entries.append((city["id"], module_name))

    loader_lines = "\n".join(
        f"  {json.dumps(city_id)}: () => import(\"./cities/{module_name}\"),"
        for city_id, module_name in loader_entries
    )
    OUT_CURVE_LOADER.write_text(
        "import type { TaxCurve } from \"./types\";\n\n"
        "type CityTaxCurveModule = {\n"
        "  CITY_TAX_CURVE: TaxCurve;\n"
        "};\n\n"
        "const LOADERS: Record<string, () => Promise<CityTaxCurveModule>> = {\n"
        f"{loader_lines}\n"
        "};\n\n"
        "const CACHE = new Map<string, Promise<TaxCurve>>();\n\n"
        "export const TAX_CURVE_LOCATION_IDS = Object.keys(LOADERS);\n\n"
        "export function loadTaxCurve(locationId: string): Promise<TaxCurve> {\n"
        "  const loader = LOADERS[locationId];\n"
        "  if (!loader) {\n"
        "    throw new Error(`Missing city tax curve loader for ${locationId}`);\n"
        "  }\n\n"
        "  let cached = CACHE.get(locationId);\n"
        "  if (!cached) {\n"
        "    cached = loader().then((module) => module.CITY_TAX_CURVE);\n"
        "    CACHE.set(locationId, cached);\n"
        "  }\n\n"
        "  return cached;\n"
        "}\n\n"
        "export async function loadTaxCurveMap(\n"
        "  locationIds: readonly string[],\n"
        "): Promise<Record<string, TaxCurve>> {\n"
        "  const entries = await Promise.all(\n"
        "    locationIds.map(async (locationId) => [locationId, await loadTaxCurve(locationId)] as const),\n"
        "  );\n"
        "  return Object.fromEntries(entries);\n"
        "}\n",
        encoding="utf-8",
    )


def main() -> None:
    cities = load_json(CITY_UNIVERSE)
    geography = {record["id"]: record for record in load_json(GEOGRAPHY)}
    housing = {record["id"]: record for record in load_json(HOUSING)}
    price = {record["id"]: record for record in load_json(PRICE_MAPPING)["records"]}
    spending = load_json(SPENDING_BANDS)
    weights = load_json(CATEGORY_PRICE_WEIGHTS)
    cpi = load_json(CPI_NORMALIZATION)
    tax = {record["id"]: record for record in load_json(TAX_JURISDICTIONS)}
    tax_curve_manifest = load_json(TAX_CURVE_MANIFEST)

    locations = []
    for city in cities:
        geo = geography[city["id"]]
        house = housing[city["id"]]
        price_record = price[city["id"]]
        tax_record = tax[city["id"]]
        selected_hud = house["selected_hud_area"]
        if selected_hud is None:
            raise ValueError(f"Missing selected HUD area for {city['display_name']}")
        locations.append(
            {
                "id": city["id"],
                "displayName": city["display_name"],
                "shortName": city["short_name"],
                "placeGeoid": city["place_geoid"],
                "countyFips": geo["computation_county_fips"],
                "countyName": geo["computation_county_name"],
                "state": city["state_abbr"],
                "stateName": city["state_name"],
                "cbsaCode": geo["primary_cbsa_code"],
                "cbsaName": geo["primary_cbsa_title"],
                "lat": city["centroid_lat"],
                "lon": city["centroid_lon"],
                "mapX": 0,
                "mapY": 0,
                "monthlyRent1Br": selected_hud["monthly_fmr_1br"],
                "annualRent1Br": selected_hud["annual_fmr_1br"],
                "priceIndex": convert_price_index(price_record["rpp"]),
                "taxFlags": {
                    "inNyc": bool(tax_record["household_inputs"].get("in_nyc")),
                    "denverOccupationalPrivilegeTax": bool(
                        tax_record["person_inputs"].get(
                            "co_denver_employee_occupational_privilege_tax_months"
                        )
                    ),
                },
                "taxCoverageStatus": tax_record["coverage"],
                "taxNotes": tax_record["notes"],
                "resolutionNote": make_resolution_note(geo, house, tax_record),
                "confidence": make_confidence(geo, house, price_record, tax_record),
            }
        )

    dataset = {
        "modelVersion": MODEL_VERSION,
        "defaultSourceId": DEFAULT_SOURCE_ID,
        "defaultTargetId": DEFAULT_TARGET_ID,
        "defaultGrossIncome": DEFAULT_GROSS_INCOME,
        "taxYear": 2026,
        "fixedProfile": {
            "filingStatus": "single",
            "citizenship": "US citizen",
            "incomeType": "W-2 wages only",
            "adults": 1,
            "children": 0,
            "housing": "Lives alone in a 1BR rental apartment",
        },
        "dollarNormalization": {
            "seriesId": cpi["seriesId"],
            "base": cpi["base"],
            "target": cpi["target"],
            "baseIndex": cpi["baseIndex"],
            "targetIndex": cpi["targetIndex"],
            "factor": cpi["factor"],
        },
        "categoryPriceWeights": convert_weights(weights["weights"]),
        "basketBands": spending["bands"],
        "locations": locations,
        "sources": {
            "hudFmr": {
                "name": "HUD Fair Market Rents",
                "vintage": "FY2026 revised, effective May 21 2026",
                "url": "https://www.huduser.gov/portal/datasets/fmr/fmr2026/FY26_FMRs_revised.xlsx",
                "notes": "One-bedroom Fair Market Rent from HUD FY2026 revised workbook; multi-area cities use the dominant population-share HUD area and carry a review note.",
            },
            "beaRpp": {
                "name": "BEA Regional Price Parities",
                "vintage": "2024 release",
                "url": "https://apps.bea.gov/regional/zip/MARPP.zip",
                "notes": "Metro RPP line codes 1 all items, 2 goods, 3 housing, 4 utilities, 5 other services; all 343 city primary CBSAs mapped to MARPP metro rows.",
            },
            "blsCex": {
                "name": "BLS Consumer Expenditure Survey PUMD",
                "vintage": "2024 CSV Interview Survey, CPI-adjusted to May 2026 dollars",
                "url": "https://www.bls.gov/cex/pumd/data/csv/intrvw24.zip",
                "notes": "Single-person renter consumer units with wage/salary income and no self-employment income.",
            },
            "blsCpi": {
                "name": "BLS Consumer Price Index",
                "vintage": cpi["target"],
                "url": "https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0",
                "notes": "CPI-U all items, U.S. city average, not seasonally adjusted; used to inflate 2024 CEX dollars and income bands.",
            },
            "policyengine": {
                "name": "PolicyEngine US",
                "vintage": "policyengine-us 1.729.0",
                "url": "https://github.com/PolicyEngine/policyengine-us",
                "notes": "Tax year 2026 curves for single filer W-2 wages. Known unsupported municipal local taxes are flagged in city confidence notes.",
            },
            "census": {
                "name": "U.S. Census Bureau Geography",
                "vintage": "2025 subcounty population estimates, 2025 Gazetteer, and July 2023 CBSA delineations",
                "url": "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/cities/totals/sub-est2025.csv",
                "notes": "City universe is Census SUMLEV 162 records with 2025 population at least 100,000; county and CBSA mappings use official Census/OMB files.",
            },
        },
    }

    write_typescript_dataset(dataset)
    write_city_curves(cities, tax_curve_manifest)
    print(f"Wrote {len(locations)} locations and {len(tax_curve_manifest['curves'])} tax curve modules")


if __name__ == "__main__":
    main()
