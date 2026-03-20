"use client";

const SUGGESTIONS = [
  { icon: "💼", text: "경기도에서 IT 웹개발자 채용 찾아줘" },
  { icon: "♿", text: "장애인 채용 사무직 서울 검색해줘" },
  { icon: "📚", text: "청년 대상 데이터 분석 훈련과정 추천해줘" },
  { icon: "🛡️", text: "B소프트 기업 안전성 확인해줘" },
];

export function SuggestedQueries({
  onSelect,
}: {
  onSelect: (query: string) => void;
}) {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-2">
      {SUGGESTIONS.map((q) => (
        <button
          key={q.text}
          onClick={() => onSelect(q.text)}
          className="group flex items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-white p-3 text-left text-[13px] leading-snug text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-primary)] hover:shadow-md"
          style={{ "--color-text-secondary": "#475569" } as React.CSSProperties}
        >
          <span className="mt-0.5 text-base">{q.icon}</span>
          <span className="group-hover:text-[var(--color-primary)]">{q.text}</span>
        </button>
      ))}
    </div>
  );
}
