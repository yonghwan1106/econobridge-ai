import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EconoBridge AI — 고용안전 자율 에이전트",
  description:
    "공공데이터 기반 맞춤 채용정보 검색, 기업 안전성 분석, 훈련과정 추천을 제공하는 AI 에이전트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
