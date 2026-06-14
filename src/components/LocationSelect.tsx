import type { LocationProfile } from "../lib/types";

type LocationSelectProps = {
  id: string;
  label: string;
  value: string;
  locations: LocationProfile[];
  onChange: (locationId: string) => void;
};

export default function LocationSelect({
  id,
  label,
  value,
  locations,
  onChange,
}: LocationSelectProps) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.displayName}
          </option>
        ))}
      </select>
    </label>
  );
}
