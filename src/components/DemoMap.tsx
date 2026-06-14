import { formatCompactCurrency, formatFactor } from "../lib/format";
import type { computeHeatmap } from "../lib/equivalence";

type HeatmapValue = ReturnType<typeof computeHeatmap>[number];

type DemoMapProps = {
  values: HeatmapValue[];
  sourceId: string;
  targetId: string;
  onSelectTarget: (locationId: string) => void;
};

function colorForFactor(factor: number) {
  if (factor < 0.9) return "#1f9d7a";
  if (factor < 1.05) return "#79a63a";
  if (factor < 1.25) return "#d79a26";
  if (factor < 1.5) return "#cf5b3f";
  return "#9f2f45";
}

export default function DemoMap({ values, sourceId, targetId, onSelectTarget }: DemoMapProps) {
  const min = Math.min(...values.map((value) => value.factor));
  const max = Math.max(...values.map((value) => value.factor));

  return (
    <section className="map-panel" aria-label="Demo county heatmap">
      <div className="section-heading">
        <p className="eyebrow">Demo heatmap</p>
        <h3>Equivalent salary factor by county proxy</h3>
      </div>
      <div className="map-canvas">
        <div className="us-outline" aria-hidden="true" />
        {values.map(({ location, factor, equivalentSalary }) => {
          const isSource = location.id === sourceId;
          const isTarget = location.id === targetId;
          return (
            <button
              key={location.id}
              className={`map-node ${isSource ? "source" : ""} ${isTarget ? "target" : ""}`}
              style={{
                left: `${location.mapX}%`,
                top: `${location.mapY}%`,
                backgroundColor: colorForFactor(factor),
              }}
              onClick={() => onSelectTarget(location.id)}
              aria-label={`${location.displayName}, factor ${formatFactor(factor)}`}
            >
              <span>{location.shortName}</span>
              <strong>{formatFactor(factor)}</strong>
              <em>{formatCompactCurrency(equivalentSalary)}</em>
            </button>
          );
        })}
      </div>
      <div className="legend" aria-label="Heatmap legend">
        <span>{formatFactor(min)}</span>
        <div className="legend-ramp" />
        <span>{formatFactor(max)}</span>
      </div>
    </section>
  );
}
