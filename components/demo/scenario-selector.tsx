"use client";

import type { DemoScenario } from "@/lib/demo/scenarios";

export function ScenarioSelector({
  scenarios,
  onSelect,
}: {
  scenarios: DemoScenario[];
  onSelect: (scenario: DemoScenario) => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-[var(--color-text)]">
          EconoBridge AI Demo
        </h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          시나리오를 선택하여 AI 에이전트의 자율 워크플로우를 확인하세요
        </p>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onSelect(scenario)}
            className="group flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-white p-5 text-left transition-all hover:border-[var(--color-primary)] hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-bg-secondary)] text-xl">
                {scenario.icon}
              </span>
              <h3 className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)]">
                {scenario.title}
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
              {scenario.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {scenario.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--color-bg-secondary)] px-2 py-0.5 text-[10px] text-[var(--color-text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
