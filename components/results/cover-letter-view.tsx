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
    <div className="rounded-xl border border-[var(--color-border)] bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-[var(--color-border)] px-4 py-3">
        <h3 className="text-[14px] font-bold text-[var(--color-text)]">
          📝 {company} — {jobTitle}
        </h3>
        <p className="text-[11px] text-[var(--color-text-muted)]">NCS 기반 자기소개서 초안</p>
      </div>
      <div className="divide-y divide-[var(--color-border-light)]">
        {sections.map((s) => (
          <div key={s.title} className="px-4 py-3">
            <div className="text-[13px] font-bold text-[var(--color-text)]">{s.title}</div>
            <div className="mt-0.5 text-[11px] italic text-[var(--color-text-muted)]">{s.guide}</div>
            <div className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">{s.draft}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
