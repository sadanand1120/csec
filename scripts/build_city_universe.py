"""Build the canonical 343-place Census city/town-estimates universe.

This stage only establishes city identity, population rank, GEOID, and
Gazetteer coordinates. It does not gather housing, BEA, BLS, or tax data.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import urllib.request
import zipfile
from datetime import datetime, timezone
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

POPULATION_URL = (
    "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/"
    "cities/totals/sub-est2025.csv"
)
GAZETTEER_URL = (
    "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/"
    "2025_Gazetteer/2025_Gaz_place_national.zip"
)

POPULATION_RAW = ROOT / "data/raw/census/popest/2025/sub-est2025.csv"
GAZETTEER_RAW = ROOT / "data/raw/census/gazetteer/2025/2025_Gaz_place_national.zip"
CITY_UNIVERSE_OUT = (
    ROOT / "data/intermediate/city_universe/canonical_places_2025_pop_ge_100k.json"
)
MANIFEST_OUT = ROOT / "data/provenance/city_universe_manifest.json"

MIN_POPULATION = 100_000
EXPECTED_CITY_COUNT = 343

STATE_ABBR_TO_NAME = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District of Columbia",
    "FL": "Florida",
    "GA": "Georgia",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PA": "Pennsylvania",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming",
}
STATE_NAME_TO_ABBR = {name: abbr for abbr, name in STATE_ABBR_TO_NAME.items()}


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


def parse_population_rows(path: Path) -> list[dict]:
    out: list[dict] = []
    with path.open("r", encoding="latin1", newline="") as file:
        rows = csv.DictReader(file)
        for row_number, row in enumerate(rows, start=2):
            if row["SUMLEV"] != "162":
                continue
            population = int(row["POPESTIMATE2025"])
            if population < MIN_POPULATION:
                continue
            state_abbr = STATE_NAME_TO_ABBR.get(row["STNAME"])
            if state_abbr is None:
                raise ValueError(f"Unknown state name in population CSV: {row['STNAME']}")
            out.append(
                {
                    "legal_name": row["NAME"],
                    "state_name": row["STNAME"],
                    "state_abbr": state_abbr,
                    "state_fips": row["STATE"],
                    "place_fips": row["PLACE"],
                    "place_geoid": f"{row['STATE']}{row['PLACE']}",
                    "population_2025": population,
                    "estimate_base_2020": int(row["ESTIMATESBASE2020"]),
                    "population_csv_row": row_number,
                    "population_sumlev": row["SUMLEV"],
                    "population_funcstat": row["FUNCSTAT"],
                }
            )
    out.sort(key=lambda entry: (-entry["population_2025"], entry["state_abbr"], entry["legal_name"]))
    for index, entry in enumerate(out, start=1):
        entry["population_rank_2025"] = index
    return out


def parse_gazetteer_rows(path: Path) -> dict[str, dict]:
    with zipfile.ZipFile(path) as archive:
        [name] = archive.namelist()
        text = archive.read(name).decode("utf-8")
    reader = csv.DictReader(io.StringIO(text), delimiter="|")
    out: dict[str, dict] = {}
    for row_number, row in enumerate(reader, start=2):
        out[row["GEOID"]] = {
            "place_geoid": row["GEOID"],
            "place_geoidfq": row["GEOIDFQ"],
            "ansicode": row["ANSICODE"],
            "legal_name": row["NAME"],
            "lsad": row["LSAD"],
            "funcstat": row["FUNCSTAT"],
            "land_area_sqmi": float(row["ALAND_SQMI"]),
            "water_area_sqmi": float(row["AWATER_SQMI"]),
            "centroid_lat": float(row["INTPTLAT"]),
            "centroid_lon": float(row["INTPTLONG"]),
            "gazetteer_row": row_number,
        }
    return out


def short_name(legal_name: str) -> str:
    name = legal_name
    name = re.sub(r" city \(balance\)$", "", name)
    name = re.sub(r" metropolitan government \(balance\)$", "", name)
    name = re.sub(r" metro government \(balance\)$", "", name)
    name = re.sub(r" unified government \(balance\)$", "", name)
    for suffix in (
        " city and borough",
        " municipality",
        " borough",
        " village",
        " township",
        " town",
        " city",
    ):
        if name.endswith(suffix):
            return name[: -len(suffix)]
    return name


def slugify(short: str, state_abbr: str) -> str:
    normalized = short.replace("'", "")
    normalized = re.sub(r"[^A-Za-z0-9]+", "-", normalized).strip("-").lower()
    return f"{normalized}-{state_abbr.lower()}"


def build_city_universe(population_rows: list[dict], gazetteer_rows: dict[tuple[str, str], dict]) -> list[dict]:
    places = []
    used_slugs: set[str] = set()
    missing = []
    for population_row in population_rows:
        key = population_row["place_geoid"]
        gazetteer_row = gazetteer_rows.get(key)
        if gazetteer_row is None:
            missing.append(key)
            continue
        if gazetteer_row["legal_name"] != population_row["legal_name"]:
            raise ValueError(
                "Population/Gazetteer name mismatch for "
                f"{population_row['place_geoid']}: "
                f"{population_row['legal_name']} vs {gazetteer_row['legal_name']}"
            )

        short = short_name(population_row["legal_name"])
        slug = slugify(short, population_row["state_abbr"])
        if slug in used_slugs:
            slug = f"{slug}-{gazetteer_row['place_geoid']}"
        used_slugs.add(slug)

        places.append(
            {
                "id": f"PLACE:{gazetteer_row['place_geoid']}",
                "slug": slug,
                "display_name": f"{short}, {population_row['state_abbr']}",
                "short_name": short,
                "legal_name": population_row["legal_name"],
                "state_abbr": population_row["state_abbr"],
                "state_name": population_row["state_name"],
                "state_fips": population_row["state_fips"],
                "place_fips": population_row["place_fips"],
                "place_geoid": gazetteer_row["place_geoid"],
                "place_geoidfq": gazetteer_row["place_geoidfq"],
                "ansicode": gazetteer_row["ansicode"],
                "lsad": gazetteer_row["lsad"],
                "funcstat": gazetteer_row["funcstat"],
                "population_sumlev": population_row["population_sumlev"],
                "population_funcstat": population_row["population_funcstat"],
                "population_2025": population_row["population_2025"],
                "population_rank_2025": population_row["population_rank_2025"],
                "estimate_base_2020": population_row["estimate_base_2020"],
                "land_area_sqmi": gazetteer_row["land_area_sqmi"],
                "water_area_sqmi": gazetteer_row["water_area_sqmi"],
                "centroid_lat": gazetteer_row["centroid_lat"],
                "centroid_lon": gazetteer_row["centroid_lon"],
                "source_rows": {
                    "population_csv_row": population_row["population_csv_row"],
                    "gazetteer_row": gazetteer_row["gazetteer_row"],
                },
            }
        )

    if missing:
        formatted = ", ".join(missing[:20])
        raise ValueError(f"Missing {len(missing)} Gazetteer joins: {formatted}")
    if len(places) != EXPECTED_CITY_COUNT:
        raise ValueError(f"Expected {EXPECTED_CITY_COUNT} places, got {len(places)}")
    return places


def write_outputs(places: list[dict]) -> None:
    CITY_UNIVERSE_OUT.parent.mkdir(parents=True, exist_ok=True)
    CITY_UNIVERSE_OUT.write_text(json.dumps(places, indent=2) + "\n", encoding="utf-8")

    manifest = {
        "schema_version": "1.0",
        "artifact": str(CITY_UNIVERSE_OUT.relative_to(ROOT)),
        "status": "generated",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "inclusion_rule": {
            "source": "U.S. Census subcounty city/town estimates",
            "sumlev": "162",
            "population_column": "POPESTIMATE2025",
            "minimum_population": MIN_POPULATION,
            "expected_count": EXPECTED_CITY_COUNT,
            "actual_count": len(places),
            "special_case_note": "The 343-place Census convention includes Urban Honolulu CDP, Hawaii; general CDPs are not included.",
        },
        "sources": {
            "population_estimates": {
                "name": "Subcounty Resident Population Estimates: April 1, 2020 to July 1, 2025 (SUB-EST2025)",
                "url": POPULATION_URL,
                "local_path": str(POPULATION_RAW.relative_to(ROOT)),
                "sha256": sha256(POPULATION_RAW),
            },
            "gazetteer": {
                "name": "2025 Census National Places Gazetteer File",
                "url": GAZETTEER_URL,
                "local_path": str(GAZETTEER_RAW.relative_to(ROOT)),
                "sha256": sha256(GAZETTEER_RAW),
            },
        },
        "qa": {
            "unique_ids": len({place["id"] for place in places}) == len(places),
            "unique_slugs": len({place["slug"] for place in places}) == len(places),
            "min_population_observed": min(place["population_2025"] for place in places),
            "max_population_observed": max(place["population_2025"] for place in places),
        },
    }
    MANIFEST_OUT.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_OUT.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--refresh", action="store_true", help="Re-download official source files")
    args = parser.parse_args()

    download(POPULATION_URL, POPULATION_RAW, args.refresh)
    download(GAZETTEER_URL, GAZETTEER_RAW, args.refresh)
    population_rows = parse_population_rows(POPULATION_RAW)
    gazetteer_rows = parse_gazetteer_rows(GAZETTEER_RAW)
    places = build_city_universe(population_rows, gazetteer_rows)
    write_outputs(places)
    print(f"Wrote {len(places)} city records to {CITY_UNIVERSE_OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
