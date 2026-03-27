"use client";

import { useState, useEffect, useRef } from "react";
import type { DagState } from "@/lib/dag/types";
import { DagView } from "./dag-view";

export function DagPanel({
  dagState,
  isRunning,
}: {
  dagState: DagState;
  isRunning: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);

  // Elapsed timer
  useEffect(() => {
    if (isRunning && !startRef.current) {
      startRef.current = Date.now();
    }
    if (!isRunning && startRef.current) {
      startRef.current = null;
      return;
    }
    if (!isRunning) return;

    const timer = setInterval(() => {
      if (startRef.current) {
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  const completedCount = dagState.nodes.filter(
    (n) => n.status === "complete"
  ).length;
  const activeCount = dagState.nodes.filter(
    (n) => n.status !== "skipped"
  ).length;
  const progress = activeCount > 0 ? (completedCount / activeCount) * 100 : 0;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}분 ${sec}초` : `${sec}초`;
  };

  return (
    <div className="flex flex-col rounded-xl border border-[var(--color-border)] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[var(--color-text)]">
            에이전트 워크플로우
          </span>
          {isRunning && (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs" style={{ background: "var(--color-primary-dim)", color: "var(--color-primary)" }}>
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: "var(--color-primary)" }} />
              실행 중
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {elapsed > 0 && (
            <span className="text-xs text-[var(--color-text-muted)]">
              {formatTime(elapsed)}
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] md:hidden"
          >
            {collapsed ? "펼치기" : "접기"}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-100">
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{
            width: `${progress}%`,
            background:
              progress >= 100
                ? "var(--color-safe)"
                : "var(--color-primary)",
          }}
        />
      </div>

      {/* DAG visualization */}
      {!collapsed && (
        <div className="flex-1 px-2 py-3">
          <DagView dagState={dagState} />
        </div>
      )}

      {/* Legend */}
      {!collapsed && (
        <div className="flex flex-wrap gap-3 border-t border-[var(--color-border)] px-4 py-2">
          {[
            { color: "#E2E8F0", label: "대기" },
            { color: "#00d4aa", label: "실행 중" },
            { color: "#059669", label: "완료" },
            { color: "#F1F5F9", label: "건너뜀", muted: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full border"
                style={{
                  backgroundColor: item.color,
                  borderColor: item.muted ? "#CBD5E1" : item.color,
                  opacity: item.muted ? 0.5 : 1,
                }}
              />
              <span className="text-[10px] text-[var(--color-text-muted)]">
                {item.label}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block h-0 w-4 border-t-2 border-dashed"
              style={{ borderColor: "#CBD5E1" }}
            />
            <span className="text-[10px] text-[var(--color-text-muted)]">
              조건부
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
