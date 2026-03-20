"use client";

export function ThinkingIndicator() {
  return (
    <div className="animate-fade-in flex items-center gap-3 py-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg pulse-ring" style={{ background: "var(--color-ink)" }}>
        <svg className="h-3.5 w-3.5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
      <div className="text-[13px] text-[var(--color-text-muted)]">
        <span className="font-medium text-[var(--color-text-secondary)]">AI가 분석하고 있습니다</span>
        <span className="thinking-dots ml-0.5">
          <span>.</span><span>.</span><span>.</span>
        </span>
      </div>
    </div>
  );
}
