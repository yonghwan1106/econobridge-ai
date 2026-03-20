"use client";

import { useState } from "react";
import type { UIMessage } from "ai";
import { ToolCallCard } from "@/components/agent-trace/tool-call-card";
import { renderToolResult } from "@/components/results/tool-result-renderer";

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
            const isDone = toolPart.state === "output-available";
            return (
              <ToolResultWrapper
                key={i}
                toolName={toolName}
                args={(toolPart.input as Record<string, unknown>) ?? {}}
                result={isDone ? toolPart.output : undefined}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

/** Wraps ToolCallCard + rich result with collapse toggle */
function ToolResultWrapper({
  toolName,
  args,
  result,
}: {
  toolName: string;
  args: Record<string, unknown>;
  result?: unknown;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const isDone = result != null;
  const richResult = isDone ? renderToolResult(toolName, result) : null;

  return (
    <div>
      <ToolCallCard toolName={toolName} args={args} result={result}>
        {isDone && richResult && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center gap-1 border-t border-[var(--color-border-light)] py-1.5 text-[11px] font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
          >
            {collapsed ? "▼ 결과 펼치기" : "▲ 결과 접기"}
          </button>
        )}
      </ToolCallCard>
      {isDone && richResult && !collapsed && (
        <div className="animate-fade-in">{richResult}</div>
      )}
    </div>
  );
}

// ── Regex constants (compiled once) ──
const RE_TABLE_LINE = /^\s*\|/;
const RE_BLOCKQUOTE = /^>\s?/;
const RE_LIST_ITEM = /^\s*- /;
const RE_SEPARATOR = /^\s*\|[\s\-:|]+\|\s*$/;
const RE_BOLD = /\*\*(.*?)\*\*/g;
const RE_H3 = /^### (.+)$/;
const RE_H2 = /^## (.+)$/;
const RE_H1 = /^# (.+)$/;
const RE_CODE = /`([^`]+)`/g;
const RE_HR = /^---$/;
const HR_HTML =
  '<hr style="border:none;border-top:1px solid var(--color-border);margin:0.8em 0"/>';

/** Escape HTML entities to prevent XSS */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Markdown text formatter with table, blockquote, and list support */
function formatMarkdown(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (RE_TABLE_LINE.test(line)) {
      const tableLines: string[] = [];
      while (i < lines.length && RE_TABLE_LINE.test(lines[i])) {
        tableLines.push(lines[i]);
        i++;
      }
      result.push(buildTable(tableLines));
      continue;
    }

    if (RE_BLOCKQUOTE.test(line)) {
      const content = line.replace(RE_BLOCKQUOTE, "").trim();
      result.push(
        `<div style="padding:2px 0 2px 12px;border-left:3px solid var(--color-primary);margin:2px 0">${content ? inlineFormat(escapeHtml(content)) : "&nbsp;"}</div>`
      );
      i++;
      continue;
    }

    if (RE_LIST_ITEM.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && RE_LIST_ITEM.test(lines[i])) {
        listItems.push(lines[i].replace(RE_LIST_ITEM, "").trim());
        i++;
      }
      result.push(
        "<ul>" +
          listItems
            .map((item) => `<li>${inlineFormat(escapeHtml(item))}</li>`)
            .join("") +
          "</ul>"
      );
      continue;
    }

    result.push(inlineFormat(escapeHtml(line)));
    i++;
  }

  return result.join("\n");
}

/** Inline formatting: bold, headers, code, hr */
function inlineFormat(line: string): string {
  return line
    .replace(RE_BOLD, "<strong>$1</strong>")
    .replace(RE_H3, "<h3>$1</h3>")
    .replace(RE_H2, "<h2>$1</h2>")
    .replace(RE_H1, "<h1>$1</h1>")
    .replace(RE_CODE, "<code>$1</code>")
    .replace(RE_HR, HR_HTML);
}

/** Build an HTML table from markdown table lines */
function buildTable(lines: string[]): string {
  const dataLines = lines.filter((l) => !RE_SEPARATOR.test(l));
  if (dataLines.length === 0) return "";

  const parseRow = (line: string) =>
    line
      .replace(/^\s*\|/, "")
      .replace(/\|\s*$/, "")
      .split("|")
      .map((cell) => cell.trim());

  const headerCells = parseRow(dataLines[0]);
  const bodyRows = dataLines.slice(1).map(parseRow);

  const parts: string[] = ["<table><thead><tr>"];
  for (const cell of headerCells) {
    parts.push(`<th>${inlineFormat(escapeHtml(cell))}</th>`);
  }
  parts.push("</tr></thead><tbody>");
  for (const row of bodyRows) {
    parts.push("<tr>");
    for (const cell of row) {
      parts.push(`<td>${inlineFormat(escapeHtml(cell))}</td>`);
    }
    parts.push("</tr>");
  }
  parts.push("</tbody></table>");
  return parts.join("");
}
