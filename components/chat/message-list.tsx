"use client";

import { useEffect, useRef, useMemo } from "react";
import type { UIMessage } from "ai";
import { MessageBubble } from "./message-bubble";
import { ThinkingIndicator } from "@/components/agent-trace/thinking-indicator";
import { StepIndicator, toolNameToStep } from "@/components/agent-trace/step-indicator";

export function MessageList({
  messages,
  isLoading,
}: {
  messages: UIMessage[];
  isLoading: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Calculate current step from latest AI message tool calls
  const currentStep = useMemo(() => {
    if (!isLoading) return -1;
    const lastAi = [...messages].reverse().find((m) => m.role === "assistant");
    if (!lastAi) return 0;

    let maxStep = 0;
    for (const part of lastAi.parts) {
      if (part.type.startsWith("tool-") && part.type !== "tool-result") {
        const toolName = part.type.replace("tool-", "");
        const step = toolNameToStep(toolName);
        if (step > maxStep) maxStep = step;
      }
    }
    return maxStep;
  }, [messages, isLoading]);

  return (
    <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
      {messages.map((m, idx) => {
        const isLastAi = m.role === "assistant" && idx === messages.length - 1;
        return (
          <div key={m.id}>
            {/* Step indicator shown above streaming AI message */}
            {isLastAi && isLoading && currentStep >= 0 && (
              <StepIndicator step={currentStep} />
            )}
            <MessageBubble message={m} />
          </div>
        );
      })}
      {isLoading && <ThinkingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
