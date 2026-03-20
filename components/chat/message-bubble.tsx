"use client";

import type { UIMessage } from "ai";
import { ToolCallCard } from "@/components/agent-trace/tool-call-card";

export function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
          isUser
            ? "bg-[var(--color-primary)] text-white"
            : "bg-[var(--color-bg-secondary)] text-[var(--color-text)]"
        }`}
      >
        {message.parts.map((part, i) => {
          if (part.type === "text") {
            return (
              <div key={i} className="whitespace-pre-wrap">
                {part.text}
              </div>
            );
          }
          if (part.type.startsWith("tool-") && part.type !== "tool-result") {
            const toolPart = part as {
              type: string;
              toolCallId: string;
              state: string;
              input?: Record<string, unknown>;
              output?: unknown;
            };
            const toolName = part.type.replace("tool-", "");
            return (
              <ToolCallCard
                key={i}
                toolName={toolName}
                args={(toolPart.input as Record<string, unknown>) ?? {}}
                result={
                  toolPart.state === "output-available"
                    ? toolPart.output
                    : undefined
                }
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
