"use client";

export function JobCard({
  company,
  title,
  salary,
  region,
  career,
  closeDate,
}: {
  company: string;
  title: string;
  salary: string;
  region: string;
  career?: string;
  closeDate?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] p-4 transition-shadow hover:shadow-md">
      <div className="mb-1 text-xs font-medium text-[var(--color-primary)]">
        {company}
      </div>
      <h3 className="mb-2 text-sm font-semibold text-[var(--color-text)]">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-muted)]">
        <span className="rounded bg-[var(--color-bg-secondary)] px-2 py-0.5">
          💰 {salary}
        </span>
        <span className="rounded bg-[var(--color-bg-secondary)] px-2 py-0.5">
          📍 {region}
        </span>
        {career && (
          <span className="rounded bg-[var(--color-bg-secondary)] px-2 py-0.5">
            👤 {career}
          </span>
        )}
        {closeDate && (
          <span className="rounded bg-[var(--color-bg-secondary)] px-2 py-0.5">
            📅 ~{closeDate}
          </span>
        )}
      </div>
    </div>
  );
}
