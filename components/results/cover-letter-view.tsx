"use client";

import { useState } from "react";

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
  const [copied, setCopied] = useState(false);

  const fullText = sections.map((s) => `[${s.title}]\n${s.draft}`).join("\n\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="my-2 rounded-xl border border-[var(--color-border)] bg-white overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-3">
        <div>
          <h3 className="text-[14px] font-bold text-[var(--color-text)]">
            📝 {company} — {jobTitle}
          </h3>
          <p className="text-[11px] text-[var(--color-text-muted)]">NCS 기반 자기소개서 초안</p>
        </div>
        <button
          onClick={handleCopy}
          className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all ${
            copied
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          }`}
        >
          {copied ? "✓ 복사됨" : "📋 전체 복사"}
        </button>
      </div>
      <div className="divide-y divide-[var(--color-border-light)]">
        {sections.map((s) => (
          <div key={s.title} className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-bold text-[var(--color-text)]">{s.title}</div>
              <span className="text-[10px] text-[var(--color-text-muted)]">
                {s.draft.length}자
              </span>
            </div>
            <div className="mt-0.5 text-[11px] italic text-[var(--color-text-muted)]">{s.guide}</div>
            <div className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">{s.draft}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-2 text-[11px] text-[var(--color-text-muted)]">
        총 {fullText.length}자 · 이 초안을 바탕으로 본인의 실제 경험을 추가하여 완성하세요
      </div>
    </div>
  );
}
