import { tool } from "ai";
import { z } from "zod";
import { parseStringPromise } from "xml2js";
import {
  KEAD_REGION_CODES,
  findRegionCode,
} from "@/lib/constants/region-codes";

const KEAD_BASE_URL = "http://openapi.kead.or.kr/api/EmpSrch";

export const searchDisabilityJobs = tool({
  description:
    "장애인 전용 채용공고를 검색합니다 (한국장애인고용공단). 키워드, 지역, 장애유형으로 검색합니다.",
  inputSchema: z.object({
    keyword: z.string().describe("검색 키워드 (직종, 직무명)"),
    region: z.string().default("").describe("희망 근무지역 (예: 서울, 경기)"),
    disability_type: z
      .string()
      .default("")
      .describe("장애 유형 (지체, 시각, 청각, 지적 등)"),
  }),
  execute: async ({ keyword, region }) => {
    const apiKey = process.env.DATA_GO_KR_API_KEY ?? "";

    if (!apiKey) {
      return mockDisabilityResponse(keyword, region);
    }

    const params = new URLSearchParams({
      serviceKey: apiKey,
      searchWord: keyword,
      numOfRows: "10",
      pageNo: "1",
    });

    const regionCode = findRegionCode(region, KEAD_REGION_CODES);
    if (regionCode) params.set("locCd", regionCode);

    try {
      const resp = await fetch(`${KEAD_BASE_URL}?${params}`, {
        signal: AbortSignal.timeout(10000),
      });
      const text = await resp.text();
      const data = await parseStringPromise(text, { explicitArray: false });

      let items =
        data?.response?.body?.items?.item ?? [];
      if (!Array.isArray(items)) items = [items];

      const jobs = items.slice(0, 10).map((item: Record<string, string>) => ({
        company: item.busiNm ?? "",
        title: item.empWantedTitle ?? "",
        salary: item.salary ?? "면접 후 결정",
        region: item.workAddr ?? "",
        disability_type: item.disableType ?? "전체",
        work_environment: item.workEnvironment ?? "",
        close_date: item.closeDt ?? "",
      }));

      return {
        source: "한국장애인고용공단",
        total: jobs.length,
        jobs,
      };
    } catch (e) {
      return mockDisabilityResponse(keyword, region, String(e));
    }
  },
});

function mockDisabilityResponse(
  keyword: string,
  region: string,
  error?: string,
) {
  const mockJobs = [
    {
      company: "D솔루션즈",
      title: `장애인 채용 ${keyword} (재택근무 가능)`,
      salary: "3,000만원",
      region: region || "경기 성남시",
      disability_type: "지체/뇌병변",
      work_environment: "승강기/장애인화장실/자동문 완비",
      close_date: "2026-05-10",
    },
    {
      company: "E이노베이션",
      title: `${keyword} (장애인 우대)`,
      salary: "3,300만원",
      region: region || "경기 수원시",
      disability_type: "전체",
      work_environment: "재택근무 50%, 편의시설 완비",
      close_date: "2026-04-25",
    },
    {
      company: "A테크",
      title: `${keyword} 채용 (장애인 의무고용)`,
      salary: "3,500만원",
      region: region || "경기 성남시",
      disability_type: "전체",
      work_environment: "배리어프리 사무실",
      close_date: "2026-04-30",
    },
  ];
  return {
    source: "한국장애인고용공단",
    total: mockJobs.length,
    jobs: mockJobs,
    note: error
      ? `API 연동 전 데모 데이터 (에러: ${error})`
      : "API 키 미설정 — 데모 데이터",
  };
}
