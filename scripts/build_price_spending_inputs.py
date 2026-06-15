"""Build shared BEA/BLS/CPI price and spending inputs for the 343-city pipeline."""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import urllib.request
import zipfile
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

CROSSWALK_IN = ROOT / "data/intermediate/geography/place_county_cbsa_crosswalk.json"

PRICE_DIR = ROOT / "data/intermediate/prices"
SPENDING_DIR = ROOT / "data/intermediate/spending"
INFLATION_DIR = ROOT / "data/intermediate/inflation"
REVIEW_DIR = ROOT / "data/review/price_spending"
MANIFEST_OUT = ROOT / "data/provenance/price_spending_manifest.json"

BEA_MARPP_URL = "https://apps.bea.gov/regional/zip/MARPP.zip"
BEA_SARPP_URL = "https://apps.bea.gov/regional/zip/SARPP.zip"
BEA_PARPP_URL = "https://apps.bea.gov/regional/zip/PARPP.zip"
BLS_CEX_URL = "https://www.bls.gov/cex/pumd/data/csv/intrvw24.zip"
BLS_CPI_URL = (
    "https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0"
    "?startyear=2024&endyear=2026"
)

BEA_RPP_YEAR = "2024"
EXPECTED_CITY_COUNT = 343

BEA_LINE_CODES = {
    1: "all_items",
    2: "goods",
    3: "housing",
    4: "utilities",
    5: "other_services",
}

BEA_SOURCES = {
    "MARPP_MSA": {
        "url": BEA_MARPP_URL,
        "zip_artifact": "MARPP.zip",
        "csv_file": "MARPP_MSA_2008_2024.csv",
        "geography": "metropolitan statistical area",
    },
    "SARPP_STATE": {
        "url": BEA_SARPP_URL,
        "zip_artifact": "SARPP.zip",
        "csv_file": "SARPP_STATE_2008_2024.csv",
        "geography": "state",
    },
    "PARPP_PORT": {
        "url": BEA_PARPP_URL,
        "zip_artifact": "PARPP.zip",
        "csv_file": "PARPP_PORT_2008_2024.csv",
        "geography": "state metropolitan/nonmetropolitan portion",
    },
}

INCOME_BANDS = [
    {"id": "single_under_50k", "label": "Single-person CEX, income under $50k", "min": 0, "max": 50_000},
    {"id": "single_50k_100k", "label": "Single-person CEX, income $50k-$100k", "min": 50_000, "max": 100_000},
    {
        "id": "single_100k_155925",
        "label": "Single-person CEX, income $100k-$155,925",
        "min": 100_000,
        "max": 155_925,
    },
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
        "MISC",
    ],
}

CATEGORY_PRICE_WEIGHTS = {
    "food": {"goods": 1.0},
    "transportation": {"goods": 0.65, "other_services": 0.35},
    "healthcare": {"other_services": 1.0},
    "internet_mobile": {"other_services": 1.0},
    "other_nonhousing": {"goods": 0.45, "other_services": 0.55},
}

CEX_FILES = [
    ("intrvw24/fmli241x.csv", ("CQ",)),
    ("intrvw24/fmli242.csv", ("PQ", "CQ")),
    ("intrvw24/fmli243.csv", ("PQ", "CQ")),
    ("intrvw24/fmli244.csv", ("PQ", "CQ")),
    ("intrvw24/fmli251.csv", ("PQ",)),
]

CEX_FILTER_FIELDS = ("FAM_SIZE", "CUTENURE", "FSALARYX", "FSMPFRMX", "FINLWT21")

STATE_FIPS_TO_ABBR = {
    "01": "AL",
    "02": "AK",
    "04": "AZ",
    "05": "AR",
    "06": "CA",
    "08": "CO",
    "09": "CT",
    "10": "DE",
    "11": "DC",
    "12": "FL",
    "13": "GA",
    "15": "HI",
    "16": "ID",
    "17": "IL",
    "18": "IN",
    "19": "IA",
    "20": "KS",
    "21": "KY",
    "22": "LA",
    "23": "ME",
    "24": "MD",
    "25": "MA",
    "26": "MI",
    "27": "MN",
    "28": "MS",
    "29": "MO",
    "30": "MT",
    "31": "NE",
    "32": "NV",
    "33": "NH",
    "34": "NJ",
    "35": "NM",
    "36": "NY",
    "37": "NC",
    "38": "ND",
    "39": "OH",
    "40": "OK",
    "41": "OR",
    "42": "PA",
    "44": "RI",
    "45": "SC",
    "46": "SD",
    "47": "TN",
    "48": "TX",
    "49": "UT",
    "50": "VT",
    "51": "VA",
    "53": "WA",
    "54": "WV",
    "55": "WI",
    "56": "WY",
}


def download(url: str, *, bls_zip: bool = False) -> bytes:
    headers = {"User-Agent": "Mozilla/5.0"}
    if bls_zip:
        headers.update(
            {
                "Accept": "application/zip,*/*",
                "Referer": "https://www.bls.gov/cex/pumd_data.htm",
            }
        )
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=180) as response:
        return response.read()


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def as_float(value: str | None) -> float:
    if value in (None, ""):
        return 0.0
    try:
        return float(value)
    except ValueError:
        return 0.0


def clean(value: str | None) -> str:
    return (value or "").strip().strip('"').strip()


def write_json(path: Path, payload: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def load_crosswalk() -> list[dict]:
    if not CROSSWALK_IN.exists():
        raise SystemExit("Run `python3 scripts/build_geography_crosswalk.py` before this stage.")
    records = json.loads(CROSSWALK_IN.read_text(encoding="utf-8"))
    if len(records) != EXPECTED_CITY_COUNT:
        raise ValueError(f"Expected {EXPECTED_CITY_COUNT} city crosswalk records, got {len(records)}")
    return records


def source_record(name: str, url: str, data: bytes, **extra: object) -> dict:
    return {
        "name": name,
        "url": url,
        "sha256": sha256_bytes(data),
        "bytes": len(data),
        **extra,
    }


def parse_bea_rpp_zip(source_key: str, data: bytes) -> dict[str, dict]:
    source = BEA_SOURCES[source_key]
    records: dict[str, dict] = {}
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        csv_file = source["csv_file"]
        if csv_file not in archive.namelist():
            raise ValueError(f"{source['zip_artifact']} missing expected file {csv_file}")
        with archive.open(csv_file) as raw:
            rows = csv.DictReader(io.TextIOWrapper(raw, encoding="utf-8-sig", newline=""))
            if BEA_RPP_YEAR not in (rows.fieldnames or []):
                raise ValueError(f"{csv_file} missing BEA RPP year {BEA_RPP_YEAR}")
            required = {"GeoFIPS", "GeoName", "LineCode", "Description", BEA_RPP_YEAR}
            missing = sorted(required - set(rows.fieldnames or []))
            if missing:
                raise ValueError(f"{csv_file} missing required fields: {', '.join(missing)}")

            for row_number, row in enumerate(rows, start=2):
                if not row.get("LineCode"):
                    continue
                line_code = int(row["LineCode"])
                if line_code not in BEA_LINE_CODES:
                    continue
                geofips = clean(row["GeoFIPS"])
                value = as_float(row[BEA_RPP_YEAR])
                if not geofips or value <= 0:
                    continue
                record = records.setdefault(
                    geofips,
                    {
                        "geo_fips": geofips,
                        "geo_name": clean(row["GeoName"]),
                        "bea_table": clean(row.get("TableName")),
                        "source": source_key,
                        "source_csv": csv_file,
                        "year": int(BEA_RPP_YEAR),
                        "rpp": {},
                        "source_rows": {},
                    },
                )
                field = BEA_LINE_CODES[line_code]
                record["rpp"][field] = round(value, 3)
                record["source_rows"][field] = row_number

    incomplete = [
        f"{record['geo_fips']} {record['geo_name']}"
        for record in records.values()
        if set(record["rpp"]) != set(BEA_LINE_CODES.values())
    ]
    if incomplete:
        formatted = "; ".join(incomplete[:10])
        raise ValueError(f"{source['csv_file']} has incomplete line-code coverage: {formatted}")
    return records


def fallback_record(
    state_fips: str,
    has_primary_cbsa: bool,
    marpp_missing: bool,
    parpp: dict[str, dict],
    sarpp: dict[str, dict],
) -> tuple[dict | None, str | None]:
    metro_portion = f"{state_fips}998"
    nonmetro_portion = f"{state_fips}999"
    state_record = f"{state_fips}000"

    if has_primary_cbsa and metro_portion in parpp:
        reason = "primary_cbsa_missing_marpp_using_state_metropolitan_portion" if marpp_missing else "using_state_metropolitan_portion"
        return parpp[metro_portion], reason
    if not has_primary_cbsa and nonmetro_portion in parpp:
        return parpp[nonmetro_portion], "non_cbsa_city_using_state_nonmetropolitan_portion"
    if state_record in sarpp:
        return sarpp[state_record], "using_state_rpp"
    return None, None


def build_city_rpp_mapping(crosswalk: list[dict], bea_records: dict[str, dict[str, dict]]) -> tuple[list[dict], list[dict], list[dict]]:
    marpp = bea_records["MARPP_MSA"]
    parpp = bea_records["PARPP_PORT"]
    sarpp = bea_records["SARPP_STATE"]

    city_records = []
    missing_cbsa = []
    fallbacks = []

    for city in crosswalk:
        state_fips = city["place_geoid"][:2]
        primary_cbsa_code = city.get("primary_cbsa_code") or ""
        source_record_for_city = marpp.get(primary_cbsa_code)
        fallback_reason = None

        if source_record_for_city is None:
            source_record_for_city, fallback_reason = fallback_record(
                state_fips,
                bool(primary_cbsa_code),
                bool(primary_cbsa_code),
                parpp,
                sarpp,
            )

        if source_record_for_city is None:
            missing_cbsa.append(
                {
                    "id": city["id"],
                    "display_name": city["display_name"],
                    "place_geoid": city["place_geoid"],
                    "primary_cbsa_code": primary_cbsa_code,
                    "state_fips": state_fips,
                }
            )
            continue

        confidence = "high"
        if fallback_reason:
            confidence = "medium" if source_record_for_city["source"] == "PARPP_PORT" else "low"
        elif city["flags"]["multi_cbsa"]:
            confidence = "medium"

        record = {
            "id": city["id"],
            "place_geoid": city["place_geoid"],
            "display_name": city["display_name"],
            "state_fips": state_fips,
            "state_abbr": STATE_FIPS_TO_ABBR.get(state_fips, ""),
            "primary_cbsa_code": primary_cbsa_code,
            "primary_cbsa_title": city.get("primary_cbsa_title", ""),
            "primary_cbsa_type": city.get("primary_cbsa_type", ""),
            "primary_cbsa_population_share_2025": city.get("primary_cbsa_population_share_2025"),
            "rpp_source": source_record_for_city["source"],
            "rpp_geo_fips": source_record_for_city["geo_fips"],
            "rpp_geo_name": source_record_for_city["geo_name"],
            "rpp_year": source_record_for_city["year"],
            "rpp": source_record_for_city["rpp"],
            "source_rows": source_record_for_city["source_rows"],
            "fallback_reason": fallback_reason,
            "mapping_confidence": confidence,
            "crosswalk_flags": city["flags"],
        }
        city_records.append(record)
        if fallback_reason:
            fallbacks.append(record)

    if missing_cbsa:
        formatted = ", ".join(item["display_name"] for item in missing_cbsa[:20])
        raise ValueError(f"Missing BEA RPP mapping for {len(missing_cbsa)} cities: {formatted}")

    city_records.sort(key=lambda item: (item["display_name"], item["place_geoid"]))
    fallbacks.sort(key=lambda item: (item["display_name"], item["place_geoid"]))
    return city_records, fallbacks, missing_cbsa


def fetch_cpi_normalization(cpi_response: bytes) -> dict:
    data = json.loads(cpi_response.decode("utf-8"))
    if data.get("status") != "REQUEST_SUCCEEDED":
        raise ValueError(f"BLS CPI API request failed: {data.get('message')}")
    series = data["Results"]["series"][0]
    if series["seriesID"] != "CUUR0000SA0":
        raise ValueError(f"Unexpected CPI series ID: {series['seriesID']}")

    monthly_rows = [
        row
        for row in series["data"]
        if row["period"].startswith("M") and row["period"][1:].isdigit() and row["value"] != "-"
    ]
    values_2024 = [float(row["value"]) for row in monthly_rows if row["year"] == "2024"]
    if len(values_2024) != 12:
        raise ValueError(f"Expected 12 monthly CPI values for 2024, got {len(values_2024)}")

    rows_2026 = [row for row in monthly_rows if row["year"] == "2026"]
    if not rows_2026:
        raise ValueError("BLS CPI API returned no available 2026 CPI values for CUUR0000SA0")
    latest = max(rows_2026, key=lambda row: int(row["period"][1:]))
    base_index = sum(values_2024) / len(values_2024)
    target_index = float(latest["value"])

    return {
        "schema_version": "1.0",
        "seriesId": "CUUR0000SA0",
        "seriesName": "CPI-U all items, U.S. city average, not seasonally adjusted",
        "base": "2024 annual average",
        "target": f'{latest["periodName"]} {latest["year"]}',
        "targetYear": int(latest["year"]),
        "targetPeriod": latest["period"],
        "baseIndex": round(base_index, 3),
        "targetIndex": target_index,
        "factor": target_index / base_index,
        "available2026Periods": [
            {
                "period": row["period"],
                "periodName": row["periodName"],
                "value": float(row["value"]),
            }
            for row in sorted(rows_2026, key=lambda row: int(row["period"][1:]))
        ],
        "source": {
            "url": BLS_CPI_URL,
            "responseSha256": sha256_bytes(cpi_response),
        },
    }


def required_cex_fields_for_file(suffixes: tuple[str, ...]) -> set[str]:
    fields = set(CEX_FILTER_FIELDS)
    for suffix in suffixes:
        for variables in CEX_CATEGORY_VARIABLES.values():
            fields.update(f"{variable}{suffix}" for variable in variables)
    return fields


def read_cex_rows(cex_zip: bytes) -> dict[str, list[dict[str, str]]]:
    rows_by_file: dict[str, list[dict[str, str]]] = {}
    with zipfile.ZipFile(io.BytesIO(cex_zip)) as archive:
        names = set(archive.namelist())
        for filename, suffixes in CEX_FILES:
            if filename not in names:
                raise ValueError(f"BLS CEX zip missing expected file {filename}")
            with archive.open(filename) as raw:
                reader = csv.DictReader(io.TextIOWrapper(raw, encoding="utf-8-sig", newline=""))
                fieldnames = set(reader.fieldnames or [])
                missing = sorted(required_cex_fields_for_file(suffixes) - fieldnames)
                if missing:
                    raise ValueError(f"{filename} missing required CEX fields: {', '.join(missing)}")
                rows_by_file[filename] = list(reader)
    return rows_by_file


def cex_profile_match(row: dict[str, str]) -> bool:
    return (
        as_float(row["FAM_SIZE"]) == 1
        and row["CUTENURE"].strip() == "4"
        and as_float(row["FSALARYX"]) > 0
        and as_float(row["FSMPFRMX"]) == 0
    )


def cex_band_match(row: dict[str, str], band: dict) -> bool:
    income = as_float(row["FSALARYX"])
    return income >= band["min"] and (band["max"] is None or income < band["max"])


def estimate_cex_category(
    rows_by_file: dict[str, list[dict[str, str]]],
    band: dict,
    variables: list[str],
) -> tuple[float, dict]:
    annual_mean = 0.0
    observations = 0
    weight_total = 0.0
    suffix_stats = []

    for filename, suffixes in CEX_FILES:
        rows = rows_by_file[filename]
        for suffix in suffixes:
            weighted_sum = 0.0
            suffix_weight_total = 0.0
            suffix_observations = 0
            for row in rows:
                if not cex_profile_match(row) or not cex_band_match(row, band):
                    continue
                weight = as_float(row["FINLWT21"])
                value = sum(as_float(row[f"{variable}{suffix}"]) for variable in variables)
                weighted_sum += weight * value
                suffix_weight_total += weight
                suffix_observations += 1

            suffix_mean = weighted_sum / suffix_weight_total if suffix_weight_total else 0.0
            annual_mean += suffix_mean
            observations += suffix_observations
            weight_total += suffix_weight_total
            suffix_stats.append(
                {
                    "file": filename,
                    "suffix": suffix,
                    "unweightedRecords": suffix_observations,
                    "weightedRecords": round(suffix_weight_total, 2),
                    "sourceYearQuarterMean": round(suffix_mean, 2),
                }
            )

    return annual_mean, {
        "unweightedQuarterRecords": observations,
        "weightedQuarterRecords": round(weight_total, 2),
        "suffixStats": suffix_stats,
    }


def cex_band_counts(rows_by_file: dict[str, list[dict[str, str]]], band: dict) -> dict:
    unweighted_rows = 0
    weighted_rows = 0.0
    quarter_records = 0
    weighted_quarter_records = 0.0
    file_rows = {}

    for filename, suffixes in CEX_FILES:
        matching_rows = [
            row for row in rows_by_file[filename] if cex_profile_match(row) and cex_band_match(row, band)
        ]
        row_weight = sum(as_float(row["FINLWT21"]) for row in matching_rows)
        file_rows[filename] = {
            "consumerUnitRows": len(matching_rows),
            "weightedConsumerUnitRows": round(row_weight, 2),
            "calendarSuffixes": list(suffixes),
        }
        unweighted_rows += len(matching_rows)
        weighted_rows += row_weight
        quarter_records += len(matching_rows) * len(suffixes)
        weighted_quarter_records += row_weight * len(suffixes)

    return {
        "unweightedConsumerUnitRows": unweighted_rows,
        "weightedConsumerUnitRows": round(weighted_rows, 2),
        "unweightedQuarterRecords": quarter_records,
        "weightedQuarterRecords": round(weighted_quarter_records, 2),
        "fileRows": file_rows,
    }


def build_cex_bands(cex_zip: bytes, cpi: dict) -> tuple[dict, list[dict]]:
    rows_by_file = read_cex_rows(cex_zip)
    factor = cpi["factor"]
    bands = []
    qa_counts = []

    for band in INCOME_BANDS:
        source_year_categories = {}
        adjusted_categories = {}
        category_qa = {}
        for category, variables in CEX_CATEGORY_VARIABLES.items():
            source_year_value, stats = estimate_cex_category(rows_by_file, band, variables)
            source_year_categories[category] = round(source_year_value, 2)
            adjusted_categories[category] = round(source_year_value * factor, 2)
            category_qa[category] = stats

        counts = cex_band_counts(rows_by_file, band)
        bands.append(
            {
                "id": band["id"],
                "label": f'{band["label"]}, CPI-adjusted to {cpi["target"]} dollars',
                "minGrossIncome": round(band["min"] * factor),
                "maxGrossIncome": None if band["max"] is None else round(band["max"] * factor),
                "sourceYearMinGrossIncome": band["min"],
                "sourceYearMaxGrossIncome": band["max"],
                "nationalAnnual": adjusted_categories,
                "sourceYearNationalAnnual": source_year_categories,
                "unweightedQuarterRecords": counts["unweightedQuarterRecords"],
                "weightedQuarterRecords": counts["weightedQuarterRecords"],
                "filter": {
                    "FAM_SIZE": 1,
                    "CUTENURE": "4",
                    "FSALARYX": "> 0",
                    "FSMPFRMX": 0,
                },
                "qa": {
                    **counts,
                    "categoryStats": category_qa,
                },
            }
        )
        qa_counts.append(
            {
                "id": band["id"],
                "sourceYearMinGrossIncome": band["min"],
                "sourceYearMaxGrossIncome": band["max"],
                **counts,
            }
        )

    payload = {
        "schema_version": "1.0",
        "source_year": 2024,
        "cpi_target": cpi["target"],
        "cpi_factor": cpi["factor"],
        "cex_files": [
            {"file": filename, "calendar_suffixes": list(suffixes)}
            for filename, suffixes in CEX_FILES
        ],
        "category_variables": CEX_CATEGORY_VARIABLES,
        "bands": bands,
    }
    return payload, qa_counts


def qa_summary(
    crosswalk: list[dict],
    cbsa_records: list[dict],
    city_rpp: list[dict],
    fallbacks: list[dict],
    cex_counts: list[dict],
    cpi: dict,
) -> dict:
    source_counts = Counter(record["rpp_source"] for record in city_rpp)
    confidence_counts = Counter(record["mapping_confidence"] for record in city_rpp)
    return {
        "schema_version": "1.0",
        "city_count": len(crosswalk),
        "unique_primary_cbsa_count": len({record["primary_cbsa_code"] for record in crosswalk}),
        "bea_cbsa_records_written": len(cbsa_records),
        "city_rpp_records_written": len(city_rpp),
        "city_rpp_source_counts": dict(sorted(source_counts.items())),
        "city_rpp_confidence_counts": dict(sorted(confidence_counts.items())),
        "city_rpp_fallback_count": len(fallbacks),
        "multi_cbsa_city_count": sum(record["flags"]["multi_cbsa"] for record in crosswalk),
        "cpi_target": cpi["target"],
        "cpi_factor": cpi["factor"],
        "cex_band_counts": cex_counts,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.parse_args()

    crosswalk = load_crosswalk()

    bea_downloads = {
        key: download(source["url"])
        for key, source in BEA_SOURCES.items()
    }
    cex_zip = download(BLS_CEX_URL, bls_zip=True)
    cpi_response = download(BLS_CPI_URL)

    cpi = fetch_cpi_normalization(cpi_response)
    bea_records = {
        key: parse_bea_rpp_zip(key, data)
        for key, data in bea_downloads.items()
    }
    city_rpp, fallbacks, missing = build_city_rpp_mapping(crosswalk, bea_records)

    used_cbsa_codes = sorted({record["primary_cbsa_code"] for record in crosswalk})
    cbsa_records = [bea_records["MARPP_MSA"][code] for code in used_cbsa_codes if code in bea_records["MARPP_MSA"]]
    missing_marpp_cbsa = sorted(set(used_cbsa_codes) - set(bea_records["MARPP_MSA"]))

    cex_bands, cex_counts = build_cex_bands(cex_zip, cpi)

    rpp_by_cbsa = {
        "schema_version": "1.0",
        "bea_rpp_year": int(BEA_RPP_YEAR),
        "source": "MARPP_MSA",
        "line_codes": {str(code): field for code, field in BEA_LINE_CODES.items()},
        "records": sorted(cbsa_records, key=lambda item: item["geo_fips"]),
        "missing_primary_cbsa_codes": missing_marpp_cbsa,
    }
    city_rpp_payload = {
        "schema_version": "1.0",
        "bea_rpp_year": int(BEA_RPP_YEAR),
        "line_codes": {str(code): field for code, field in BEA_LINE_CODES.items()},
        "fallback_policy": [
            "Use MARPP metro RPP when primary_cbsa_code has a BEA metro row.",
            "If a primary CBSA is missing from MARPP, use the state's PARPP metropolitan portion.",
            "If no primary CBSA exists, use the state's PARPP nonmetropolitan portion.",
            "If PARPP is unavailable, use SARPP state RPP.",
        ],
        "records": city_rpp,
    }
    category_weights = {
        "schema_version": "1.0",
        "price_index_basis": "BEA Regional Price Parities line codes 2 and 5 for non-housing categories",
        "weights": CATEGORY_PRICE_WEIGHTS,
    }
    summary = qa_summary(crosswalk, cbsa_records, city_rpp, fallbacks, cex_counts, cpi)

    outputs = {
        "bea_rpp_by_cbsa": PRICE_DIR / "bea_rpp_by_cbsa.json",
        "city_cbsa_rpp_mapping": PRICE_DIR / "city_cbsa_rpp_mapping.json",
        "cex_single_renter_bands": SPENDING_DIR / "cex_single_renter_bands.json",
        "category_price_weights": SPENDING_DIR / "category_price_weights.json",
        "cpi_normalization": INFLATION_DIR / "cpi_normalization.json",
        "qa_summary": REVIEW_DIR / "qa_summary.json",
        "cex_band_counts": REVIEW_DIR / "cex_band_counts.json",
        "city_rpp_fallbacks": REVIEW_DIR / "city_rpp_fallbacks.json",
        "missing_rpp_mappings": REVIEW_DIR / "missing_rpp_mappings.json",
    }
    write_json(outputs["bea_rpp_by_cbsa"], rpp_by_cbsa)
    write_json(outputs["city_cbsa_rpp_mapping"], city_rpp_payload)
    write_json(outputs["cex_single_renter_bands"], cex_bands)
    write_json(outputs["category_price_weights"], category_weights)
    write_json(outputs["cpi_normalization"], cpi)
    write_json(outputs["qa_summary"], summary)
    write_json(outputs["cex_band_counts"], cex_counts)
    write_json(outputs["city_rpp_fallbacks"], fallbacks)
    write_json(outputs["missing_rpp_mappings"], missing)

    manifest = {
        "schema_version": "1.0",
        "artifact_group": "price_spending_inputs",
        "status": "generated",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "sources": {
            "geography_crosswalk": {
                "local_path": str(CROSSWALK_IN.relative_to(ROOT)),
                "sha256": sha256(CROSSWALK_IN),
            },
            "bea_marpp": source_record(
                "BEA Regional Price Parities, metro areas",
                BEA_MARPP_URL,
                bea_downloads["MARPP_MSA"],
                zip_artifact=BEA_SOURCES["MARPP_MSA"]["zip_artifact"],
                csv_file=BEA_SOURCES["MARPP_MSA"]["csv_file"],
            ),
            "bea_sarpp": source_record(
                "BEA Regional Price Parities, states",
                BEA_SARPP_URL,
                bea_downloads["SARPP_STATE"],
                zip_artifact=BEA_SOURCES["SARPP_STATE"]["zip_artifact"],
                csv_file=BEA_SOURCES["SARPP_STATE"]["csv_file"],
            ),
            "bea_parpp": source_record(
                "BEA Regional Price Parities, state portions",
                BEA_PARPP_URL,
                bea_downloads["PARPP_PORT"],
                zip_artifact=BEA_SOURCES["PARPP_PORT"]["zip_artifact"],
                csv_file=BEA_SOURCES["PARPP_PORT"]["csv_file"],
            ),
            "bls_cex": source_record(
                "BLS Consumer Expenditure Survey 2024 Interview Survey public-use microdata",
                BLS_CEX_URL,
                cex_zip,
                zip_artifact="intrvw24.zip",
                files=[filename for filename, _suffixes in CEX_FILES],
            ),
            "bls_cpi": source_record(
                "BLS CPI-U all items, U.S. city average, not seasonally adjusted",
                BLS_CPI_URL,
                cpi_response,
                series_id="CUUR0000SA0",
            ),
        },
        "artifacts": {
            key: {
                "local_path": str(path.relative_to(ROOT)),
                "sha256": sha256(path),
            }
            for key, path in outputs.items()
        },
        "input_contract": {
            "expected_city_count": EXPECTED_CITY_COUNT,
            "bea_rpp_year": int(BEA_RPP_YEAR),
            "bea_line_codes": {str(code): field for code, field in BEA_LINE_CODES.items()},
            "cex_filter": {
                "FAM_SIZE": 1,
                "CUTENURE": "4",
                "FSALARYX": "> 0",
                "FSMPFRMX": 0,
            },
            "income_bands_source_year": INCOME_BANDS,
        },
        "qa": summary,
    }
    write_json(MANIFEST_OUT, manifest)

    print(f"Wrote {len(city_rpp)} city RPP mappings to {outputs['city_cbsa_rpp_mapping'].relative_to(ROOT)}")
    print(f"Wrote {len(cex_bands['bands'])} CEX basket bands to {outputs['cex_single_renter_bands'].relative_to(ROOT)}")
    print(f"CPI normalization target: {cpi['target']} ({cpi['factor']:.6f}x)")


if __name__ == "__main__":
    main()
