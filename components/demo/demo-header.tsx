"use client";

import Link from "next/link";

export function DemoHeader({ onReset }: { onReset: () => void }) {
  return (
    <header
      className="flex items-center justify-between px-5 py-3"
      style={{ background: "var(--color-ink)", borderBottom: "2px solid var(--color-primary)" }}
    >
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[11px] font-medium transition-colors"
          style={{ color: "rgba(255,255,255,.5)" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          홈
        </Link>
        <div className="h-4 w-px" style={{ background: "rgba(255,255,255,.15)" }} />
        <h1 className="text-sm font-semibold text-white">
          <span style={{ color: "var(--color-primary)", fontStyle: "italic" }}>EconoBridge</span> AI Demo
        </h1>
      </div>
      <button
        onClick={onReset}
        className="rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all hover:scale-105"
        style={{
          background: "rgba(255,255,255,.08)",
          color: "rgba(255,255,255,.7)",
          border: "1px solid rgba(255,255,255,.12)",
        }}
      >
        새 시나리오
      </button>
    </header>
  );
}
