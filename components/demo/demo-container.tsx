"use client";

import { useState, useMemo, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
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
  const [activeScenario, setActiveScenario] = useState<DemoScenario | null>(
    null
  );
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, setMessages } = useChat();
  const isLoading = status === "streaming" || status === "submitted";

  const dagState = useMemo(
    () =>
      messages.length > 0 ? messagesToDagState(messages) : createInitialDagState(),
    [messages]
  );

  const handleScenarioSelect = useCallback(
    (scenario: DemoScenario) => {
      setActiveScenario(scenario);
      sendMessage({ text: scenario.initialMessage });
    },
    [sendMessage]
  );

  const handleReset = useCallback(() => {
    setActiveScenario(null);
    setInput("");
    setMessages([]);
  }, [setMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage({ text });
  };

  // Scenario selection view
  if (!activeScenario) {
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

  // Active demo view: DAG + Chat
  return (
    <div className="flex h-full flex-col">
      <DemoHeader onReset={handleReset} />
      <div className="grid flex-1 grid-cols-1 overflow-hidden md:grid-cols-[2fr_3fr]">
        {/* DAG Panel */}
        <div className="overflow-y-auto border-b border-[var(--color-border)] p-4 md:border-b-0 md:border-r">
          <DagPanel dagState={dagState} isRunning={isLoading} />
        </div>

        {/* Chat Panel */}
        <div className="flex min-h-0 flex-col">
          <MessageList messages={messages} isLoading={isLoading} />
          <div className="border-t border-[var(--color-border)] bg-white p-4">
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
