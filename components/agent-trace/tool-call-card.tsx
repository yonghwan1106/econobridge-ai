"use client";

const TOOL_LABELS: Record<string, { label: string; icon: string }> = {
  search_worknet_jobs: { label: "워크넷 채용검색", icon: "🔍" },
  search_disability_jobs: { label: "장애인 채용검색", icon: "♿" },
  search_training_courses: { label: "훈련과정 검색", icon: "📚" },
  check_company_safety: { label: "기업 안전성 분석", icon: "🛡️" },
  check_wage_violations: { label: "임금체불 조회", icon: "💰" },
  search_safety_laws: { label: "안전법령 검색", icon: "⚖️" },
  generate_cover_letter: { label: "자기소개서 생성", icon: "📝" },
};

export function ToolCallCard({
  toolName,
  args,
  result,
}: {
  toolName: string;
  args: Record<string, unknown>;
  result?: unknown;
}) {
  const info = TOOL_LABELS[toolName] ?? {
    label: toolName,
    icon: "🔧",
  };

  return (
    <div className="my-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3 text-sm">
      <div className="flex items-center gap-2 font-medium">
        <span>{info.icon}</span>
        <span>{info.label}</span>
        {result == null ? (
          <span className="thinking-dots text-[var(--color-text-muted)]">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        ) : (
          <span className="text-xs text-green-600">✓ 완료</span>
        )}
      </div>
      {args && Object.keys(args).length > 0 && (
        <div className="mt-1 text-xs text-[var(--color-text-muted)]">
          {Object.entries(args)
            .filter(([, v]) => v)
            .map(([k, v]) => `${k}: ${v}`)
            .join(" · ")}
        </div>
      )}
    </div>
  );
}
