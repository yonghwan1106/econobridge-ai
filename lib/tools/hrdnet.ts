import { tool } from "ai";
import { z } from "zod";
import {
  KEAD_REGION_CODES,
  findRegionCode,
} from "@/lib/constants/region-codes";

/** 고용24 HRD-Net 훈련과정 API (구 hrd.go.kr) */
const HRDNET_BASE_URL =
  "https://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo310L01.do";

export const searchTrainingCourses = tool({
  description:
    "HRD-Net에서 직업훈련과정을 검색합니다 (한국산업인력공단). K-디지털, 국민내일배움카드 등 국비지원 훈련과정을 검색합니다.",
  inputSchema: z.object({
    keyword: z.string().describe("검색 키워드 (훈련분야, 기술명)"),
    region: z.string().default("").describe("훈련 희망지역 (예: 서울, 경기)"),
    training_type: z
      .string()
      .default("")
      .describe("훈련 유형 (K-디지털, 국민내일배움카드 등)"),
  }),
  execute: async ({ keyword, region }) => {
    const apiKey = process.env.HRDNET_API_KEY ?? "";

    if (!apiKey) {
      return mockHrdnetResponse(keyword, region);
    }

    const params = new URLSearchParams({
      authKey: apiKey,
      returnType: "JSON",
      srchKwd1: keyword,
      outType: "1",
      pageSize: "10",
      pageNum: "1",
    });

    const regionCode = findRegionCode(region, KEAD_REGION_CODES);
    if (regionCode) params.set("srchTraArea1", regionCode);

    try {
      const resp = await fetch(`${HRDNET_BASE_URL}?${params}`, {
        signal: AbortSignal.timeout(10000),
      });
      const data = await resp.json();

      let coursesRaw =
        data?.returnJSON?.srchList ?? data?.srchList ?? [];

      const courses = coursesRaw
        .slice(0, 10)
        .map((item: Record<string, string>) => ({
          title: item.trprNm ?? "",
          institution: item.inoNm ?? item.instNm ?? "",
          region: item.address ?? "",
          duration: item.trprDegr ?? "",
          start_date: item.trStDt ?? "",
          end_date: item.trEndDt ?? "",
          cost: item.courseMan ?? "국비지원",
          training_type: item.trainTarget ?? "",
        }));

      return {
        source: "HRD-Net (한국산업인력공단)",
        total: courses.length,
        courses,
      };
    } catch (e) {
      return mockHrdnetResponse(keyword, region, String(e));
    }
  },
});

function mockHrdnetResponse(keyword: string, region: string, error?: string) {
  const mockCourses = [
    {
      title: `[K-디지털] ${keyword} 실무 부트캠프`,
      institution: "○○직업전문학교",
      region: region || "경기 성남시",
      duration: "6개월 (960시간)",
      start_date: "2026-05-01",
      end_date: "2026-10-31",
      cost: "전액 국비지원",
      training_type: "K-디지털 트레이닝",
    },
    {
      title: `${keyword} 기초과정 (국민내일배움카드)`,
      institution: "△△교육센터",
      region: region || "경기 수원시",
      duration: "3개월 (480시간)",
      start_date: "2026-06-01",
      end_date: "2026-08-31",
      cost: "자비부담 약 10%",
      training_type: "국민내일배움카드",
    },
    {
      title: `실전 ${keyword} 프로젝트 과정`,
      institution: "□□IT아카데미",
      region: region || "서울 강남구",
      duration: "4개월 (640시간)",
      start_date: "2026-07-01",
      end_date: "2026-10-31",
      cost: "전액 국비지원",
      training_type: "K-디지털 트레이닝",
    },
  ];
  return {
    source: "HRD-Net (한국산업인력공단)",
    total: mockCourses.length,
    courses: mockCourses,
    note: error
      ? `API 연동 전 데모 데이터 (에러: ${error})`
      : "API 키 미설정 — 데모 데이터",
  };
}
