# After-Tax Salary Equivalence Map

Local prototype for a transparent after-tax disposable-income equivalence calculator.

The current app is a six-location deterministic demo from `plan.md` section 25. It is meant to validate the UX and calculation flow before replacing the fixture with Census, HUD FMR, BEA RPP, and PolicyEngine-derived artifacts.

## Run Locally

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## What Works Now

- Austin, Sunnyvale, New York, Seattle, Denver, and Raleigh demo locations.
- Source and target selectors.
- Salary input and slider.
- Single adult, no children, W-2, renter, 1BR assumptions.
- Pairwise equivalent salary calculation.
- Demo heatmap with clickable target locations.
- Tax, expense, surplus, and driver breakdowns.
- Methodology and caveats page.

## Important Limitation

The fixture values are deliberately marked as demo-only. They are not a substitute for the public-data pipeline described in `plan.md`.
