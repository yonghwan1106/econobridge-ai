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
    <div className="group rounded-xl border border-[var(--color-border)] bg-white p-4 transition-all hover:border-[var(--color-primary)] hover:shadow-md">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[12px] font-bold text-[var(--color-primary)]">{company}</span>
        {closeDate && (
          <span className="rounded bg-[var(--color-bg-secondary)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-muted)]">
            ~{closeDate}
          </span>
        )}
      </div>
      <h3 className="mb-3 text-[14px] font-bold leading-snug text-[var(--color-text)] group-hover:text-[var(--color-primary)]">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        <Tag icon="💰" text={salary} />
        <Tag icon="📍" text={region} />
        {career && <Tag icon="👤" text={career} />}
      </div>
    </div>
  );
}

function Tag({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-[var(--color-bg-secondary)] px-2 py-1 text-[11px] font-medium text-[var(--color-text-secondary)]">
      <span className="text-[12px]">{icon}</span>
      {text}
    </span>
  );
}
