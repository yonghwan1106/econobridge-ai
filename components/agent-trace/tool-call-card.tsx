"use client";

import type { ReactNode } from "react";

const TOOL_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  search_worknet_jobs: { label: "고용24 채용검색", icon: "💼", color: "#0f6fde" },
  search_disability_jobs: { label: "장애인 채용검색", icon: "♿", color: "#7c3aed" },
  search_training_courses: { label: "훈련과정 검색", icon: "📚", color: "#0891b2" },
  check_company_safety: { label: "기업 안전성 분석", icon: "🛡️", color: "#059669" },
  check_wage_violations: { label: "임금체불 조회", icon: "💰", color: "#d97706" },
  search_safety_laws: { label: "안전법령 검색", icon: "⚖️", color: "#6366f1" },
  generate_cover_letter: { label: "자기소개서 생성", icon: "📝", color: "#ec4899" },
};

export function ToolCallCard({
  toolName,
  args,
  result,
  children,
}: {
  toolName: string;
  args: Record<string, unknown>;
  result?: unknown;
  children?: ReactNode;
}) {
  const info = TOOL_LABELS[toolName] ?? { label: toolName, icon: "🔧", color: "#64748b" };
  const isDone = result != null;

  return (
    <div
      className="my-2.5 overflow-hidden rounded-lg border transition-all"
      style={{
        borderColor: isDone ? "var(--color-border)" : `${info.color}30`,
        background: isDone ? "var(--color-bg-secondary)" : `${info.color}06`,
      }}
    >
      <div className="flex items-center gap-2.5 px-3.5 py-2.5">
        <span className="text-base">{info.icon}</span>
        <span className="flex-1 text-[13px] font-semibold text-[var(--color-text)]">
          {info.label}
        </span>
        {isDone ? (
          <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700 border border-green-200">
            ✓ 완료
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[12px] font-medium" style={{ color: info.color }}>
            <span className="h-1.5 w-1.5 rounded-full pulse-ring" style={{ background: info.color }} />
            분석 중
          </span>
        )}
      </div>
      {args && Object.keys(args).length > 0 && (
        <div className="border-t border-[var(--color-border-light)] px-3.5 py-2 text-[12px] text-[var(--color-text-muted)]">
          {Object.entries(args)
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <span key={k} className="mr-3 inline-flex items-center gap-1">
                <span className="font-medium text-[var(--color-text-secondary)]">{k}</span>
                <span>{String(v)}</span>
              </span>
            ))}
        </div>
      )}
      {children}
    </div>
  );
}
