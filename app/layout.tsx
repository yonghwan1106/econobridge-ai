import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EconoBridge AI — 고용안전 자율 에이전트",
  description:
    "공공데이터 기반 맞춤 채용정보 검색, 기업 안전성 분석, 훈련과정 추천을 제공하는 AI 에이전트",
  openGraph: {
    title: "EconoBridge AI — 고용안전 자율 에이전트",
    description:
      "7개 공공데이터 API를 활용한 맞춤 채용정보 검색, 기업 안전성 분석, 훈련과정 추천 AI 에이전트",
    type: "website",
    locale: "ko_KR",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌉</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
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
