"use client";

export function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2 py-2 text-sm text-[var(--color-text-muted)]">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
      <span>분석 중...</span>
    </div>
  );
}
