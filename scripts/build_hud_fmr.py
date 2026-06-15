"""Build FY2026 HUD Fair Market Rent inputs for the 343-city pipeline.

Inputs:
- Official HUD FY2026 revised county/town FMR workbook
- City-to-county geography crosswalk from scripts/build_geography_crosswalk.py
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import urllib.request
import zipfile
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]

HUD_FMR_URL = "https://www.huduser.gov/portal/datasets/fmr/fmr2026/FY26_FMRs_revised.xlsx"
HUD_FMR_PAGE_URL = "https://www.huduser.gov/portal/datasets/fmr.html"
GEOGRAPHY_CROSSWALK = ROOT / "data/intermediate/geography/place_county_cbsa_crosswalk.json"

HUD_WORKBOOK = ROOT / "data/intermediate/housing/FY26_FMRs_revised.xlsx"
HUD_FMR_OUT = ROOT / "data/intermediate/housing/hud_fmr_1br.json"
PLACE_HUD_OUT = ROOT / "data/intermediate/housing/place_hud_area_crosswalk.json"
REVIEW_OUT = ROOT / "data/review/housing/hud_fmr_city_review.json"
MANIFEST_OUT = ROOT / "data/provenance/hud_fmr_manifest.json"

FISCAL_YEAR = 2026
EFFECTIVE_DATE = "2026-05-21"
NEW_ENGLAND_STATE_FIPS = {"09", "23", "25", "33", "44", "50"}
EXPECTED_COLUMNS = {
    "stusps",
    "state",
    "hud_area_code",
    "countyname",
    "county_town_name",
    "metro",
    "hud_area_name",
    "fips",
    "pop2023",
    "fmr_0",
    "fmr_1",
    "fmr_2",
    "fmr_3",
    "fmr_4",
}


def download(url: str, path: Path, refresh: bool) -> None:
    if path.exists() and not refresh:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
            ),
            "Accept": (
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,"
                "application/octet-stream,*/*"
            ),
            "Referer": HUD_FMR_PAGE_URL,
        },
    )
    tmp_path = path.with_suffix(path.suffix + ".download")
    try:
        with urllib.request.urlopen(request, timeout=180) as response:
            tmp_path.write_bytes(response.read())
        if not zipfile.is_zipfile(tmp_path):
            raise ValueError(f"Downloaded HUD file is not an XLSX workbook: {tmp_path}")
        tmp_path.replace(path)
    finally:
        if tmp_path.exists():
            tmp_path.unlink()


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def xlsx_rows(path: Path, worksheet: str = "xl/worksheets/sheet1.xml") -> list[dict[str, str]]:
    namespaces = {"a": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    with zipfile.ZipFile(path) as archive:
        shared_strings: list[str] = []
        if "xl/sharedStrings.xml" in archive.namelist():
            root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            for item in root.findall("a:si", namespaces):
                shared_strings.append(
                    "".join(text.text or "" for text in item.findall(".//a:t", namespaces))
                )

        sheet = ET.fromstring(archive.read(worksheet))
        rows: list[dict[str, str]] = []
        for row in sheet.findall(".//a:sheetData/a:row", namespaces):
            values: dict[str, str] = {}
            for cell in row.findall("a:c", namespaces):
                ref = cell.attrib.get("r", "")
                match = re.match(r"[A-Z]+", ref)
                if not match:
                    continue
                value_node = cell.find("a:v", namespaces)
                value = ""
                if value_node is not None:
                    value = value_node.text or ""
                    if cell.attrib.get("t") == "s":
                        value = shared_strings[int(value)]
                elif cell.attrib.get("t") == "inlineStr":
                    value = "".join(
                        text.text or "" for text in cell.findall(".//a:t", namespaces)
                    )
                values[match.group(0)] = value
            if values:
                rows.append(values)
    return rows


def clean_int(value: str, field_name: str) -> int:
    normalized = value.replace("$", "").replace(",", "").strip()
    if not normalized:
        raise ValueError(f"Missing required numeric field {field_name}")
    return int(float(normalized))


def load_hud_rows(path: Path) -> list[dict]:
    rows = xlsx_rows(path)
    if not rows:
        raise ValueError(f"No rows found in {path}")
    columns = {column: name.strip() for column, name in rows[0].items()}
    missing = EXPECTED_COLUMNS - set(columns.values())
    if missing:
        raise ValueError(f"HUD workbook missing expected columns: {sorted(missing)}")

    records = []
    for source_row, row in enumerate(rows[1:], start=2):
        record = {columns[column]: value.strip() for column, value in row.items() if column in columns}
        if not record.get("hud_area_code"):
            continue
        fips = record["fips"].zfill(10)
        fmr_1 = clean_int(record["fmr_1"], "fmr_1")
        records.append(
            {
                "source_row": source_row,
                "stusps": record["stusps"],
                "state_fips": record["state"].zfill(2),
                "hud_area_code": record["hud_area_code"],
                "county_name": record["countyname"],
                "county_town_name": record.get("county_town_name", ""),
                "metro": record["metro"] == "1",
                "hud_area_name": record["hud_area_name"],
                "fips": fips,
                "county_fips": fips[:5],
                "county_subdivision_fips": fips[5:],
                "population_2023": clean_int(record["pop2023"], "pop2023"),
                "fmr_1_monthly": fmr_1,
                "fmr_1_annual": fmr_1 * 12,
            }
        )
    return records


def build_hud_area_records(hud_rows: list[dict]) -> list[dict]:
    grouped: dict[str, list[dict]] = defaultdict(list)
    for row in hud_rows:
        grouped[row["hud_area_code"]].append(row)

    records = []
    for hud_area_code, rows in sorted(grouped.items()):
        names = {row["hud_area_name"] for row in rows}
        rents = {row["fmr_1_monthly"] for row in rows}
        if len(names) != 1 or len(rents) != 1:
            raise ValueError(f"Conflicting HUD area rows for {hud_area_code}")
        first = rows[0]
        records.append(
            {
                "hud_area_id": hud_area_code,
                "hud_area_name": first["hud_area_name"],
                "fiscal_year": FISCAL_YEAR,
                "effective_date": EFFECTIVE_DATE,
                "bedroom_size": 1,
                "monthly_fmr": first["fmr_1_monthly"],
                "annual_fmr": first["fmr_1_annual"],
                "metro": first["metro"],
                "source_row_count": len(rows),
                "source_rows": [row["source_row"] for row in rows],
                "source_fips": [row["fips"] for row in rows],
            }
        )
    return records


def normalized_town_name(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def city_town_name(city: dict) -> str:
    return f"{city['display_name'].split(',', 1)[0]} town"


def part_mapping_candidates(
    city: dict,
    county_part: dict,
    rows_by_county_fips: dict[str, list[dict]],
    rows_by_fips: dict[str, list[dict]],
    rows_by_county_town_name: dict[tuple[str, str], list[dict]],
) -> tuple[str, str, list[dict]]:
    county_fips = county_part["county_fips"]
    state_fips = county_fips[:2]
    if state_fips in NEW_ENGLAND_STATE_FIPS:
        lookup_key = county_fips + city["place_geoid"][2:]
        candidates = rows_by_fips.get(lookup_key, [])
        if candidates:
            return "new_england_place_fips", lookup_key, candidates
        town_name = normalized_town_name(city_town_name(city))
        candidates = rows_by_county_town_name.get((county_fips, town_name), [])
        return "new_england_town_name", f"{county_fips}:{town_name}", candidates
    return "county_fips", county_fips, rows_by_county_fips.get(county_fips, [])


def hud_area_summary(row: dict, population: int, share: float, source: dict) -> dict:
    return {
        "hud_area_id": row["hud_area_code"],
        "hud_area_name": row["hud_area_name"],
        "monthly_fmr_1br": row["fmr_1_monthly"],
        "annual_fmr_1br": row["fmr_1_annual"],
        "population_2025": population,
        "population_share_2025": round(share, 8),
        "source": source,
    }


def build_city_mappings(cities: list[dict], hud_rows: list[dict]) -> tuple[list[dict], list[dict]]:
    rows_by_county_fips: dict[str, list[dict]] = defaultdict(list)
    rows_by_fips: dict[str, list[dict]] = defaultdict(list)
    rows_by_county_town_name: dict[tuple[str, str], list[dict]] = defaultdict(list)
    for row in hud_rows:
        rows_by_county_fips[row["county_fips"]].append(row)
        rows_by_fips[row["fips"]].append(row)
        rows_by_county_town_name[
            (row["county_fips"], normalized_town_name(row["county_town_name"]))
        ].append(row)

    mappings = []
    review_records = []
    for city in cities:
        candidate_parts = [
            part for part in city["county_parts"] if part["county_part_population_2025"] > 0
        ] or city["county_parts"]

        county_part_mappings = []
        unresolved_parts = []
        ambiguous_parts = []
        area_populations: dict[str, dict] = {}
        for part in candidate_parts:
            method, lookup_key, candidates = part_mapping_candidates(
                city, part, rows_by_county_fips, rows_by_fips, rows_by_county_town_name
            )
            if not candidates:
                unresolved_parts.append(
                    {
                        "county_fips": part["county_fips"],
                        "county_name": part["county_name"],
                        "lookup_method": method,
                        "lookup_key": lookup_key,
                        "reason": (
                            "New England city requires county-subdivision FIPS; "
                            "place FIPS did not match a HUD row."
                            if method == "new_england_place_fips"
                            else "No HUD row found for county FIPS."
                        ),
                    }
                )
            if len(candidates) > 1:
                ambiguous_parts.append(
                    {
                        "county_fips": part["county_fips"],
                        "county_name": part["county_name"],
                        "lookup_method": method,
                        "lookup_key": lookup_key,
                        "candidate_count": len(candidates),
                        "candidate_hud_area_ids": sorted(
                            {candidate["hud_area_code"] for candidate in candidates}
                        ),
                    }
                )

            area_ids = sorted({candidate["hud_area_code"] for candidate in candidates})
            county_part_mappings.append(
                {
                    "county_fips": part["county_fips"],
                    "county_name": part["county_name"],
                    "county_part_population_2025": part["county_part_population_2025"],
                    "county_part_population_share_2025": part[
                        "county_part_population_share_2025"
                    ],
                    "lookup_method": method,
                    "lookup_key": lookup_key,
                    "hud_area_ids": area_ids,
                    "source_rows": sorted({candidate["source_row"] for candidate in candidates}),
                }
            )

            population = part["county_part_population_2025"]
            share = part["county_part_population_share_2025"]
            for candidate in candidates:
                area = area_populations.setdefault(
                    candidate["hud_area_code"],
                    {
                        "row": candidate,
                        "population_2025": 0,
                        "population_share_2025": 0.0,
                        "source_rows": set(),
                        "source_fips": set(),
                    },
                )
                area["population_2025"] += population
                area["population_share_2025"] += share
                area["source_rows"].add(candidate["source_row"])
                area["source_fips"].add(candidate["fips"])

        candidate_hud_areas = [
            hud_area_summary(
                area["row"],
                area["population_2025"],
                area["population_share_2025"],
                {
                    "source_rows": sorted(area["source_rows"]),
                    "source_fips": sorted(area["source_fips"]),
                },
            )
            for area in area_populations.values()
        ]
        candidate_hud_areas.sort(
            key=lambda item: (
                -item["population_2025"],
                item["hud_area_id"],
            )
        )

        status = "resolved"
        selected_hud_area = candidate_hud_areas[0] if candidate_hud_areas else None
        if unresolved_parts:
            status = "unresolved"
        elif ambiguous_parts:
            status = "ambiguous"
        elif len(candidate_hud_areas) > 1:
            status = "multi_hud"

        flags = {
            "review_required": status != "resolved",
            "unresolved": bool(unresolved_parts),
            "ambiguous": bool(ambiguous_parts),
            "multi_hud": len(candidate_hud_areas) > 1,
            "new_england": city["place_geoid"][:2] in NEW_ENGLAND_STATE_FIPS,
        }
        record = {
            "id": city["id"],
            "place_geoid": city["place_geoid"],
            "display_name": city["display_name"],
            "status": status,
            "selected_hud_area": selected_hud_area,
            "candidate_hud_areas": candidate_hud_areas,
            "county_part_mappings": county_part_mappings,
            "unresolved_parts": unresolved_parts,
            "ambiguous_parts": ambiguous_parts,
            "flags": flags,
        }
        mappings.append(record)
        if flags["review_required"]:
            review_records.append(record)
    return mappings, review_records


def write_outputs(hud_areas: list[dict], mappings: list[dict], review_records: list[dict]) -> None:
    HUD_FMR_OUT.parent.mkdir(parents=True, exist_ok=True)
    HUD_FMR_OUT.write_text(json.dumps(hud_areas, indent=2) + "\n", encoding="utf-8")

    PLACE_HUD_OUT.parent.mkdir(parents=True, exist_ok=True)
    PLACE_HUD_OUT.write_text(json.dumps(mappings, indent=2) + "\n", encoding="utf-8")

    REVIEW_OUT.parent.mkdir(parents=True, exist_ok=True)
    REVIEW_OUT.write_text(json.dumps(review_records, indent=2) + "\n", encoding="utf-8")

    qa = {
        "hud_locality_row_count": sum(area["source_row_count"] for area in hud_areas),
        "hud_area_count": len(hud_areas),
        "city_count": len(mappings),
        "resolved_city_count": sum(record["status"] == "resolved" for record in mappings),
        "multi_hud_city_count": sum(record["flags"]["multi_hud"] for record in mappings),
        "ambiguous_city_count": sum(record["flags"]["ambiguous"] for record in mappings),
        "unresolved_city_count": sum(record["flags"]["unresolved"] for record in mappings),
        "new_england_city_count": sum(record["flags"]["new_england"] for record in mappings),
        "new_england_unresolved_city_count": sum(
            record["flags"]["new_england"] and record["flags"]["unresolved"]
            for record in mappings
        ),
        "review_record_count": len(review_records),
        "annual_rent_check_failures": sum(
            area["annual_fmr"] != area["monthly_fmr"] * 12 for area in hud_areas
        ),
    }
    artifact_checksums = {
        "hud_fmr_1br": sha256(HUD_FMR_OUT),
        "place_hud_area_crosswalk": sha256(PLACE_HUD_OUT),
        "review": sha256(REVIEW_OUT),
    }
    manifest = {
        "schema_version": "1.0",
        "artifacts": {
            "hud_fmr_1br": str(HUD_FMR_OUT.relative_to(ROOT)),
            "place_hud_area_crosswalk": str(PLACE_HUD_OUT.relative_to(ROOT)),
            "review": str(REVIEW_OUT.relative_to(ROOT)),
        },
        "artifact_sha256": artifact_checksums,
        "status": "generated",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "sources": {
            "hud_fmr_revised_workbook": {
                "name": "FY2026 HUD revised county-level Fair Market Rents",
                "url": HUD_FMR_URL,
                "documentation_page_url": HUD_FMR_PAGE_URL,
                "local_path": str(HUD_WORKBOOK.relative_to(ROOT)),
                "sha256": sha256(HUD_WORKBOOK),
                "fiscal_year": FISCAL_YEAR,
                "effective_date": EFFECTIVE_DATE,
            },
            "place_county_cbsa_crosswalk": {
                "local_path": str(GEOGRAPHY_CROSSWALK.relative_to(ROOT)),
                "sha256": sha256(GEOGRAPHY_CROSSWALK),
            },
        },
        "qa": qa,
    }
    MANIFEST_OUT.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_OUT.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--refresh", action="store_true", help="Re-download the official HUD workbook")
    args = parser.parse_args()

    if not GEOGRAPHY_CROSSWALK.exists():
        raise SystemExit("Run `npm run build:geography` before building HUD FMR mappings.")

    download(HUD_FMR_URL, HUD_WORKBOOK, args.refresh)
    hud_rows = load_hud_rows(HUD_WORKBOOK)
    hud_areas = build_hud_area_records(hud_rows)
    cities = json.loads(GEOGRAPHY_CROSSWALK.read_text(encoding="utf-8"))
    mappings, review_records = build_city_mappings(cities, hud_rows)
    write_outputs(hud_areas, mappings, review_records)

    print(f"Wrote {len(hud_areas)} HUD FMR area records to {HUD_FMR_OUT.relative_to(ROOT)}")
    print(f"Wrote {len(mappings)} city HUD mappings to {PLACE_HUD_OUT.relative_to(ROOT)}")
    print(f"Wrote {len(review_records)} review records to {REVIEW_OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
