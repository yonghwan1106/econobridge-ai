"use client";

interface Violation {
  date: string;
  amount: string;
  workers_affected: string;
  status: string;
}

interface WageData {
  company: string;
  violation_count: number;
  total_amount?: string;
  violations: Violation[];
  status: string;
}

export function WageViolationCard({ data }: { data: WageData }) {
  const hasViolations = data.violation_count > 0;

  return (
    <div className="my-2 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: hasViolations
            ? "linear-gradient(to right, #fffbeb, #ffffff)"
            : "linear-gradient(to right, #ecfdf5, #ffffff)",
        }}
      >
        <div>
          <h4 className="text-[14px] font-bold text-[var(--color-text)]">
            💰 {data.company} 임금체불 조회
          </h4>
          <p className="mt-0.5 text-[11px] text-[var(--color-text-muted)]">
            고용노동부 상습 임금체불 공개명단
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-bold ${
            hasViolations
              ? "bg-amber-50 text-amber-700 border border-amber-200"
              : "bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          {hasViolations ? `⚠️ ${data.violation_count}건 적발` : "✅ 이력 없음"}
        </span>
      </div>

      {hasViolations && (
        <div className="border-t border-[var(--color-border-light)] px-4 py-3">
          {data.total_amount && (
            <div className="mb-3 flex items-baseline gap-2">
              <span className="text-[11px] font-medium text-[var(--color-text-muted)]">총 체불액</span>
              <span className="text-[16px] font-extrabold text-amber-600">{data.total_amount}</span>
            </div>
          )}
          <div className="space-y-2">
            {data.violations.map((v, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg bg-amber-50/50 px-3 py-2 text-[12px]"
              >
                <span className="font-medium text-[var(--color-text-muted)]">{v.date}</span>
                <span className="font-bold text-amber-700">{v.amount}</span>
                <span className="text-[var(--color-text-secondary)]">피해 {v.workers_affected}</span>
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    v.status === "미청산"
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "bg-green-50 text-green-600 border border-green-200"
                  }`}
                >
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
