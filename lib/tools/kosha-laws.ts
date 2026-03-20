import { tool } from "ai";
import { z } from "zod";

/** 공공데이터포털 — 한국산업안전보건공단 안전보건법령 스마트검색 */
const KOSHA_BASE_URL =
  "https://apis.data.go.kr/B552468/srch/smartSearch";

/** 카테고리 코드 */
const CATEGORY_MAP: Record<string, string> = {
  전체: "0",
  산업안전보건법: "1",
  시행령: "2",
  시행규칙: "3",
  "기준 규칙": "4",
  "고시/훈령/예규": "5",
  미디어: "6",
  "KOSHA GUIDE": "7",
  중대재해처벌법: "8",
  "중대재해 시행령": "9",
  취업제한규칙: "10",
};

export const searchSafetyLaws = tool({
  description:
    "산업안전보건 관련 법령을 검색합니다 (한국산업안전보건공단 스마트검색). 법령명, 조항, 주제로 검색하며 산업안전보건법·중대재해처벌법·KOSHA GUIDE 등을 포함합니다.",
  inputSchema: z.object({
    query: z.string().describe("검색 키워드 (법령명, 조항, 주제 등)"),
    category: z
      .string()
      .default("전체")
      .describe(
        "카테고리 (전체, 산업안전보건법, 시행령, 시행규칙, 고시/훈령/예규, KOSHA GUIDE, 중대재해처벌법)",
      ),
  }),
  execute: async ({ query, category }) => {
    const apiKey = process.env.KOSHA_API_KEY ?? process.env.DATA_GO_KR_API_KEY ?? "";

    if (!apiKey) {
      return mockKoshaResponse(query);
    }

    const categoryCode = CATEGORY_MAP[category] ?? "0";

    const params = new URLSearchParams({
      serviceKey: apiKey,
      searchValue: query,
      category: categoryCode,
      numOfRows: "5",
      pageNo: "1",
    });

    try {
      const resp = await fetch(`${KOSHA_BASE_URL}?${params}`, {
        signal: AbortSignal.timeout(10000),
      });
      const data = await resp.json();

      const header = data?.response?.header ?? {};
      if (header.resultCode !== "00") {
        return mockKoshaResponse(query, `API 오류: ${header.resultMsg ?? "알 수 없음"}`);
      }

      let items = data?.response?.body?.items?.item ?? [];
      if (!Array.isArray(items)) items = [items];

      const laws = items
        .slice(0, 5)
        .map((item: Record<string, string>) => ({
          title: item.title ?? "",
          content: item.content ?? item.highlight_content ?? "",
          category: item.category ?? "",
          doc_id: item.doc_id ?? "",
          score: item.score ?? "",
        }));

      return {
        source: "한국산업안전보건공단 (안전보건법령 스마트검색)",
        total: laws.length,
        laws,
        query,
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
      content:
        "제5조 (사업주 등의 의무) — 사업주는 근로자의 안전 및 건강을 유지·증진시키고 국가의 산업재해 예방정책에 따라야 한다.",
      category: "산업안전보건법",
      doc_id: "",
      score: "",
    },
    {
      title: "중대재해 처벌 등에 관한 법률",
      content:
        "제4조 (사업주와 경영책임자등의 안전 및 보건 확보의무) — 사업주 또는 경영책임자등은 종사자의 안전·보건상 유해 또는 위험을 방지하기 위해 안전보건관리체계를 구축하여야 한다.",
      category: "중대재해처벌법",
      doc_id: "",
      score: "",
    },
  ];
  return {
    source: "한국산업안전보건공단 (안전보건법령 스마트검색)",
    total: mockLaws.length,
    laws: mockLaws,
    query,
    note: error
      ? `API 연동 전 데모 데이터 (에러: ${error})`
      : "API 키 미설정 — 데모 데이터",
  };
}
