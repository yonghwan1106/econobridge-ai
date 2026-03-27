"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ToolResultRenderer } from "./tool-result-renderer";

const TOOL_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  search_worknet_jobs: { label: "고용24 채용검색", icon: "💼", color: "#00d4aa" },
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
  const [expanded, setExpanded] = useState(false);
  const info = TOOL_LABELS[toolName] ?? { label: toolName, icon: "🔧", color: "#64748b" };
  const isDone = result != null;
  const hasResult = result != null;

  return (
    <div
      className="my-2.5 overflow-hidden rounded-lg border transition-all"
      style={{
        borderColor: isDone ? "var(--color-border)" : `${info.color}30`,
        background: isDone ? "var(--color-bg-secondary)" : `${info.color}06`,
      }}
    >
      <button
        onClick={() => hasResult && setExpanded(!expanded)}
        className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 ${
          hasResult ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <span className="text-base">{info.icon}</span>
        <span className="flex-1 text-left text-[13px] font-semibold text-[var(--color-text)]">
          {info.label}
        </span>
        {isDone ? (
          <>
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700 border border-green-200">
              ✓ 완료
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className={`shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            >
              <path
                d="M3.5 5.25L7 8.75L10.5 5.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        ) : (
          <span className="flex items-center gap-1 text-[12px] font-medium" style={{ color: info.color }}>
            <span className="h-1.5 w-1.5 rounded-full pulse-ring" style={{ background: info.color }} />
            분석 중
          </span>
        )}
      </button>

      {/* Args */}
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

      {/* Children (legacy) */}
      {children}

      {/* Expandable result */}
      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: expanded ? "800px" : "0px" }}
      >
        {hasResult && (
          <div className="border-t border-[var(--color-border)] p-3">
            <ToolResultRenderer toolName={toolName} output={result} />
          </div>
        )}
      </div>
    </div>
  );
}
