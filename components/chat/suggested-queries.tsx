"use client";

const SUGGESTIONS = [
  "경기도에서 IT 웹개발자 채용 찾아줘",
  "장애인 채용 사무직 서울 검색해줘",
  "청년 대상 데이터 분석 훈련과정 추천해줘",
  "B소프트 기업 안전성 확인해줘",
];

export function SuggestedQueries({
  onSelect,
}: {
  onSelect: (query: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUGGESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)]"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
