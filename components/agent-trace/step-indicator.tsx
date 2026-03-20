"use client";

export function StepIndicator({ step }: { step: number }) {
  const steps = [
    "프로필 파악",
    "채용정보 검색",
    "안전성 분석",
    "훈련과정 추천",
    "결과 정리",
  ];

  return (
    <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-1">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              i < step
                ? "bg-[var(--color-primary)]"
                : i === step
                  ? "bg-[var(--color-primary)] animate-pulse"
                  : "bg-[var(--color-border)]"
            }`}
          />
          <span className={i <= step ? "text-[var(--color-text)]" : ""}>
            {s}
          </span>
          {i < steps.length - 1 && <span className="mx-1">→</span>}
        </span>
      ))}
    </div>
  );
}
