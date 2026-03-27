import { Suspense } from "react";
import { DemoContainer } from "@/components/demo/demo-container";

export const metadata = {
  title: "EconoBridge AI Demo — DAG 워크플로우",
  description:
    "AI 에이전트의 자율 워크플로우를 DAG 시각화로 실시간 확인하세요",
};

export default function DemoPage() {
  return (
    <main className="h-dvh">
      <Suspense>
        <DemoContainer />
      </Suspense>
    </main>
  );
}
