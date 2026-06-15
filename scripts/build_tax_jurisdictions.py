"""Build reviewed tax-jurisdiction inputs for nationwide tax curves."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CITY_UNIVERSE = ROOT / "data/intermediate/city_universe/canonical_places_2025_pop_ge_100k.json"
GEOGRAPHY = ROOT / "data/intermediate/geography/place_county_cbsa_crosswalk.json"
OUT = ROOT / "data/intermediate/tax/tax_jurisdiction_manifest.json"
REVIEW_OUT = ROOT / "data/review/tax/local_tax_coverage_review.json"

SUPPORTED_POLICYENGINE_VERSION = "1.729.0"
TAX_YEAR = 2026

CITY_INPUTS = {
    "PLACE:3651000": {
        "coverage": "supported",
        "household_inputs": {"in_nyc": True},
        "notes": ["NYC resident income tax enabled through PolicyEngine `in_nyc`."],
    },
    "PLACE:4260000": {
        "coverage": "supported",
        "person_inputs": {"pa_philadelphia_wage_tax_resident": True},
        "person_gross_inputs": {
            "pa_philadelphia_wage_tax_taxable_wages": "grossIncome",
        },
        "notes": ["Philadelphia resident wage tax enabled through PolicyEngine Philadelphia wage-tax inputs."],
    },
    "PLACE:0820000": {
        "coverage": "supported",
        "person_inputs": {"co_denver_employee_occupational_privilege_tax_months": 12},
        "notes": ["Denver employee occupational privilege tax enabled for all 12 months."],
    },
    "PLACE:2938000": {
        "coverage": "supported",
        "person_gross_inputs": {"mo_kansas_city_earnings_tax_taxable_earnings": "grossIncome"},
        "notes": ["Kansas City earnings tax enabled through PolicyEngine taxable earnings input."],
    },
    "PLACE:2965000": {
        "coverage": "supported",
        "person_gross_inputs": {"mo_st_louis_earnings_tax_taxable_earnings": "grossIncome"},
        "notes": ["St. Louis earnings tax enabled through PolicyEngine taxable earnings input."],
    },
}

STATE_LEVEL_NOTES = {
    "MD": "Maryland county local income tax is modeled by PolicyEngine from county_fips.",
    "IN": "Indiana county income tax is modeled by PolicyEngine from county_fips.",
}

LOCAL_TAX_RISK_RULES = [
    {
        "states": {"OH"},
        "coverage": "partial_local_missing",
        "warning": "Ohio municipal income taxes are not modeled by PolicyEngine 1.729.0 in this pipeline.",
    },
    {
        "states": {"MI"},
        "coverage": "partial_local_missing",
        "warning": "Michigan city income taxes, including Detroit where applicable, are not modeled by PolicyEngine 1.729.0 in this pipeline.",
    },
    {
        "states": {"KY"},
        "coverage": "partial_local_missing",
        "warning": "Kentucky local occupational/license taxes are not modeled by PolicyEngine 1.729.0 in this pipeline.",
    },
    {
        "states": {"PA"},
        "exclude_ids": {"PLACE:4260000"},
        "coverage": "partial_local_missing",
        "warning": "Pennsylvania local earned-income/local-services taxes outside Philadelphia are not modeled by PolicyEngine 1.729.0 in this pipeline.",
    },
    {
        "ids": {"PLACE:4159000", "PLACE:4131250"},
        "coverage": "partial_local_missing",
        "warning": "Portland-area Metro/Multnomah local personal taxes are only partially modeled; Multnomah PFA may be modeled by county, but Metro SHS is not confirmed in PolicyEngine 1.729.0.",
    },
    {
        "ids": {"PLACE:0107000"},
        "coverage": "partial_local_missing",
        "warning": "Birmingham occupational/license tax is not modeled by PolicyEngine 1.729.0 in this pipeline.",
    },
]


def risk_warnings(city: dict) -> list[dict]:
    warnings = []
    for rule in LOCAL_TAX_RISK_RULES:
        if city["id"] in rule.get("exclude_ids", set()):
            continue
        state_match = city["state_abbr"] in rule.get("states", set())
        id_match = city["id"] in rule.get("ids", set())
        if state_match or id_match:
            warnings.append({"coverage": rule["coverage"], "warning": rule["warning"]})
    return warnings


def main() -> None:
    cities = json.loads(CITY_UNIVERSE.read_text(encoding="utf-8"))
    geography_by_id = {
        record["id"]: record
        for record in json.loads(GEOGRAPHY.read_text(encoding="utf-8"))
    }

    records = []
    review = []
    for city in cities:
        geography = geography_by_id[city["id"]]
        configured = CITY_INPUTS.get(city["id"], {})
        risks = risk_warnings(city)
        coverage = configured.get("coverage", "supported")
        if risks:
            coverage = "partial_local_missing"

        notes = []
        if city["state_abbr"] in STATE_LEVEL_NOTES:
            notes.append(STATE_LEVEL_NOTES[city["state_abbr"]])
        notes.extend(configured.get("notes", []))
        notes.extend(risk["warning"] for risk in risks)

        record = {
            "id": city["id"],
            "display_name": city["display_name"],
            "state_abbr": city["state_abbr"],
            "county_fips": geography["computation_county_fips"],
            "coverage": coverage,
            "policyengine_us_version": SUPPORTED_POLICYENGINE_VERSION,
            "tax_year": TAX_YEAR,
            "household_inputs": configured.get("household_inputs", {}),
            "person_inputs": configured.get("person_inputs", {}),
            "person_gross_inputs": configured.get("person_gross_inputs", {}),
            "notes": notes,
        }
        records.append(record)
        if coverage != "supported" or record["household_inputs"] or record["person_inputs"] or record["person_gross_inputs"]:
            review.append(record)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(records, indent=2) + "\n", encoding="utf-8")
    REVIEW_OUT.parent.mkdir(parents=True, exist_ok=True)
    REVIEW_OUT.write_text(json.dumps(review, indent=2) + "\n", encoding="utf-8")

    counts = {}
    for record in records:
        counts[record["coverage"]] = counts.get(record["coverage"], 0) + 1
    print(f"Wrote {len(records)} tax jurisdiction records to {OUT.relative_to(ROOT)}")
    print("coverage", counts)


if __name__ == "__main__":
    main()
