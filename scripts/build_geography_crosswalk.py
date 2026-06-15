"""Build city-to-county and county-to-CBSA geography crosswalks.

Inputs:
- Canonical 343-city universe from scripts/build_city_universe.py
- Census SUB-EST2025 county place-part rows
- Census/OMB July 2023 CBSA delineation List 1
- Census 2025 county Gazetteer names
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import re
import urllib.request
import zipfile
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]

CITY_UNIVERSE = ROOT / "data/intermediate/city_universe/canonical_places_2025_pop_ge_100k.json"
POPULATION_RAW = ROOT / "data/raw/census/popest/2025/sub-est2025.csv"

CBSA_URL = (
    "https://www2.census.gov/programs-surveys/metro-micro/geographies/"
    "reference-files/2023/delineation-files/list1_2023.xlsx"
)
COUNTY_GAZETTEER_URL = (
    "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/"
    "2025_Gazetteer/2025_Gaz_counties_national.zip"
)

CBSA_RAW = ROOT / "data/raw/census/cbsa/2023/list1_2023.xlsx"
COUNTY_GAZETTEER_RAW = ROOT / "data/raw/census/gazetteer/2025/2025_Gaz_counties_national.zip"
CROSSWALK_OUT = ROOT / "data/intermediate/geography/place_county_cbsa_crosswalk.json"
REVIEW_OUT = ROOT / "data/review/geography/multi_county_cbsa_review.json"
MANIFEST_OUT = ROOT / "data/provenance/geography_crosswalk_manifest.json"


def download(url: str, path: Path, refresh: bool) -> None:
    if path.exists() and not refresh:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=180) as response:
        path.write_bytes(response.read())


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def xlsx_rows(path: Path) -> list[dict[str, str]]:
    namespaces = {"a": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    with zipfile.ZipFile(path) as archive:
        shared_strings: list[str] = []
        if "xl/sharedStrings.xml" in archive.namelist():
            root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            for item in root.findall("a:si", namespaces):
                shared_strings.append(
                    "".join(text.text or "" for text in item.findall(".//a:t", namespaces))
                )

        sheet = ET.fromstring(archive.read("xl/worksheets/sheet1.xml"))
        rows: list[dict[str, str]] = []
        for row in sheet.findall(".//a:sheetData/a:row", namespaces):
            values: dict[str, str] = {}
            for cell in row.findall("a:c", namespaces):
                ref = cell.attrib.get("r", "")
                match = re.match(r"[A-Z]+", ref)
                value_node = cell.find("a:v", namespaces)
                if not match or value_node is None:
                    continue
                value = value_node.text or ""
                if cell.attrib.get("t") == "s":
                    value = shared_strings[int(value)]
                values[match.group(0)] = value
            rows.append(values)
    return rows


def load_counties(path: Path) -> dict[str, dict]:
    with zipfile.ZipFile(path) as archive:
        [name] = archive.namelist()
        text = archive.read(name).decode("utf-8")
    out = {}
    for row in csv.DictReader(io.StringIO(text), delimiter="|"):
        out[row["GEOID"]] = {
            "county_fips": row["GEOID"],
            "county_name": row["NAME"],
            "county_centroid_lat": float(row["INTPTLAT"]),
            "county_centroid_lon": float(row["INTPTLONG"]),
        }
    return out


def load_cbsa(path: Path) -> dict[str, dict]:
    rows = xlsx_rows(path)
    header_row = next(row for row in rows if row.get("A") == "CBSA Code")
    columns = {column: name for column, name in header_row.items()}
    out = {}
    for row in rows:
        if not row.get("A") or row.get("A") == "CBSA Code":
            continue
        record = {columns[column]: value for column, value in row.items() if column in columns}
        state_fips = record.get("FIPS State Code")
        county_fips = record.get("FIPS County Code")
        if not state_fips or not county_fips:
            continue
        county_geoid = state_fips.zfill(2) + county_fips.zfill(3)
        out[county_geoid] = {
            "cbsa_code": record.get("CBSA Code", ""),
            "cbsa_title": record.get("CBSA Title", ""),
            "cbsa_type": record.get("Metropolitan/Micropolitan Statistical Area", ""),
            "metropolitan_division_code": record.get("Metropolitan Division Code", ""),
            "metropolitan_division_title": record.get("Metropolitan Division Title", ""),
            "csa_code": record.get("CSA Code", ""),
            "csa_title": record.get("CSA Title", ""),
            "central_or_outlying": record.get("Central/Outlying County", ""),
        }
    return out


def load_county_parts(path: Path, place_geoids: set[str]) -> dict[str, list[dict]]:
    out: dict[str, list[dict]] = defaultdict(list)
    with path.open("r", encoding="latin1", newline="") as file:
        for row_number, row in enumerate(csv.DictReader(file), start=2):
            if row["SUMLEV"] != "157":
                continue
            place_geoid = row["STATE"] + row["PLACE"]
            if place_geoid not in place_geoids:
                continue
            county_fips = row["STATE"] + row["COUNTY"]
            out[place_geoid].append(
                {
                    "county_fips": county_fips,
                    "county_part_population_2025": int(row["POPESTIMATE2025"]),
                    "county_part_estimate_base_2020": int(row["ESTIMATESBASE2020"]),
                    "primary_geography_flag": row["PRIMGEO_FLAG"],
                    "source_row": row_number,
                }
            )
    return out


def build_crosswalk(cities: list[dict], county_parts: dict[str, list[dict]], counties: dict[str, dict], cbsa: dict[str, dict]) -> list[dict]:
    records = []
    for city in cities:
        parts = county_parts.get(city["place_geoid"], [])
        if not parts:
            raise ValueError(f"Missing county parts for {city['display_name']} ({city['place_geoid']})")

        enriched_parts = []
        for part in sorted(parts, key=lambda item: (-item["county_part_population_2025"], item["county_fips"])):
            county = counties.get(part["county_fips"])
            if county is None:
                raise ValueError(f"Missing county Gazetteer row for {part['county_fips']}")
            cbsa_record = cbsa.get(part["county_fips"], {})
            population_share = part["county_part_population_2025"] / city["population_2025"]
            enriched_parts.append(
                {
                    **part,
                    "county_name": county["county_name"],
                    "county_part_population_share_2025": round(population_share, 8),
                    "cbsa_code": cbsa_record.get("cbsa_code", ""),
                    "cbsa_title": cbsa_record.get("cbsa_title", ""),
                    "cbsa_type": cbsa_record.get("cbsa_type", ""),
                    "metropolitan_division_code": cbsa_record.get("metropolitan_division_code", ""),
                    "metropolitan_division_title": cbsa_record.get("metropolitan_division_title", ""),
                    "csa_code": cbsa_record.get("csa_code", ""),
                    "csa_title": cbsa_record.get("csa_title", ""),
                    "central_or_outlying": cbsa_record.get("central_or_outlying", ""),
                }
            )

        cbsa_groups: dict[str, dict] = {}
        for part in enriched_parts:
            code = part["cbsa_code"] or "NON_CBSA"
            group = cbsa_groups.setdefault(
                code,
                {
                    "cbsa_code": part["cbsa_code"],
                    "cbsa_title": part["cbsa_title"],
                    "cbsa_type": part["cbsa_type"],
                    "population_2025": 0,
                    "county_count": 0,
                },
            )
            group["population_2025"] += part["county_part_population_2025"]
            group["county_count"] += 1

        cbsa_parts = sorted(
            (
                {
                    **group,
                    "population_share_2025": round(group["population_2025"] / city["population_2025"], 8),
                }
                for group in cbsa_groups.values()
            ),
            key=lambda item: (-item["population_2025"], item["cbsa_code"] or "ZZZZZ"),
        )

        computation_county = enriched_parts[0]
        primary_cbsa = cbsa_parts[0]
        positive_parts = [part for part in enriched_parts if part["county_part_population_2025"] > 0]
        positive_cbsa_codes = {
            part["cbsa_code"] or "NON_CBSA"
            for part in positive_parts
        }
        records.append(
            {
                "id": city["id"],
                "place_geoid": city["place_geoid"],
                "display_name": city["display_name"],
                "computation_county_fips": computation_county["county_fips"],
                "computation_county_name": computation_county["county_name"],
                "computation_county_population_share_2025": computation_county[
                    "county_part_population_share_2025"
                ],
                "primary_cbsa_code": primary_cbsa["cbsa_code"],
                "primary_cbsa_title": primary_cbsa["cbsa_title"],
                "primary_cbsa_type": primary_cbsa["cbsa_type"],
                "primary_cbsa_population_share_2025": primary_cbsa["population_share_2025"],
                "county_parts": enriched_parts,
                "cbsa_parts": cbsa_parts,
                "flags": {
                    "multi_county": len(enriched_parts) > 1,
                    "positive_multi_county": len(positive_parts) > 1,
                    "multi_cbsa": len(positive_cbsa_codes) > 1,
                    "has_non_cbsa_county_part": any(not part["cbsa_code"] for part in enriched_parts),
                    "has_zero_population_county_part": any(
                        part["county_part_population_2025"] == 0 for part in enriched_parts
                    ),
                },
            }
        )
    return records


def write_outputs(records: list[dict]) -> None:
    CROSSWALK_OUT.parent.mkdir(parents=True, exist_ok=True)
    CROSSWALK_OUT.write_text(json.dumps(records, indent=2) + "\n", encoding="utf-8")

    review_records = [
        record
        for record in records
        if record["flags"]["multi_county"] or record["flags"]["multi_cbsa"]
    ]
    REVIEW_OUT.parent.mkdir(parents=True, exist_ok=True)
    REVIEW_OUT.write_text(json.dumps(review_records, indent=2) + "\n", encoding="utf-8")

    manifest = {
        "schema_version": "1.0",
        "artifact": str(CROSSWALK_OUT.relative_to(ROOT)),
        "review_artifact": str(REVIEW_OUT.relative_to(ROOT)),
        "status": "generated",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "sources": {
            "city_universe": {
                "local_path": str(CITY_UNIVERSE.relative_to(ROOT)),
                "sha256": sha256(CITY_UNIVERSE),
            },
            "subcounty_population": {
                "name": "Subcounty Resident Population Estimates: April 1, 2020 to July 1, 2025 (SUB-EST2025)",
                "url": "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/cities/totals/sub-est2025.csv",
                "local_path": str(POPULATION_RAW.relative_to(ROOT)),
                "sha256": sha256(POPULATION_RAW),
            },
            "cbsa_delineation": {
                "name": "List 1. Core Based Statistical Areas, Metropolitan Divisions, and Combined Statistical Areas, July 2023",
                "url": CBSA_URL,
                "local_path": str(CBSA_RAW.relative_to(ROOT)),
                "sha256": sha256(CBSA_RAW),
            },
            "county_gazetteer": {
                "name": "2025 Census National Counties Gazetteer File",
                "url": COUNTY_GAZETTEER_URL,
                "local_path": str(COUNTY_GAZETTEER_RAW.relative_to(ROOT)),
                "sha256": sha256(COUNTY_GAZETTEER_RAW),
            },
        },
        "qa": {
            "city_count": len(records),
            "multi_county_count": sum(record["flags"]["multi_county"] for record in records),
            "positive_multi_county_count": sum(
                record["flags"]["positive_multi_county"] for record in records
            ),
            "multi_cbsa_count": sum(record["flags"]["multi_cbsa"] for record in records),
            "non_cbsa_count": sum(record["flags"]["has_non_cbsa_county_part"] for record in records),
            "review_record_count": len(review_records),
        },
    }
    MANIFEST_OUT.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_OUT.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--refresh", action="store_true", help="Re-download official source files")
    args = parser.parse_args()

    if not CITY_UNIVERSE.exists() or not POPULATION_RAW.exists():
        raise SystemExit("Run `npm run build:city-universe` before building geography crosswalks.")

    download(CBSA_URL, CBSA_RAW, args.refresh)
    download(COUNTY_GAZETTEER_URL, COUNTY_GAZETTEER_RAW, args.refresh)

    cities = json.loads(CITY_UNIVERSE.read_text(encoding="utf-8"))
    place_geoids = {city["place_geoid"] for city in cities}
    records = build_crosswalk(
        cities,
        load_county_parts(POPULATION_RAW, place_geoids),
        load_counties(COUNTY_GAZETTEER_RAW),
        load_cbsa(CBSA_RAW),
    )
    write_outputs(records)
    print(f"Wrote {len(records)} geography records to {CROSSWALK_OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

