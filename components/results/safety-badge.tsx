"use client";

const GRADE_COLORS: Record<string, string> = {
  A: "bg-green-100 text-green-800 border-green-300",
  B: "bg-yellow-100 text-yellow-800 border-yellow-300",
  C: "bg-orange-100 text-orange-800 border-orange-300",
  D: "bg-red-100 text-red-800 border-red-300",
};

export function SafetyBadge({
  grade,
  score,
  label,
  emoji,
}: {
  grade: string;
  score: number;
  label: string;
  emoji: string;
}) {
  const colorClass = GRADE_COLORS[grade] ?? GRADE_COLORS.B;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${colorClass}`}
    >
      {emoji} {grade}등급 · {score}점 · {label}
    </span>
  );
}
