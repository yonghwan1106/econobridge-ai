import { ChatContainer } from "@/components/chat/chat-container";

export default function Home() {
  return (
    <main className="mx-auto flex h-dvh max-w-3xl flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)] text-lg text-white">
          E
        </div>
        <div>
          <h1 className="text-base font-bold text-[var(--color-text)]">
            EconoBridge AI
          </h1>
          <p className="text-xs text-[var(--color-text-muted)]">
            고용안전 자율 에이전트
          </p>
        </div>
      </header>

      {/* Chat */}
      <ChatContainer />
    </main>
  );
}
