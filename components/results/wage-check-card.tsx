"use client";

interface Violation {
  date?: string;
  amount?: string;
  workers?: number;
  status?: string;
}

export function WageCheckCard({
  company,
  violationCount,
  totalAmount,
  violations,
}: {
  company: string;
  violationCount: number;
  totalAmount?: string;
  violations?: Violation[];
}) {
  const hasViolations = violationCount > 0;

  return (
    <div
      className={`rounded-xl border p-4 ${
        hasViolations
          ? "border-red-200 bg-red-50"
          : "border-green-200 bg-green-50"
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm font-semibold text-[var(--color-text)]">
          {company}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            hasViolations
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {hasViolations
            ? `체불 ${violationCount}건`
            : "체불 이력 없음"}
        </span>
      </div>
      {hasViolations && totalAmount && (
        <div className="mb-2 text-xs text-[var(--color-text-muted)]">
          총 체불 금액: {totalAmount}
        </div>
      )}
      {violations && violations.length > 0 && (
        <div className="space-y-1">
          {violations.slice(0, 3).map((v, i) => (
            <div
              key={i}
              className="flex flex-wrap gap-2 text-xs text-[var(--color-text-muted)]"
            >
              {v.date && (
                <span className="rounded bg-white/60 px-1.5 py-0.5">
                  📅 {v.date}
                </span>
              )}
              {v.amount && (
                <span className="rounded bg-white/60 px-1.5 py-0.5">
                  💰 {v.amount}
                </span>
              )}
              {v.workers && (
                <span className="rounded bg-white/60 px-1.5 py-0.5">
                  👥 {v.workers}명
                </span>
              )}
              {v.status && (
                <span className="rounded bg-white/60 px-1.5 py-0.5">
                  {v.status}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
