"use client";

import { SafetyBadge } from "./safety-badge";

interface SafetyData {
  company: string;
  safety_score: number;
  grade: string;
  grade_emoji: string;
  grade_label: string;
  accident_count: number;
  major_accident_count: number;
  death_count: number;
  wage_violation: boolean;
}

export function SafetyDetailCard({ data }: { data: SafetyData }) {
  const score = data.safety_score;
  const deductions = [
    { label: "산업재해", value: data.accident_count * 5, count: data.accident_count, icon: "🔧", color: "#d97706" },
    { label: "중대재해", value: data.major_accident_count * 15, count: data.major_accident_count, icon: "⚠️", color: "#ea580c" },
    { label: "사망사고", value: data.death_count * 25, count: data.death_count, icon: "💀", color: "#dc2626" },
    { label: "임금체불", value: data.wage_violation ? 10 : 0, count: data.wage_violation ? 1 : 0, icon: "💰", color: "#7c3aed" },
  ].filter((d) => d.value > 0);

  const gradeColor =
    data.grade === "A" ? "#059669" :
    data.grade === "B" ? "#d97706" :
    data.grade === "C" ? "#ea580c" : "#dc2626";

  return (
    <div className="my-2 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border-light)] bg-gradient-to-r from-slate-50 to-white px-4 py-3">
        <div>
          <h4 className="text-[14px] font-bold text-[var(--color-text)]">
            🛡️ {data.company} 안전성 분석
          </h4>
          <p className="mt-0.5 text-[11px] text-[var(--color-text-muted)]">
            근로복지공단 + 고용노동부 교차 분석
          </p>
        </div>
        <SafetyBadge
          grade={data.grade}
          score={score}
          label={data.grade_label}
          emoji={data.grade_emoji}
        />
      </div>

      {/* Gauge + Deductions */}
      <div className="flex gap-6 px-4 py-4">
        {/* Circular Gauge */}
        <div className="flex flex-col items-center">
          <div
            className="safety-gauge relative flex h-[100px] w-[100px] items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(${gradeColor} ${score * 3.6}deg, #e2e8f0 ${score * 3.6}deg)`,
            }}
          >
            <div className="flex h-[78px] w-[78px] flex-col items-center justify-center rounded-full bg-white">
              <span className="text-[22px] font-extrabold" style={{ color: gradeColor }}>
                {score}
              </span>
              <span className="text-[10px] font-medium text-[var(--color-text-muted)]">/ 100</span>
            </div>
          </div>
          <span
            className="mt-2 rounded-full px-3 py-0.5 text-[11px] font-bold"
            style={{ background: `${gradeColor}12`, color: gradeColor }}
          >
            {data.grade}등급 · {data.grade_label}
          </span>
        </div>

        {/* Deduction bars */}
        {deductions.length > 0 ? (
          <div className="flex flex-1 flex-col justify-center gap-2.5">
            <p className="text-[11px] font-semibold text-[var(--color-text-muted)]">감점 내역</p>
            {deductions.map((d) => (
              <div key={d.label} className="flex items-center gap-2">
                <span className="w-14 text-[11px] font-medium text-[var(--color-text-secondary)]">
                  {d.icon} {d.label}
                </span>
                <div className="flex-1">
                  <div className="h-2.5 overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min((d.value / 50) * 100, 100)}%`,
                        background: d.color,
                      }}
                    />
                  </div>
                </div>
                <span className="w-12 text-right text-[11px] font-bold" style={{ color: d.color }}>
                  -{d.value}점
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-[13px] font-medium text-green-600">
              감점 내역이 없습니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
