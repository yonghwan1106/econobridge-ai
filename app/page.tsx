import { ChatContainer } from "@/components/chat/chat-container";

export default function Home() {
  return (
    <main
      className="mx-auto flex h-dvh max-w-3xl flex-col bg-white"
      style={{ boxShadow: "0 0 0 1px var(--color-border)" }}
    >
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-3.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f6fde] to-[#0b4f9e] text-lg font-bold text-white shadow-sm">
          E
        </div>
        <div className="flex-1">
          <h1 className="text-[15px] font-extrabold tracking-tight text-[var(--color-text)]">
            EconoBridge AI
          </h1>
          <p className="text-[11px] font-medium text-[var(--color-text-muted)]">
            공공데이터 기반 고용안전 자율 에이전트
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-700 border border-green-200">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          온라인
        </div>
      </header>

      <ChatContainer />
    </main>
  );
}
