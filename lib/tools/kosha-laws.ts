import { tool } from "ai";
import { z } from "zod";

const KOSHA_BASE_URL = "http://openapi.kosha.or.kr/api/lawSearch";

export const searchSafetyLaws = tool({
  description:
    "산업안전보건 관련 법령을 검색합니다 (한국산업안전보건공단). 법령명, 조항, 주제로 검색합니다.",
  inputSchema: z.object({
    query: z.string().describe("검색 키워드 (법령명, 조항, 주제 등)"),
  }),
  execute: async ({ query }) => {
    const apiKey = process.env.KOSHA_API_KEY ?? "";

    if (!apiKey) {
      return mockKoshaResponse(query);
    }

    const params = new URLSearchParams({
      serviceKey: apiKey,
      searchWord: query,
      numOfRows: "5",
      pageNo: "1",
    });

    try {
      const resp = await fetch(`${KOSHA_BASE_URL}?${params}`, {
        signal: AbortSignal.timeout(10000),
      });
      const data = await resp.json();

      let items = data?.response?.body?.items ?? [];
      if (!Array.isArray(items)) items = [items];

      const laws = items
        .slice(0, 5)
        .map((item: Record<string, string>) => ({
          title: item.lawNm ?? "",
          article: item.articleNo ?? "",
          content: item.content ?? "",
          enforcement_date: item.enforceDt ?? "",
        }));

      return {
        source: "한국산업안전보건공단",
        total: laws.length,
        laws,
      };
    } catch (e) {
      return mockKoshaResponse(query, String(e));
    }
  },
});

function mockKoshaResponse(query: string, error?: string) {
  const mockLaws = [
    {
      title: "산업안전보건법",
      article: "제5조 (사업주 등의 의무)",
      content:
        "사업주는 근로자의 안전 및 건강을 유지·증진시키고 국가의 산업재해 예방정책에 따라야 한다.",
      enforcement_date: "2024-01-01",
    },
    {
      title: "중대재해 처벌 등에 관한 법률",
      article: "제4조 (사업주와 경영책임자등의 안전 및 보건 확보의무)",
      content:
        "사업주 또는 경영책임자등은 사업주나 법인 또는 기관이 실질적으로 지배·운영·관리하는 사업 또는 사업장에서 종사자의 안전·보건상 유해 또는 위험을 방지하기 위해 안전보건관리체계를 구축하여야 한다.",
      enforcement_date: "2024-01-27",
    },
  ];
  return {
    source: "한국산업안전보건공단",
    total: mockLaws.length,
    laws: mockLaws,
    query,
    note: error
      ? `API 연동 전 데모 데이터 (에러: ${error})`
      : "API 키 미설정 — 데모 데이터",
  };
}
