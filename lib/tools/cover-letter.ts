import { tool, generateText } from "ai";
import { z } from "zod";
import { anthropic } from "@ai-sdk/anthropic";

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
    try {
      const prompt = `당신은 한국 취업 전문 컨설턴트입니다. NCS(국가직무능력표준) 기반으로 자기소개서 초안을 작성해주세요.

지원 기업: ${company_name}
지원 직무: ${job_title}
${user_background ? `지원자 배경: ${user_background}` : ""}
${strengths ? `강점/역량: ${strengths}` : ""}

다음 3개 섹션을 각각 150-250자로 작성하세요. 구체적인 사례와 수치를 포함하되, 자연스러운 한국어로 작성하세요.
각 섹션은 반드시 아래 JSON 형식으로만 출력하세요:

[
  {
    "title": "1. 성장과정",
    "guide": "지원 직무와 관련된 성장 배경과 동기를 서술하세요.",
    "draft": "(여기에 초안 작성)"
  },
  {
    "title": "2. 직무역량",
    "guide": "NCS 기반 직무수행능력을 구체적 사례로 증명하세요.",
    "draft": "(여기에 초안 작성)"
  },
  {
    "title": "3. 입사 후 포부",
    "guide": "입사 후 기여 계획과 성장 비전을 제시하세요.",
    "draft": "(여기에 초안 작성)"
  }
]`;

      const { text } = await generateText({
        model: anthropic("claude-haiku-4-5-20251001"),
        prompt,
      });

      // Parse JSON from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const sections = JSON.parse(jsonMatch[0]);
        return {
          source: "EconoBridge AI 자기소개서 생성기",
          company: company_name,
          job_title,
          sections,
          generated_by: "AI",
        };
      }

      // If JSON parsing fails, fall through to template
      throw new Error("AI 응답 파싱 실패");
    } catch {
      // Fallback to template
      return {
        source: "EconoBridge AI 자기소개서 생성기",
        company: company_name,
        job_title,
        sections: [
          {
            title: "1. 성장과정",
            guide: "지원 직무와 관련된 성장 배경과 동기를 서술하세요.",
            draft: `어릴 때부터 기술과 사람을 연결하는 일에 관심이 많았습니다. 대학에서 관련 전공을 이수하며 ${job_title} 분야의 기초를 다졌고, 다양한 프로젝트 경험을 통해 실무 역량을 키워왔습니다. ${company_name}이 추구하는 가치에 공감하며, 이곳에서 전문성을 발휘하고 싶다는 확신을 갖게 되었습니다.`,
          },
          {
            title: "2. 직무역량",
            guide: "NCS 기반 직무수행능력을 구체적 사례로 증명하세요.",
            draft: `${job_title} 직무에 필요한 핵심 역량을 체계적으로 개발해왔습니다. 팀 프로젝트에서 문제 해결 능력을 발휘하여 프로젝트를 성공적으로 완수한 경험이 있으며, 관련 자격증 취득과 지속적인 자기개발을 통해 전문성을 높여왔습니다. 특히 데이터 기반 의사결정과 효율적인 업무 처리 능력이 강점입니다.`,
          },
          {
            title: "3. 입사 후 포부",
            guide: "입사 후 기여 계획과 성장 비전을 제시하세요.",
            draft: `${company_name}에 입사하면 ${job_title}로서 즉시 기여할 수 있는 실무 역량을 바탕으로, 첫 6개월은 업무 프로세스를 완벽히 숙지하는 데 집중하겠습니다. 이후 1년 내 팀의 핵심 인재로 성장하여 업무 효율화와 성과 창출에 기여하고, 장기적으로는 ${company_name}의 성장과 함께하는 전문가가 되겠습니다.`,
          },
        ],
        generated_by: "template",
        note: "AI 생성 실패로 템플릿 사용",
      };
    }
  },
});
