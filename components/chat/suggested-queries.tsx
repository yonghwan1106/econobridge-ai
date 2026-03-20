"use client";

const SUGGESTIONS = [
  // 기본 검색
  { icon: "💼", text: "경기도에서 IT 웹개발자 채용 찾아줘", category: "직장인" },
  { icon: "♿", text: "장애인 채용 사무직 서울 검색해줘", category: "장애인 구직자" },
  { icon: "📚", text: "청년 대상 데이터 분석 훈련과정 추천해줘", category: "취준생" },
  { icon: "🛡️", text: "B소프트 기업 안전성 확인해줘", category: "안전 확인" },
  // 다중 도구 체이닝
  { icon: "🔍", text: "F건설 안전점수와 임금체불 이력 같이 확인해줘", category: "심층 분석" },
  { icon: "📝", text: "A테크 웹개발자로 자기소개서 써줘", category: "자기소개서" },
  // 복합 시나리오
  { icon: "🏢", text: "서울 경기 사무직 채용 찾고 기업 안전성도 분석해줘", category: "종합 추천" },
  { icon: "⚖️", text: "추락사고 관련 산업안전보건법 조항 검색해줘", category: "법령 검색" },
];

export function SuggestedQueries({
  onSelect,
}: {
  onSelect: (query: string) => void;
}) {
  return (
    <div className="grid w-full max-w-lg grid-cols-2 gap-2">
      {SUGGESTIONS.map((q) => (
        <button
          key={q.text}
          onClick={() => onSelect(q.text)}
          className="group flex items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-white p-3 text-left text-[13px] leading-snug text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-primary)] hover:shadow-md"
          style={{ "--color-text-secondary": "#475569" } as React.CSSProperties}
        >
          <span className="mt-0.5 text-base">{q.icon}</span>
          <div className="flex-1">
            <span className="group-hover:text-[var(--color-primary)]">{q.text}</span>
            <span className="mt-1 block text-[10px] font-medium text-[var(--color-text-muted)]">
              {q.category}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
