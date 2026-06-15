export type IconName =
  | "basket"
  | "data"
  | "equal"
  | "food"
  | "healthcare"
  | "housing"
  | "map"
  | "net"
  | "other"
  | "phone"
  | "profile"
  | "salary"
  | "surplus"
  | "tax"
  | "transport";

const PATHS: Record<IconName, JSX.Element> = {
  basket: (
    <>
      <path d="M8 10h8l-1 8H9l-1-8Z" />
      <path d="M10 10a2 2 0 0 1 4 0" />
      <path d="M10 13h4" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="6" rx="6" ry="3" />
      <path d="M6 6v6c0 1.7 2.7 3 6 3s6-1.3 6-3V6" />
      <path d="M6 12v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4" />
    </>
  ),
  equal: (
    <>
      <path d="M6 9h12" />
      <path d="M6 15h12" />
    </>
  ),
  food: (
    <>
      <path d="M7 4v8" />
      <path d="M5 4v3a2 2 0 0 0 4 0V4" />
      <path d="M15 4v16" />
      <path d="M15 4c3 2 3 5.5 0 8" />
    </>
  ),
  healthcare: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
      <path d="M8 8h8v8H8z" />
    </>
  ),
  housing: (
    <>
      <path d="M4 11 12 5l8 6" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  map: (
    <>
      <path d="M12 21s6-5.4 6-11a6 6 0 0 0-12 0c0 5.6 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  net: (
    <>
      <path d="M5 8h14v10H5z" />
      <path d="M8 8V6h8v2" />
      <path d="M8 13h8" />
    </>
  ),
  other: (
    <>
      <path d="M6 6h5v5H6z" />
      <path d="M13 6h5v5h-5z" />
      <path d="M6 13h5v5H6z" />
      <path d="M13 13h5v5h-5z" />
    </>
  ),
  phone: (
    <>
      <rect x="8" y="4" width="8" height="16" rx="2" />
      <path d="M11 17h2" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  salary: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M4 10h3" />
      <path d="M17 14h3" />
    </>
  ),
  surplus: (
    <>
      <path d="M6 18h12" />
      <path d="M8 18V9h3v9" />
      <path d="M13 18V6h3v12" />
      <path d="M7 6h4" />
      <path d="M16 3v6" />
      <path d="M13 6h6" />
    </>
  ),
  tax: (
    <>
      <path d="M7 4h10v16l-2-1-2 1-2-1-2 1-2-1V4Z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h3" />
    </>
  ),
  transport: (
    <>
      <path d="M6 15h12l-1.4-5H7.4L6 15Z" />
      <path d="M8 15v2" />
      <path d="M16 15v2" />
      <circle cx="8" cy="17" r="1" />
      <circle cx="16" cy="17" r="1" />
    </>
  ),
};

export default function IconGlyph({ name }: { name: IconName }) {
  return (
    <svg
      aria-hidden="true"
      className="icon-glyph"
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {PATHS[name]}
    </svg>
  );
}
