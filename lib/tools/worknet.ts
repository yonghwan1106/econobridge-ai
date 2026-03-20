import { tool } from "ai";
import { z } from "zod";
import { parseStringPromise } from "xml2js";
import {
  WORKNET_REGION_CODES,
  findRegionCode,
} from "@/lib/constants/region-codes";

const WORK24_BASE_URL = "http://openapi.work.go.kr/opi/opi/opia/wantedApi.do";

export const searchWorknetJobs = tool({
  description:
    "고용24(구 워크넷)에서 채용공고를 검색합니다 (한국고용정보원). 키워드, 지역, 경력 조건으로 검색할 수 있습니다.",
  inputSchema: z.object({
    keyword: z.string().describe("검색 키워드 (직종, 직무명 등)"),
    region: z.string().default("").describe("희망 근무지역 (예: 서울, 경기)"),
    career: z.string().default("").describe("경력 조건 (신입, 경력, 무관)"),
  }),
  execute: async ({ keyword, region, career }) => {
    const apiKey = process.env.WORK24_JOB_API_KEY ?? "";

    if (!apiKey) {
      return mockWorknetResponse(keyword, region);
    }

    const params = new URLSearchParams({
      authKey: apiKey,
      callTp: "L",
      returnType: "XML",
      keyword,
      display: "10",
      start: "1",
    });

    const regionCode = findRegionCode(region, WORKNET_REGION_CODES);
    if (regionCode) params.set("region", regionCode);

    if (career) {
      const careerMap: Record<string, string> = {
        신입: "N",
        경력: "E",
        무관: "Z",
      };
      params.set("career", careerMap[career] ?? "Z");
    }

    try {
      const resp = await fetch(`${WORK24_BASE_URL}?${params}`, {
        signal: AbortSignal.timeout(10000),
      });
      const text = await resp.text();
      const data = await parseStringPromise(text, { explicitArray: false });

      const root = data?.wantedRoot ?? {};
      let wanted = root?.wanted ?? [];
      if (!Array.isArray(wanted)) wanted = [wanted];

      const jobs = wanted.slice(0, 10).map((item: Record<string, string>) => ({
        company: item.company ?? "",
        title: item.title ?? "",
        salary: item.sal ?? "",
        region: item.region ?? "",
        career: item.career ?? "",
        education: item.edu ?? "",
        close_date: item.closeDt ?? "",
      }));

      return {
        source: "고용24 채용정보 (한국고용정보원)",
        total: parseInt(root.total ?? "0", 10),
        jobs,
      };
    } catch (e) {
      return mockWorknetResponse(keyword, region, String(e));
    }
  },
});

function mockWorknetResponse(keyword: string, region: string, error?: string) {
  const mockJobs = [
    {
      company: "A테크",
      title: `${keyword} 개발자 채용`,
      salary: "3,500만원",
      region: region || "경기 성남시",
      career: "신입/경력",
      education: "대졸",
      close_date: "2026-04-30",
    },
    {
      company: "C디지털",
      title: `주니어 ${keyword}`,
      salary: "3,200만원",
      region: region || "경기 수원시",
      career: "신입",
      education: "대졸",
      close_date: "2026-05-15",
    },
    {
      company: "B소프트",
      title: `시니어 ${keyword}`,
      salary: "4,000만원",
      region: region || "경기 판교",
      career: "경력 3년↑",
      education: "대졸",
      close_date: "2026-04-20",
    },
  ];
  return {
    source: "고용24 채용정보 (한국고용정보원)",
    total: mockJobs.length,
    jobs: mockJobs,
    note: error
      ? `API 연동 전 데모 데이터 (에러: ${error})`
      : "API 키 미설정 — 데모 데이터",
  };
}
