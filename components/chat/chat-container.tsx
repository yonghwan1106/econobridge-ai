"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { SuggestedQueries } from "./suggested-queries";

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

  return (
    <div className="flex h-full flex-col">
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-[var(--color-text)]">
              EconoBridge AI
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              공공데이터 기반 맞춤 채용정보 검색 · 기업 안전성 분석 · 훈련과정
              추천
            </p>
          </div>
          <SuggestedQueries onSelect={handleSuggestion} />
        </div>
      ) : (
        <MessageList messages={messages} isLoading={isLoading} />
      )}
      <div className="border-t border-[var(--color-border)] bg-white p-4">
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
