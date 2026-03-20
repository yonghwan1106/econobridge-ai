"use client";

const STEPS = [
  { label: "프로필 파악", icon: "📋" },
  { label: "채용정보 검색", icon: "🔍" },
  { label: "안전성 분석", icon: "🛡️" },
  { label: "훈련과정 추천", icon: "📚" },
  { label: "결과 정리", icon: "📊" },
];

export function StepIndicator({ step }: { step: number }) {
  return (
    <div className="animate-fade-in mb-3 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        {STEPS.map((s, i) => {
          const isComplete = i < step;
          const isCurrent = i === step;
          const isPending = i > step;

          return (
            <div key={s.label} className="flex items-center">
              {/* Step node */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-500 ${
                    isComplete
                      ? "bg-[var(--color-primary)] text-white shadow-sm"
                      : isCurrent
                        ? "bg-[var(--color-primary)] text-white shadow-md pulse-ring"
                        : "bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]"
                  }`}
                >
                  {isComplete ? "✓" : s.icon}
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-300 ${
                    isComplete
                      ? "text-[var(--color-primary)]"
                      : isCurrent
                        ? "text-[var(--color-text)] font-bold"
                        : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {s.label}
                </span>
              </div>

              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-1.5 h-0.5 w-6 rounded-full transition-all duration-500 ${
                    isPending
                      ? "bg-[var(--color-border)]"
                      : "bg-[var(--color-primary)]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Map tool name to step index */
export function toolNameToStep(toolName: string): number {
  if (toolName.includes("worknet") || toolName.includes("disability")) return 1;
  if (toolName.includes("safety") || toolName.includes("wage")) return 2;
  if (toolName.includes("training")) return 3;
  if (toolName.includes("cover_letter")) return 4;
  return 0;
}
