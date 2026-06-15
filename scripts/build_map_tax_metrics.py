#!/usr/bin/env python3
"""Build compact tax-rate curves for map heatmap views."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CITY_DIR = ROOT / "src" / "lib" / "cities"
OUTPUT = ROOT / "public" / "map-tax-metrics.json"


def extract_city_curve(path: Path) -> tuple[str, dict[str, list[float]]]:
    text = path.read_text()
    city_match = re.search(r'export const CITY_ID = "([^"]+)";', text)
    curve_match = re.search(r"export const CITY_TAX_CURVE = (\{.*\}) as const", text)
    if city_match is None or curve_match is None:
        raise ValueError(f"Could not parse city tax curve: {path}")
    return city_match.group(1), json.loads(curve_match.group(1))


def rate_bps(tax_amount: float, gross_income: float) -> int:
    if gross_income <= 0:
        return 0
    return round((tax_amount / gross_income) * 10_000)


def main() -> None:
    city_entries: dict[str, dict[str, list[int]]] = {}
    gross_grid: list[float] | None = None

    for path in sorted(CITY_DIR.glob("*.ts")):
        city_id, curve = extract_city_curve(path)
        gross_income = curve["grossIncome"]
        if gross_grid is None:
            gross_grid = gross_income
        elif gross_grid != gross_income:
            raise ValueError(f"Gross-income grid differs in {path}")

        federal_bps: list[int] = []
        state_bps: list[int] = []
        total_bps: list[int] = []
        for index, gross in enumerate(gross_income):
            federal_tax = curve["federalIncomeTax"][index] + curve["payrollTaxEmployee"][index]
            total_tax = curve["totalTax"][index]
            federal_bps.append(rate_bps(federal_tax, gross))
            state_bps.append(rate_bps(total_tax - federal_tax, gross))
            total_bps.append(rate_bps(total_tax, gross))

        city_entries[city_id] = {
            "federalBps": federal_bps,
            "stateBps": state_bps,
            "totalBps": total_bps,
        }

    if gross_grid is None:
        raise ValueError("No city tax curves found")

    payload = {
        "grossIncome": gross_grid,
        "cities": city_entries,
    }
    OUTPUT.write_text(json.dumps(payload, separators=(",", ":")))
    print(f"Wrote {OUTPUT.relative_to(ROOT)} with {len(city_entries)} city tax metric curves")


if __name__ == "__main__":
    main()
