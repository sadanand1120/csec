import type { LocationProfile } from "../lib/types";

type LocationSelectProps = {
  id: string;
  label: string;
  value: string | null;
  locations: readonly LocationProfile[];
  onChange: (locationId: string | null) => void;
  placeholder: string;
};

export default function LocationSelect({
  id,
  label,
  value,
  locations,
  onChange,
  placeholder,
}: LocationSelectProps) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <select
        id={id}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value || null)}
      >
        <option value="">{placeholder}</option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.displayName}
          </option>
        ))}
      </select>
    </label>
  );
}
