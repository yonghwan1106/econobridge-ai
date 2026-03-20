"use client";

import type { UIMessage } from "ai";
import { ToolCallCard } from "@/components/agent-trace/tool-call-card";

export function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`animate-fade-in flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="mr-2.5 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#0f6fde] to-[#0b4f9e] text-[11px] font-bold text-white">
          E
        </div>
      )}

      <div
        className={`max-w-[82%] text-[14px] leading-relaxed ${
          isUser
            ? "rounded-2xl rounded-tr-md bg-gradient-to-br from-[#0f6fde] to-[#1a7aef] px-4 py-2.5 text-white shadow-sm"
            : "ai-prose"
        }`}
      >
        {message.parts.map((part, i) => {
          if (part.type === "text") {
            if (isUser) {
              return (
                <div key={i} className="whitespace-pre-wrap">
                  {part.text}
                </div>
              );
            }
            // AI: render with markdown-like formatting via dangerouslySetInnerHTML
            return (
              <div
                key={i}
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: formatMarkdown(part.text),
                }}
              />
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

/** Simple markdown-like text formatter */
function formatMarkdown(text: string): string {
  return text
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--color-border);margin:0.8em 0"/>')
    // Emoji bullets (keep as-is, they render nicely)
    ;
}
