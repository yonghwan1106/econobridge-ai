import { tool } from "ai";
import { z } from "zod";
import {
  countAccidents,
  getMajorAccidents,
  getWageViolations,
} from "@/lib/data/data-lookup";

/** 안전점수 산출 (100점 만점).
 *  감점: 산재 -5, 중대재해 -15, 사망 -25, 임금체불 -10 */
function calculateSafetyScore(
  accidentCount: number,
  majorAccidentCount: number,
  deathCount: number,
  wageViolation: boolean,
): number {
  let score = 100;
  score -= accidentCount * 5;
  score -= majorAccidentCount * 15;
  score -= deathCount * 25;
  if (wageViolation) score -= 10;
  return Math.max(0, Math.min(100, score));
}

/** 점수 → 등급 변환 */
function scoreToGrade(score: number) {
  if (score >= 90) return { grade: "A" as const, emoji: "🟢", label: "안전" };
  if (score >= 70) return { grade: "B" as const, emoji: "🟡", label: "보통" };
  if (score >= 50) return { grade: "C" as const, emoji: "🟠", label: "주의" };
  return { grade: "D" as const, emoji: "🔴", label: "위험" };
}

/** Mock 데이터 */
const MOCK_DATA: Record<
  string,
  { accidents: number; major: number; deaths: number; wage: boolean }
> = {
  A테크: { accidents: 0, major: 0, deaths: 0, wage: false },
  B소프트: { accidents: 2, major: 1, deaths: 0, wage: true },
  C디지털: { accidents: 1, major: 0, deaths: 0, wage: false },
  D솔루션즈: { accidents: 0, major: 0, deaths: 0, wage: false },
  E이노베이션: { accidents: 0, major: 0, deaths: 0, wage: false },
};

export const checkCompanySafety = tool({
  description:
    "기업의 산업재해 이력과 안전점수를 조회합니다. 근로복지공단 산재처리현황과 고용노동부 중대산업사고 데이터를 교차 분석하여 안전점수(100점 만점)를 산출합니다.",
  inputSchema: z.object({
    company_name: z.string().describe("조회할 기업명"),
  }),
  execute: async ({ company_name }) => {
    // JSON 데이터에서 조회 시도
    const accidentCount = countAccidents(company_name);
    const { count: majorCount, deaths: deathCount } =
      getMajorAccidents(company_name);
    const wageRecords = getWageViolations(company_name);
    const wageViolation = wageRecords.length > 0;

    // JSON에 데이터가 없으면 Mock 사용
    const hasData =
      accidentCount > 0 || majorCount > 0 || wageRecords.length > 0;

    if (hasData) {
      const score = calculateSafetyScore(
        accidentCount,
        majorCount,
        deathCount,
        wageViolation,
      );
      const gradeInfo = scoreToGrade(score);

      return {
        source: "근로복지공단 + 고용노동부",
        company: company_name,
        accident_count: accidentCount,
        major_accident_count: majorCount,
        death_count: deathCount,
        wage_violation: wageViolation,
        safety_score: score,
        grade: gradeInfo.grade,
        grade_emoji: gradeInfo.emoji,
        grade_label: gradeInfo.label,
      };
    }

    // Mock fallback
    const mock = MOCK_DATA[company_name] ?? {
      accidents: 0,
      major: 0,
      deaths: 0,
      wage: false,
    };
    const score = calculateSafetyScore(
      mock.accidents,
      mock.major,
      mock.deaths,
      mock.wage,
    );
    const gradeInfo = scoreToGrade(score);

    return {
      source: "근로복지공단 + 고용노동부",
      company: company_name,
      accident_count: mock.accidents,
      major_accident_count: mock.major,
      death_count: mock.deaths,
      wage_violation: mock.wage,
      safety_score: score,
      grade: gradeInfo.grade,
      grade_emoji: gradeInfo.emoji,
      grade_label: gradeInfo.label,
      note: "데모 데이터",
    };
  },
});
