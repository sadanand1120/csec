import { formatCurrency } from "../lib/format";

type SalaryControlProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function SalaryControl({ value, onChange }: SalaryControlProps) {
  return (
    <div className="field salary-control">
      <label htmlFor="salary">Source gross salary</label>
      <div className="salary-row">
        <input
          id="salary"
          type="number"
          min={0}
          max={10_000_000}
          step={1_000}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <strong>{formatCurrency(value)}</strong>
      </div>
    </div>
  );
}
