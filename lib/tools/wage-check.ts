import { tool } from "ai";
import { z } from "zod";
import { getWageViolations } from "@/lib/data/data-lookup";

export const checkWageViolations = tool({
  description:
    "기업의 임금체불 이력을 조회합니다. 고용노동부 상습 임금체불 사업주 명단 데이터를 기반으로 해당 기업의 체불 이력을 확인합니다.",
  inputSchema: z.object({
    company_name: z.string().describe("조회할 기업명"),
  }),
  execute: async ({ company_name }) => {
    const records = getWageViolations(company_name);

    if (records.length === 0) {
      return {
        source: "고용노동부 (임금체불 공개명단)",
        company: company_name,
        violation_count: 0,
        violations: [],
        status: "이력 없음",
      };
    }

    let totalAmount = 0;
    const violations = records.map((r) => {
      totalAmount += r.amount;
      return {
        date: r.violation_date,
        amount: `${r.amount.toLocaleString()}원`,
        workers_affected: `${r.workers_affected}명`,
        status: r.status,
      };
    });

    return {
      source: "고용노동부 (임금체불 공개명단)",
      company: company_name,
      violation_count: violations.length,
      total_amount: `${totalAmount.toLocaleString()}원`,
      violations,
      status: "⚠️ 임금체불 이력 있음",
    };
  },
});
