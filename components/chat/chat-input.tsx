"use client";

import { useRef, type FormEvent } from "react";

export function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
}: {
  input: string;
  setInput: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
          }
        }}
        placeholder="궁금한 채용정보나 기업 안전성을 물어보세요..."
        rows={1}
        className="flex-1 resize-none rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)] disabled:opacity-50"
      >
        {isLoading ? "분석 중..." : "전송"}
      </button>
    </form>
  );
}
