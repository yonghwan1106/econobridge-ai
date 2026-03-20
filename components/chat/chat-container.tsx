"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { SuggestedQueries } from "./suggested-queries";

const API_BADGES = [
  "고용24", "장애인고용공단", "HRD-Net", "근로복지공단", "고용노동부", "안전보건공단", "AI 자소서",
];

export function ChatContainer() {
  const { messages, sendMessage, status, setMessages } = useChat();
  const [input, setInput] = useState("");

  const isLoading = status === "streaming" || status === "submitted";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage({ text });
  };

  const handleSuggestion = (query: string) => {
    if (isLoading) return;
    sendMessage({ text: query });
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-full flex-col">
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f6fde] to-[#0b4f9e] text-2xl font-bold text-white shadow-lg">
              E
            </div>
            <h2 className="mb-1.5 text-xl font-extrabold tracking-tight text-[var(--color-text)]">
              무엇을 도와드릴까요?
            </h2>
            <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">
              채용정보 검색 · 기업 안전성 분석 · 훈련과정 추천을
              <br />
              하나의 대화로 해결합니다
            </p>
            {/* API badges */}
            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {API_BADGES.map((name) => (
                <span
                  key={name}
                  className="rounded-full bg-[var(--color-primary-dim)] px-2.5 py-1 text-[10px] font-semibold text-[var(--color-primary)] border border-[var(--color-primary)]/10"
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="mt-2 text-[11px] font-medium text-[var(--color-text-muted)]">
              7개 공공데이터 API 연동 · 에이전틱 AI 자율 분석
            </p>
          </div>
          <SuggestedQueries onSelect={handleSuggestion} />
        </div>
      ) : (
        <MessageList messages={messages} isLoading={isLoading} />
      )}

      <div className="border-t border-[var(--color-border)] bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleNewChat}
              disabled={isLoading}
              className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-text-muted)] transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-40"
              title="새 대화"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
          <div className="flex-1">
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
