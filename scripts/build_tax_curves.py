"""Generate PolicyEngine gross-to-net tax curves for the 343-city pipeline."""

from __future__ import annotations

import hashlib
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CITY_UNIVERSE = ROOT / "data/intermediate/city_universe/canonical_places_2025_pop_ge_100k.json"
TAX_JURISDICTIONS = ROOT / "data/intermediate/tax/tax_jurisdiction_manifest.json"
CURVE_DIR = ROOT / "data/intermediate/tax/curves"
MANIFEST_OUT = ROOT / "data/provenance/tax_curve_manifest.json"
QA_OUT = ROOT / "data/qa/tax_curve_report.json"

TAX_YEAR = "2026"
POLICYENGINE_US_VERSION = "1.729.0"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def gross_grid() -> list[int]:
    return (
        list(range(0, 500_001, 1_000))
        + list(range(505_000, 1_000_001, 5_000))
        + list(range(1_020_000, 10_000_001, 20_000))
    )


def arr(values) -> list[float]:
    return [round(float(value), 2) for value in values]


def make_policyengine_situation(jurisdiction: dict, gross_values: list[int]) -> dict:
    people = {}
    households = {}
    tax_units = {}
    spm_units = {}
    families = {}
    marital_units = {}

    for index, gross in enumerate(gross_values):
        person = f"person_{index}"
        person_entity = {
            "age": {TAX_YEAR: 30},
            "employment_income": {TAX_YEAR: gross},
            "is_tax_unit_head": {TAX_YEAR: True},
        }
        for variable, value in jurisdiction["person_inputs"].items():
            person_entity[variable] = {TAX_YEAR: value}
        for variable, source in jurisdiction["person_gross_inputs"].items():
            if source != "grossIncome":
                raise ValueError(f"Unsupported gross input source {source!r} for {variable}")
            person_entity[variable] = {TAX_YEAR: gross}

        household_entity = {
            "members": [person],
            "state_code": {TAX_YEAR: jurisdiction["state_abbr"]},
            "county_fips": {TAX_YEAR: jurisdiction["county_fips"]},
        }
        for variable, value in jurisdiction["household_inputs"].items():
            household_entity[variable] = {TAX_YEAR: value}

        people[person] = person_entity
        households[f"household_{index}"] = household_entity
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


def build_curve(jurisdiction: dict, gross_values: list[int]) -> dict:
    from policyengine_us import Simulation

    sim = Simulation(situation=make_policyengine_situation(jurisdiction, gross_values))
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
    net_values = arr(net)
    net_for_inversion = []
    running_max = None
    for value in net_values:
        running_max = value if running_max is None else max(running_max, value)
        net_for_inversion.append(running_max)
    return {
        "grossIncome": gross_values,
        "netIncome": net_values,
        "netIncomeForInversion": net_for_inversion,
        "totalTax": arr(household_tax),
        "federalIncomeTax": arr(federal_income_tax),
        "stateIncomeTax": arr(state_income_tax),
        "localIncomeTax": arr(local_income_tax),
        "payrollTaxEmployee": arr(payroll),
        "statePayrollItems": arr(state_payroll_items),
        "taxComponentResidual": arr(residual),
    }


def curve_qa(curve: dict) -> dict:
    gross = curve["grossIncome"]
    net = curve["netIncome"]
    net_for_inversion = curve["netIncomeForInversion"]
    total = curve["totalTax"]
    component_max_abs_error = 0.0
    net_max_abs_error = 0.0
    monotonic_violations = 0
    for index, gross_income in enumerate(gross):
        component_sum = (
            curve["federalIncomeTax"][index]
            + curve["stateIncomeTax"][index]
            + curve["localIncomeTax"][index]
            + curve["payrollTaxEmployee"][index]
            + curve["statePayrollItems"][index]
            + curve["taxComponentResidual"][index]
        )
        component_max_abs_error = max(component_max_abs_error, abs(component_sum - total[index]))
        net_max_abs_error = max(net_max_abs_error, abs(gross_income - total[index] - net[index]))
        if index > 0 and net[index] + 0.01 < net[index - 1]:
            monotonic_violations += 1
        if index > 0 and net_for_inversion[index] + 0.01 < net_for_inversion[index - 1]:
            raise ValueError("netIncomeForInversion must be monotonic")
    return {
        "component_max_abs_error": round(component_max_abs_error, 4),
        "net_max_abs_error": round(net_max_abs_error, 4),
        "monotonic_violations": monotonic_violations,
    }


def main() -> None:
    cities = {city["id"]: city for city in json.loads(CITY_UNIVERSE.read_text(encoding="utf-8"))}
    jurisdictions = json.loads(TAX_JURISDICTIONS.read_text(encoding="utf-8"))
    grid = gross_grid()

    shutil.rmtree(CURVE_DIR, ignore_errors=True)
    CURVE_DIR.mkdir(parents=True, exist_ok=True)
    qa_records = []
    manifest_records = []
    for index, jurisdiction in enumerate(jurisdictions, start=1):
        city = cities[jurisdiction["id"]]
        curve = build_curve(jurisdiction, grid)
        output_path = CURVE_DIR / f"{city['slug']}.json"
        output_path.write_text(json.dumps(curve, separators=(",", ":")) + "\n", encoding="utf-8")
        qa = curve_qa(curve)
        qa_records.append(
            {
                "id": city["id"],
                "display_name": city["display_name"],
                "slug": city["slug"],
                "coverage": jurisdiction["coverage"],
                **qa,
            }
        )
        manifest_records.append(
            {
                "id": city["id"],
                "display_name": city["display_name"],
                "slug": city["slug"],
                "path": str(output_path.relative_to(ROOT)),
                "sha256": sha256(output_path),
            }
        )
        if index % 25 == 0 or index == len(jurisdictions):
            print(f"generated {index}/{len(jurisdictions)} tax curves")

    QA_OUT.parent.mkdir(parents=True, exist_ok=True)
    QA_OUT.write_text(json.dumps({"records": qa_records}, indent=2) + "\n", encoding="utf-8")
    manifest = {
        "schema_version": "1.0",
        "status": "generated",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "policyengine_us_version": POLICYENGINE_US_VERSION,
        "tax_year": int(TAX_YEAR),
        "grid": {
            "count": len(grid),
            "rules": [
                "0 to 500000 gross: 1000 increments",
                "500000 to 1000000 gross: 5000 increments",
                "1000000 to 10000000 gross: 20000 increments",
            ],
        },
        "sources": {
            "city_universe": {
                "local_path": str(CITY_UNIVERSE.relative_to(ROOT)),
                "sha256": sha256(CITY_UNIVERSE),
            },
            "tax_jurisdictions": {
                "local_path": str(TAX_JURISDICTIONS.relative_to(ROOT)),
                "sha256": sha256(TAX_JURISDICTIONS),
            },
        },
        "curves": manifest_records,
        "qa": {
            "city_count": len(manifest_records),
            "max_component_abs_error": max(record["component_max_abs_error"] for record in qa_records),
            "max_net_abs_error": max(record["net_max_abs_error"] for record in qa_records),
            "monotonic_violation_count": sum(record["monotonic_violations"] for record in qa_records),
            "partial_local_missing_count": sum(
                record["coverage"] == "partial_local_missing" for record in qa_records
            ),
        },
    }
    MANIFEST_OUT.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_OUT.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
