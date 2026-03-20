"use client";

interface Section {
  title: string;
  guide: string;
  draft: string;
}

export function CoverLetterView({
  company,
  jobTitle,
  sections,
}: {
  company: string;
  jobTitle: string;
  sections: Section[];
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] p-4">
      <h3 className="mb-3 text-sm font-semibold">
        📝 {company} — {jobTitle} 자기소개서 초안
      </h3>
      <div className="space-y-3">
        {sections.map((s) => (
          <div key={s.title}>
            <div className="text-sm font-medium text-[var(--color-text)]">
              {s.title}
            </div>
            <div className="mt-0.5 text-xs italic text-[var(--color-text-muted)]">
              {s.guide}
            </div>
            <div className="mt-1 text-sm text-[var(--color-text)]">
              {s.draft}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
