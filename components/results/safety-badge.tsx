"use client";

const GRADE_STYLES: Record<string, { bg: string; text: string; border: string; ring: string }> = {
  A: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", ring: "ring-emerald-500/20" },
  B: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", ring: "ring-yellow-500/20" },
  C: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", ring: "ring-orange-500/20" },
  D: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", ring: "ring-red-500/20" },
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
  const s = GRADE_STYLES[grade] ?? GRADE_STYLES.B;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-bold ring-2 ${s.bg} ${s.text} ${s.border} ${s.ring}`}
    >
      <span className="text-sm">{emoji}</span>
      <span className="text-[14px]">{grade}</span>
      <span className="font-normal opacity-60">|</span>
      <span>{score}점</span>
      <span className="font-normal opacity-60">|</span>
      <span>{label}</span>
    </span>
  );
}
