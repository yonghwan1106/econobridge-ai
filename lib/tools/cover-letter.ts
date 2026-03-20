import { tool } from "ai";
import { z } from "zod";

export const generateCoverLetter = tool({
  description:
    "NCS 기반 맞춤 자기소개서 초안을 생성합니다. 지원 직무와 기업 정보를 바탕으로 구조화된 자기소개서를 작성합니다.",
  inputSchema: z.object({
    job_title: z.string().describe("지원 직무명"),
    company_name: z.string().describe("지원 기업명"),
    user_background: z
      .string()
      .default("")
      .describe("사용자 배경 (학력, 경험 등)"),
    strengths: z.string().default("").describe("강점/역량"),
  }),
  execute: async ({ job_title, company_name, user_background, strengths }) => {
    const template: Record<string, unknown> = {
      source: "EconoBridge AI 자기소개서 생성기",
      company: company_name,
      job_title,
      sections: [
        {
          title: "1. 성장과정",
          guide: "지원 직무와 관련된 성장 배경과 동기를 서술하세요.",
          draft: `${company_name}의 ${job_title} 직무에 지원하게 된 계기와 관련 경험을 중심으로 작성합니다.`,
        },
        {
          title: "2. 직무역량",
          guide: "NCS 기반 직무수행능력을 구체적 사례로 증명하세요.",
          draft: `${job_title} 수행에 필요한 핵심 역량과 이를 발휘한 구체적 경험을 기술합니다.`,
        },
        {
          title: "3. 입사 후 포부",
          guide: "입사 후 기여 계획과 성장 비전을 제시하세요.",
          draft: `${company_name}에서 ${job_title}로서 기여할 수 있는 구체적 계획을 제시합니다.`,
        },
      ],
      note: "이 초안을 바탕으로 사용자의 실제 경험을 추가하여 완성하세요.",
    };

    if (user_background) template.user_background = user_background;
    if (strengths) template.strengths = strengths;

    return template;
  },
});
