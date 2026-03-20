"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { SuggestedQueries } from "./suggested-queries";

export function ChatContainer() {
  const { messages, sendMessage, status } = useChat();
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

  return (
    <div className="flex h-full flex-col">
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
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
          </div>
          <SuggestedQueries onSelect={handleSuggestion} />
        </div>
      ) : (
        <MessageList messages={messages} isLoading={isLoading} />
      )}

      <div className="border-t border-[var(--color-border)] bg-white px-4 py-3">
        <ChatInput
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
