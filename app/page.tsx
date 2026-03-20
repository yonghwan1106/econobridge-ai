"use client";

import { ChatContainer } from "@/components/chat/chat-container";

export default function Home() {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <main
      className="mx-auto flex h-dvh max-w-3xl flex-col bg-white"
      style={{ boxShadow: "0 0 0 1px var(--color-border)" }}
    >
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-3.5">
        <button
          onClick={handleLogoClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f6fde] to-[#0b4f9e] text-lg font-bold text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
          title="처음으로"
        >
          E
        </button>
        <button onClick={handleLogoClick} className="flex-1 text-left" title="처음으로">
          <h1 className="text-[15px] font-extrabold tracking-tight text-[var(--color-text)]">
            EconoBridge AI
          </h1>
          <p className="text-[11px] font-medium text-[var(--color-text-muted)]">
            공공데이터 기반 고용안전 자율 에이전트
          </p>
        </button>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700 border border-amber-200">
            🏆 제5회 고용노동 공공데이터·AI 공모전
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 border border-blue-200">
            🔗 7개 API
          </span>
          <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-700 border border-green-200">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            온라인
          </div>
        </div>
      </header>

      <ChatContainer />
    </main>
  );
}
