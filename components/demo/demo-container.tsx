"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { useSearchParams } from "next/navigation";
import type { DemoScenario } from "@/lib/demo/scenarios";
import { DEMO_SCENARIOS } from "@/lib/demo/scenarios";
import { messagesToDagState } from "@/lib/dag/message-bridge";
import { createInitialDagState } from "@/lib/dag/templates";
import { DagPanel } from "@/components/dag/dag-panel";
import { DemoHeader } from "./demo-header";
import { ScenarioSelector } from "./scenario-selector";
import { MessageList } from "@/components/chat/message-list";
import { ChatInput } from "@/components/chat/chat-input";

export function DemoContainer() {
  const searchParams = useSearchParams();
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState("");
  const autoStartedRef = useRef(false);

  const { messages, sendMessage, status, setMessages } = useChat();
  const isLoading = status === "streaming" || status === "submitted";

  const dagState = useMemo(
    () =>
      messages.length > 0
        ? messagesToDagState(messages)
        : createInitialDagState(),
    [messages]
  );

  // Auto-start from ?q= parameter (home page redirect)
  useEffect(() => {
    if (autoStartedRef.current) return;
    const q = searchParams.get("q");
    if (q) {
      autoStartedRef.current = true;
      setStarted(true);
      sendMessage({ text: q });
    }
  }, [searchParams, sendMessage]);

  const handleScenarioSelect = useCallback(
    (scenario: DemoScenario) => {
      setStarted(true);
      sendMessage({ text: scenario.initialMessage });
    },
    [sendMessage]
  );

  const handleReset = useCallback(() => {
    setStarted(false);
    setInput("");
    setMessages([]);
    // Clear query param
    window.history.replaceState({}, "", "/demo");
  }, [setMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    if (!started) setStarted(true);
    sendMessage({ text });
  };

  // Scenario selection view
  if (!started) {
    return (
      <div className="flex h-full flex-col">
        <DemoHeader onReset={handleReset} />
        <ScenarioSelector
          scenarios={DEMO_SCENARIOS}
          onSelect={handleScenarioSelect}
        />
      </div>
    );
  }

  // Active demo view: fixed DAG sidebar + scrollable chat
  return (
    <div className="flex h-full flex-col">
      <DemoHeader onReset={handleReset} />

      <div className="flex flex-1 overflow-hidden">
        {/* ── Left: DAG + Process panel (fixed, 35% width) ── */}
        <aside
          className="hidden shrink-0 flex-col border-r border-[var(--color-border)] md:flex"
          style={{ width: "35%", background: "var(--color-bg)" }}
        >
          {/* DAG Workflow */}
          <div className="flex-1 overflow-y-auto p-4">
            <DagPanel dagState={dagState} isRunning={isLoading} />
          </div>

          {/* Process Steps Log */}
          <div
            className="border-t border-[var(--color-border)] overflow-y-auto"
            style={{ maxHeight: "35%" }}
          >
            <div className="px-4 py-3">
              <h3
                className="mb-2 text-[11px] font-bold uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
              >
                작업 프로세스
              </h3>
              <div className="space-y-1.5">
                {dagState.nodes
                  .filter((n) => n.status !== "idle" && n.status !== "skipped")
                  .map((node) => (
                    <div
                      key={node.id}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px]"
                      style={{
                        background:
                          node.status === "running"
                            ? "var(--color-primary-dim)"
                            : node.status === "complete"
                              ? "var(--color-safe-bg)"
                              : "var(--color-bg-secondary)",
                      }}
                    >
                      {/* Status indicator */}
                      {node.status === "running" ? (
                        <span
                          className="inline-block h-2 w-2 rounded-full pulse-ring"
                          style={{ background: "var(--color-primary)" }}
                        />
                      ) : node.status === "complete" ? (
                        <span className="text-[11px] font-bold" style={{ color: "var(--color-safe)" }}>
                          ✓
                        </span>
                      ) : (
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{ background: "var(--color-border)" }}
                        />
                      )}
                      <span className="mr-1">{node.icon}</span>
                      <span
                        className="flex-1 font-semibold"
                        style={{
                          color:
                            node.status === "running"
                              ? "var(--color-text)"
                              : node.status === "complete"
                                ? "var(--color-text)"
                                : "var(--color-text-muted)",
                        }}
                      >
                        {node.label}
                      </span>
                      {node.status === "running" && (
                        <span className="thinking-dots font-bold" style={{ color: "var(--color-primary)" }}>
                          <span>.</span><span>.</span><span>.</span>
                        </span>
                      )}
                      {node.status === "complete" && node.completedAt && node.startedAt && (
                        <span className="text-[10px] font-medium text-[var(--color-text-muted)]">
                          {((node.completedAt - node.startedAt) / 1000).toFixed(1)}s
                        </span>
                      )}
                    </div>
                  ))}
                {dagState.nodes.every((n) => n.status === "idle") && (
                  <div className="py-2 text-center text-[12px] text-[var(--color-text-muted)]">
                    시나리오 실행 대기 중...
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Mobile: collapsible DAG (shown above chat) ── */}
        <MobileDagDrawer dagState={dagState} isLoading={isLoading} />

        {/* ── Right: Chat results (scrolls independently) ── */}
        <div className="flex min-w-0 flex-1 flex-col">
          <MessageList messages={messages} isLoading={isLoading} />
          <div
            className="border-t border-[var(--color-border)] p-4"
            style={{ background: "var(--color-bg-chat)" }}
          >
            <ChatInput
              input={input}
              setInput={setInput}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile-only collapsible DAG drawer */
function MobileDagDrawer({
  dagState,
  isLoading,
}: {
  dagState: ReturnType<typeof createInitialDagState>;
  isLoading: boolean;
}) {
  const [open, setOpen] = useState(false);
  const activeSteps = dagState.nodes.filter(
    (n) => n.status !== "idle" && n.status !== "skipped"
  );
  const completedCount = dagState.nodes.filter((n) => n.status === "complete").length;
  const totalActive = dagState.nodes.filter((n) => n.status !== "skipped").length;

  return (
    <div className="border-b border-[var(--color-border)] md:hidden" style={{ background: "var(--color-bg)" }}>
      {/* Toggle bar */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-2.5"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--color-text)]">
            워크플로우
          </span>
          {isLoading && (
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ background: "var(--color-primary)" }}
            />
          )}
          <span className="text-[10px] text-[var(--color-text-muted)]">
            {completedCount}/{totalActive}
          </span>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className={`text-[var(--color-text-muted)] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M3.5 5.25L7 8.75L10.5 5.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Progress bar */}
      <div className="h-0.5 w-full" style={{ background: "var(--color-border)" }}>
        <div
          className="h-full transition-all duration-700"
          style={{
            width: `${totalActive > 0 ? (completedCount / totalActive) * 100 : 0}%`,
            background: completedCount === totalActive && totalActive > 0
              ? "var(--color-safe)"
              : "var(--color-primary)",
          }}
        />
      </div>

      {/* Expandable content */}
      {open && (
        <div className="max-h-[50vh] overflow-y-auto px-4 py-3">
          <DagPanel dagState={dagState} isRunning={isLoading} />
          {activeSteps.length > 0 && (
            <div className="mt-3 space-y-1">
              {activeSteps.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center gap-2 text-xs"
                >
                  {node.status === "complete" ? (
                    <span style={{ color: "var(--color-safe)" }}>✓</span>
                  ) : node.status === "running" ? (
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full pulse-ring"
                      style={{ background: "var(--color-primary)" }}
                    />
                  ) : (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-300" />
                  )}
                  <span>{node.icon}</span>
                  <span className="text-[var(--color-text-muted)]">{node.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
