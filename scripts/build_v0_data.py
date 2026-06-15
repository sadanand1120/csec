"""Build the six-city v0 data artifact.

Run with:
    uvx --python 3.10 --with policyengine-us==1.729.0 python scripts/build_v0_data.py
"""

from __future__ import annotations

import csv
import io
import json
import math
import os
import re
import shutil
import tempfile
import urllib.request
import zipfile
from pathlib import Path
from typing import Callable

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/lib/v0Data.ts"
CITY_OUT_DIR = ROOT / "src/lib/cities"
CITY_LOADER_OUT = ROOT / "src/lib/cityTaxCurves.ts"
TAX_YEAR = "2026"
MODEL_VERSION = "v0_1_six_city_real_sources"

BEA_MARPP_URL = "https://apps.bea.gov/regional/zip/MARPP.zip"
BLS_PUMD_URL = "https://www.bls.gov/cex/pumd/data/csv/intrvw24.zip"
BLS_CPI_URL = (
    "https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0"
    "?startyear=2024&endyear=2026"
)
POLICYENGINE_US_VERSION = "1.729.0"

LINE_CODES = {
    "all": 1,
    "goods": 2,
    "housing": 3,
    "utilities": 4,
    "servicesOther": 5,
}

LOCATIONS = [
    {
        "id": "PLACE:4805000",
        "displayName": "Austin, TX",
        "shortName": "Austin",
        "placeGeoid": "4805000",
        "countyFips": "48453",
        "countyName": "Travis County",
        "state": "TX",
        "stateName": "Texas",
        "cbsaCode": "12420",
        "cbsaName": "Austin-Round Rock-San Marcos, TX",
        "lat": 30.2672,
        "lon": -97.7431,
        "mapX": 47,
        "mapY": 72,
        "monthlyRent1Br": 1562,
        "taxFlags": {},
        "resolutionNote": "Austin spans multiple counties; v0 uses Travis County as the computation county.",
    },
    {
        "id": "PLACE:0677000",
        "displayName": "Sunnyvale, CA",
        "shortName": "Sunnyvale",
        "placeGeoid": "0677000",
        "countyFips": "06085",
        "countyName": "Santa Clara County",
        "state": "CA",
        "stateName": "California",
        "cbsaCode": "41940",
        "cbsaName": "San Jose-Sunnyvale-Santa Clara, CA",
        "lat": 37.3688,
        "lon": -122.0363,
        "mapX": 13,
        "mapY": 56,
        "monthlyRent1Br": 2982,
        "taxFlags": {},
        "resolutionNote": "Sunnyvale is wholly resolved to Santa Clara County for v0.",
    },
    {
        "id": "PLACE:3651000",
        "displayName": "New York, NY",
        "shortName": "New York",
        "placeGeoid": "3651000",
        "countyFips": "36061",
        "countyName": "New York County",
        "state": "NY",
        "stateName": "New York",
        "cbsaCode": "35620",
        "cbsaName": "New York-Newark-Jersey City, NY-NJ",
        "lat": 40.7128,
        "lon": -74.006,
        "mapX": 88,
        "mapY": 38,
        "monthlyRent1Br": 2655,
        "taxFlags": {"inNyc": True},
        "resolutionNote": "New York City spans five counties; v0 uses New York County and enables NYC resident tax.",
    },
    {
        "id": "PLACE:5363000",
        "displayName": "Seattle, WA",
        "shortName": "Seattle",
        "placeGeoid": "5363000",
        "countyFips": "53033",
        "countyName": "King County",
        "state": "WA",
        "stateName": "Washington",
        "cbsaCode": "42660",
        "cbsaName": "Seattle-Tacoma-Bellevue, WA",
        "lat": 47.6062,
        "lon": -122.3321,
        "mapX": 16,
        "mapY": 24,
        "monthlyRent1Br": 2146,
        "taxFlags": {},
        "resolutionNote": "Seattle is resolved to King County for v0.",
    },
    {
        "id": "PLACE:0820000",
        "displayName": "Denver, CO",
        "shortName": "Denver",
        "placeGeoid": "0820000",
        "countyFips": "08031",
        "countyName": "Denver County",
        "state": "CO",
        "stateName": "Colorado",
        "cbsaCode": "19740",
        "cbsaName": "Denver-Aurora-Centennial, CO",
        "lat": 39.7392,
        "lon": -104.9903,
        "mapX": 41,
        "mapY": 49,
        "monthlyRent1Br": 1754,
        "taxFlags": {"denverOccupationalPrivilegeTax": True},
        "resolutionNote": "Denver is resolved to Denver County and includes Denver employee occupational privilege tax.",
    },
    {
        "id": "PLACE:3755000",
        "displayName": "Raleigh, NC",
        "shortName": "Raleigh",
        "placeGeoid": "3755000",
        "countyFips": "37183",
        "countyName": "Wake County",
        "state": "NC",
        "stateName": "North Carolina",
        "cbsaCode": "39580",
        "cbsaName": "Raleigh-Cary, NC",
        "lat": 35.7796,
        "lon": -78.6382,
        "mapX": 76,
        "mapY": 59,
        "monthlyRent1Br": 1596,
        "taxFlags": {},
        "resolutionNote": "Raleigh spans Wake and Durham counties; v0 uses Wake County as the computation county.",
    },
]

INCOME_BANDS = [
    {"id": "single_under_50k", "label": "Single-person CEX, income under $50k", "min": 0, "max": 50_000},
    {"id": "single_50k_100k", "label": "Single-person CEX, income $50k-$100k", "min": 50_000, "max": 100_000},
    {"id": "single_100k_155925", "label": "Single-person CEX, income $100k-$155,925", "min": 100_000, "max": 155_925},
    {"id": "single_155925_plus", "label": "Single-person CEX, income $155,925+", "min": 155_925, "max": None},
]

CEX_CATEGORY_VARIABLES = {
    "food": ["FDHOME", "FDAWAY"],
    "transportation": ["TRANS"],
    "healthcare": ["HEALTH"],
    "internet_mobile": ["TELEPH"],
    "other_nonhousing": [
        "ALCBEV",
        "APPAR",
        "HOUSEQ",
        "HOUSOP",
        "ENTERT",
        "PERSCA",
        "READ",
        "EDUCA",
        "TOBACC",
        "MISCP",
    ],
}

CEX_FILES = [
    ("intrvw24/fmli241x.csv", ("CQ",)),
    ("intrvw24/fmli242.csv", ("PQ", "CQ")),
    ("intrvw24/fmli243.csv", ("PQ", "CQ")),
    ("intrvw24/fmli244.csv", ("PQ", "CQ")),
    ("intrvw24/fmli251.csv", ("PQ",)),
]


def download(url: str, *, bls: bool = False) -> bytes:
    headers = {"User-Agent": "Mozilla/5.0"}
    if bls:
        headers.update(
            {
                "Accept": "application/zip,*/*",
                "Referer": "https://www.bls.gov/cex/pumd_data.htm",
            }
        )
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=180) as response:
        return response.read()


def as_float(value: str | None) -> float:
    if value in (None, ""):
        return 0.0
    try:
        return float(value)
    except ValueError:
        return 0.0


def fetch_bea_rpp() -> dict[str, dict[str, float]]:
    data = download(BEA_MARPP_URL)
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        with archive.open("MARPP_MSA_2008_2024.csv") as raw:
            rows = csv.DictReader(io.TextIOWrapper(raw, encoding="utf-8-sig"))
            wanted = {location["cbsaCode"] for location in LOCATIONS}
            out: dict[str, dict[str, float]] = {code: {} for code in wanted}
            for row in rows:
                cbsa = row["GeoFIPS"].strip().strip('"')
                if cbsa not in wanted:
                    continue
                line_code = int(row["LineCode"])
                for key, code in LINE_CODES.items():
                    if line_code == code:
                        out[cbsa][key] = float(row["2024"])
            return out


def read_cex_rows() -> dict[str, list[dict[str, str]]]:
    data = download(BLS_PUMD_URL, bls=True)
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        out = {}
        for filename, _suffixes in CEX_FILES:
            with archive.open(filename) as raw:
                out[filename] = list(
                    csv.DictReader(io.TextIOWrapper(raw, encoding="utf-8-sig", newline=""))
                )
        return out


def estimate_cex_category(
    rows_by_file: dict[str, list[dict[str, str]]],
    variables: list[str],
    predicate: Callable[[dict[str, str]], bool],
) -> tuple[float, int]:
    annual_mean = 0.0
    observations = 0
    for filename, suffixes in CEX_FILES:
        rows = rows_by_file[filename]
        for suffix in suffixes:
            weighted_sum = 0.0
            weight_sum = 0.0
            for row in rows:
                if not predicate(row):
                    continue
                weight = as_float(row.get("FINLWT21"))
                value = sum(as_float(row.get(variable + suffix)) for variable in variables)
                weighted_sum += weight * value
                weight_sum += weight
                observations += 1
            annual_mean += weighted_sum / weight_sum if weight_sum else 0.0
    return annual_mean, observations


def fetch_cpi_normalization() -> dict:
    data = json.loads(download(BLS_CPI_URL).decode("utf-8"))
    series = data["Results"]["series"][0]["data"]
    values_2024 = [
        float(row["value"])
        for row in series
        if row["year"] == "2024" and row["period"].startswith("M") and row["value"] != "-"
    ]
    latest = next(
        row
        for row in series
        if row["year"] == "2026" and row["period"].startswith("M") and row["value"] != "-"
    )
    base_index = sum(values_2024) / len(values_2024)
    target_index = float(latest["value"])
    return {
        "seriesId": "CUUR0000SA0",
        "base": "2024 annual average",
        "target": f'{latest["periodName"]} {latest["year"]}',
        "baseIndex": round(base_index, 3),
        "targetIndex": target_index,
        "factor": target_index / base_index,
    }


def build_cex_bands(inflation_factor: float) -> list[dict]:
    rows = read_cex_rows()
    bands = []
    for band in INCOME_BANDS:
        def predicate(row: dict[str, str], band=band) -> bool:
            income = as_float(row.get("FSALARYX"))
            if as_float(row.get("FAM_SIZE")) != 1:
                return False
            if row.get("CUTENURE") != "4":
                return False
            if income <= 0:
                return False
            if as_float(row.get("FNONFRMX")) != 0 or as_float(row.get("FFRMINCX")) != 0:
                return False
            if income < band["min"]:
                return False
            return band["max"] is None or income < band["max"]

        categories = {}
        obs = 0
        for category, variables in CEX_CATEGORY_VARIABLES.items():
            value, category_obs = estimate_cex_category(rows, variables, predicate)
            categories[category] = round(value * inflation_factor, 2)
            obs = max(obs, category_obs)

        bands.append(
            {
                "id": band["id"],
                "label": f'{band["label"]}, CPI-adjusted to 2026 dollars',
                "minGrossIncome": round(band["min"] * inflation_factor),
                "maxGrossIncome": None
                if band["max"] is None
                else round(band["max"] * inflation_factor),
                "sourceYearMinGrossIncome": band["min"],
                "sourceYearMaxGrossIncome": band["max"],
                "nationalAnnual": categories,
                "unweightedQuarterRecords": obs,
            }
        )
    return bands


def gross_grid() -> list[int]:
    return (
        list(range(0, 500_001, 1_000))
        + list(range(505_000, 1_000_001, 5_000))
        + list(range(1_020_000, 10_000_001, 20_000))
    )


def make_policyengine_situation(location: dict, gross_values: list[int]) -> dict:
    people = {}
    households = {}
    tax_units = {}
    spm_units = {}
    families = {}
    marital_units = {}

    for index, gross in enumerate(gross_values):
        person = f"person_{index}"
        entity = {
            "age": {TAX_YEAR: 30},
            "employment_income": {TAX_YEAR: gross},
            "is_tax_unit_head": {TAX_YEAR: True},
        }
        if location["taxFlags"].get("denverOccupationalPrivilegeTax"):
            entity["co_denver_employee_occupational_privilege_tax_months"] = {TAX_YEAR: 12}

        household = {
            "members": [person],
            "state_code": {TAX_YEAR: location["state"]},
            "county_fips": {TAX_YEAR: location["countyFips"]},
        }
        if location["taxFlags"].get("inNyc"):
            household["in_nyc"] = {TAX_YEAR: True}

        people[person] = entity
        households[f"household_{index}"] = household
        tax_units[f"tax_unit_{index}"] = {
            "members": [person],
            "filing_status": {TAX_YEAR: "SINGLE"},
        }
        spm_units[f"spm_unit_{index}"] = {"members": [person]}
        families[f"family_{index}"] = {"members": [person]}
        marital_units[f"marital_unit_{index}"] = {"members": [person]}

    return {
        "people": people,
        "households": households,
        "tax_units": tax_units,
        "spm_units": spm_units,
        "families": families,
        "marital_units": marital_units,
    }


def arr(values) -> list[float]:
    return [round(float(value), 2) for value in values]


def build_tax_curve(location: dict, gross_values: list[int]) -> dict:
    from policyengine_us import Simulation

    sim = Simulation(situation=make_policyengine_situation(location, gross_values))
    household_tax = sim.calculate("household_tax", TAX_YEAR)
    federal_income_tax = sim.calculate("income_tax", TAX_YEAR)
    state_income_tax = sim.calculate("state_income_tax", TAX_YEAR)
    local_income_tax = sim.calculate("local_income_tax", TAX_YEAR)
    employee_social_security_tax = sim.calculate("employee_social_security_tax", TAX_YEAR)
    employee_medicare_tax = sim.calculate("employee_medicare_tax", TAX_YEAR)
    additional_medicare_tax = sim.calculate("additional_medicare_tax", TAX_YEAR)
    employee_state_payroll_tax = sim.calculate("employee_state_payroll_tax", TAX_YEAR)
    local_occupational_tax = sim.calculate("local_occupational_tax", TAX_YEAR)
    payroll = employee_social_security_tax + employee_medicare_tax + additional_medicare_tax
    state_payroll_items = employee_state_payroll_tax + local_occupational_tax
    residual = (
        household_tax
        - federal_income_tax
        - state_income_tax
        - local_income_tax
        - payroll
        - state_payroll_items
    )
    net = [gross - float(tax) for gross, tax in zip(gross_values, household_tax)]
    return {
        "grossIncome": gross_values,
        "netIncome": arr(net),
        "totalTax": arr(household_tax),
        "federalIncomeTax": arr(federal_income_tax),
        "stateIncomeTax": arr(state_income_tax),
        "localIncomeTax": arr(local_income_tax),
        "payrollTaxEmployee": arr(payroll),
        "statePayrollItems": arr(state_payroll_items),
        "taxComponentResidual": arr(residual),
    }


def city_module_name(location: dict) -> str:
    parts = re.sub(r"[^A-Za-z0-9]+", " ", f'{location["shortName"]} {location["state"]}').split()
    if not parts:
        raise ValueError(f'Cannot build city module name for {location["displayName"]}')
    return parts[0].lower() + "".join(part[:1].upper() + part[1:].lower() for part in parts[1:])


def write_typescript(dataset: dict) -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(dataset, indent=2, sort_keys=True)
    OUT.write_text(
        "import type { V0Dataset } from \"./types\";\n\n"
        f"export const V0_DATA = {serialized} as const satisfies V0Dataset;\n",
        encoding="utf-8",
    )


def write_city_tax_curves(locations: list[dict], tax_curves: dict[str, dict]) -> None:
    CITY_OUT_DIR.mkdir(parents=True, exist_ok=True)
    for existing in CITY_OUT_DIR.glob("*.ts"):
        existing.unlink()

    loader_entries = []
    for location in locations:
        module_name = city_module_name(location)
        curve = tax_curves[location["id"]]
        serialized = json.dumps(curve, indent=2, sort_keys=True)
        (CITY_OUT_DIR / f"{module_name}.ts").write_text(
            "import type { V0TaxCurve } from \"../types\";\n\n"
            f"export const CITY_ID = {json.dumps(location['id'])};\n\n"
            f"export const CITY_TAX_CURVE = {serialized} as const satisfies V0TaxCurve;\n",
            encoding="utf-8",
        )
        loader_entries.append((location["id"], module_name))

    loader_lines = "\n".join(
        f"  {json.dumps(location_id)}: () => import(\"./cities/{module_name}\"),"
        for location_id, module_name in loader_entries
    )
    CITY_LOADER_OUT.write_text(
        "import type { V0TaxCurve } from \"./types\";\n\n"
        "type CityTaxCurveModule = {\n"
        "  CITY_TAX_CURVE: V0TaxCurve;\n"
        "};\n\n"
        "const LOADERS: Record<string, () => Promise<CityTaxCurveModule>> = {\n"
        f"{loader_lines}\n"
        "};\n\n"
        "const CACHE = new Map<string, Promise<V0TaxCurve>>();\n\n"
        "export function loadTaxCurve(locationId: string): Promise<V0TaxCurve> {\n"
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
        "): Promise<Record<string, V0TaxCurve>> {\n"
        "  const entries = await Promise.all(\n"
        "    locationIds.map(async (locationId) => [locationId, await loadTaxCurve(locationId)] as const),\n"
        "  );\n"
        "  return Object.fromEntries(entries);\n"
        "}\n",
        encoding="utf-8",
    )


def main() -> None:
    original_cwd = Path.cwd()
    with tempfile.TemporaryDirectory(prefix="statescomparison_policyengine_") as tempdir:
        os.chdir(tempdir)
        try:
            cpi = fetch_cpi_normalization()
            rpp_by_cbsa = fetch_bea_rpp()
            cex_bands = build_cex_bands(cpi["factor"])
            grid = gross_grid()

            locations = []
            tax_curves = {}
            for location in LOCATIONS:
                enriched = dict(location)
                enriched["annualRent1Br"] = location["monthlyRent1Br"] * 12
                enriched["priceIndex"] = rpp_by_cbsa[location["cbsaCode"]]
                enriched["confidence"] = "high"
                locations.append(enriched)
                tax_curves[location["id"]] = build_tax_curve(location, grid)

            dataset = {
                "modelVersion": MODEL_VERSION,
                "defaultSourceId": "PLACE:4805000",
                "defaultTargetId": "PLACE:0677000",
                "defaultGrossIncome": 175_000,
                "taxYear": int(TAX_YEAR),
                "fixedProfile": {
                    "filingStatus": "single",
                    "citizenship": "US citizen",
                    "incomeType": "W-2 wages only",
                    "adults": 1,
                    "children": 0,
                    "housing": "Lives alone in a 1BR rental apartment",
                },
                "dollarNormalization": cpi,
                "categoryPriceWeights": {
                    "food": {"goods": 1.0},
                    "transportation": {"goods": 0.65, "servicesOther": 0.35},
                    "healthcare": {"servicesOther": 1.0},
                    "internet_mobile": {"servicesOther": 1.0},
                    "other_nonhousing": {"goods": 0.45, "servicesOther": 0.55},
                },
                "basketBands": cex_bands,
                "locations": locations,
                "sources": {
                    "hudFmr": {
                        "name": "HUD Fair Market Rents",
                        "vintage": "FY2026",
                        "url": "https://www.huduser.gov/portal/datasets/fmr/fmr2026/FY2026_FMR_Schedule.pdf",
                        "notes": "1BR monthly FMR values manually extracted from HUD FY2026 schedule rows for the six v0 FMR areas; FMR is a gross rent standard, not live market rent.",
                    },
                    "beaRpp": {
                        "name": "BEA Regional Price Parities",
                        "vintage": "2024 release",
                        "url": BEA_MARPP_URL,
                        "notes": "MARPP_MSA_2008_2024.csv, line codes 1 all, 2 goods, 3 housing, 4 utilities, 5 other services.",
                    },
                    "blsCex": {
                        "name": "BLS Consumer Expenditure Survey PUMD",
                        "vintage": "2024 CSV Interview Survey, CPI-adjusted to May 2026 dollars",
                        "url": BLS_PUMD_URL,
                        "notes": "Single-person renter consumer units with wage/salary income, no farm or non-farm business income, from FMLI summary expenditure variables; calendar-year combination follows BLS PUMD guide suffix selection.",
                    },
                    "blsCpi": {
                        "name": "BLS Consumer Price Index",
                        "vintage": cpi["target"],
                        "url": "https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0",
                        "notes": "CPI-U all items, U.S. city average, not seasonally adjusted; used to inflate 2024 CEX dollar amounts and income-band thresholds.",
                    },
                    "policyengine": {
                        "name": "PolicyEngine US",
                        "vintage": f"policyengine-us {POLICYENGINE_US_VERSION}",
                        "url": "https://github.com/PolicyEngine/policyengine-us",
                        "notes": "Tax curves use tax year 2026, single filing status, one adult, no dependents, W-2 employment income only.",
                    },
                    "census": {
                        "name": "U.S. Census geography identifiers",
                        "vintage": "2025 TIGERweb places/counties and 2023 CBSA delineations",
                        "url": "https://tigerweb.geo.census.gov/tigerwebmain/TIGERweb_main.html",
                        "notes": "v0 uses fixed city-to-county/CBSA mappings for six places.",
                    },
                },
            }
            write_typescript(dataset)
            write_city_tax_curves(locations, tax_curves)
        finally:
            os.chdir(original_cwd)
            shutil.rmtree(ROOT / "data", ignore_errors=True)


if __name__ == "__main__":
    main()
