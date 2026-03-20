"use client";

interface LawItem {
  title: string;
  content: string;
  category?: string;
}

interface LawData {
  total: number;
  laws: LawItem[];
  query: string;
}

export function LawCard({ data }: { data: LawData }) {
  return (
    <div className="my-2 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
      <div className="flex items-center justify-between border-b border-[var(--color-border-light)] bg-gradient-to-r from-indigo-50 to-white px-4 py-3">
        <div>
          <h4 className="text-[14px] font-bold text-[var(--color-text)]">
            ⚖️ 안전보건법령 검색결과
          </h4>
          <p className="mt-0.5 text-[11px] text-[var(--color-text-muted)]">
            "{data.query}" · {data.total}건
          </p>
        </div>
      </div>
      <div className="divide-y divide-[var(--color-border-light)]">
        {data.laws.map((law, i) => (
          <div key={i} className="px-4 py-3">
            <div className="flex items-center gap-2">
              <h5 className="text-[13px] font-bold text-[var(--color-text)]">{law.title}</h5>
              {law.category && (
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 border border-indigo-200">
                  {law.category}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
              {law.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
