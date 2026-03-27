"use client";

import Link from "next/link";
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
      {/* Header — Dark navy brand bar */}
      <header className="flex items-center gap-3 px-5 py-3.5" style={{ background: "var(--color-ink)", borderBottom: "2px solid var(--color-primary)" }}>
        <button
          onClick={handleLogoClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold shadow-sm transition-transform hover:scale-105 active:scale-95"
          style={{ background: "var(--color-primary)", color: "var(--color-ink)" }}
          title="처음으로"
        >
          E
        </button>
        <button onClick={handleLogoClick} className="flex-1 text-left" title="처음으로">
          <h1 className="text-[16px] tracking-tight text-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
            <span style={{ color: "var(--color-primary)", fontStyle: "italic" }}>EconoBridge</span> AI
          </h1>
          <p className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,.45)" }}>
            공공데이터 기반 고용안전 자율 에이전트
          </p>
        </button>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: "rgba(255,140,66,.12)", color: "#ff8c42", border: "1px solid rgba(255,140,66,.25)" }}>
            🏆 제5회 공모전
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: "rgba(0,212,170,.1)", color: "var(--color-primary)", border: "1px solid rgba(0,212,170,.2)" }}>
            🔗 7개 API
          </span>
          <Link
            href="/demo"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all hover:scale-105"
            style={{ background: "var(--color-primary)", color: "var(--color-ink)" }}
          >
            ▶ Demo
          </Link>
        </div>
      </header>

      <ChatContainer />
    </main>
  );
}
