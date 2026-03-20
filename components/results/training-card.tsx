"use client";

export function TrainingCard({
  title,
  institution,
  region,
  duration,
  cost,
  trainingType,
}: {
  title: string;
  institution: string;
  region: string;
  duration: string;
  cost: string;
  trainingType?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] p-4 transition-shadow hover:shadow-md">
      {trainingType && (
        <div className="mb-1 inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
          {trainingType}
        </div>
      )}
      <h3 className="mb-2 text-sm font-semibold text-[var(--color-text)]">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-muted)]">
        <span className="rounded bg-[var(--color-bg-secondary)] px-2 py-0.5">
          🏫 {institution}
        </span>
        <span className="rounded bg-[var(--color-bg-secondary)] px-2 py-0.5">
          📍 {region}
        </span>
        <span className="rounded bg-[var(--color-bg-secondary)] px-2 py-0.5">
          ⏱ {duration}
        </span>
        <span className="rounded bg-[var(--color-bg-secondary)] px-2 py-0.5">
          💰 {cost}
        </span>
      </div>
    </div>
  );
}
