export interface DemoScenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  initialMessage: string;
  tags: string[];
  expectedNodes: string[];
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "it-developer",
    title: "IT 개발자 구직",
    description: "경기도 지역 웹개발자 채용정보를 검색하고 기업 안전성을 분석합니다.",
    icon: "💻",
    initialMessage: "경기도에서 IT 웹개발자 채용 찾아줘",
    tags: ["IT", "경기도", "신입/경력"],
    expectedNodes: [
      "profile_analysis",
      "worknet_search",
      "safety_check",
      "wage_check",
      "final_summary",
    ],
  },
  {
    id: "disability-employment",
    title: "장애인 취업 지원",
    description: "장애인 맞춤 채용공고와 일반 채용을 함께 검색하고 안전한 기업을 추천합니다.",
    icon: "♿",
    initialMessage: "장애인 채용 사무직 서울 검색해줘",
    tags: ["장애인", "서울", "사무직"],
    expectedNodes: [
      "profile_analysis",
      "worknet_search",
      "disability_search",
      "safety_check",
      "wage_check",
      "training_search",
      "final_summary",
    ],
  },
  {
    id: "training-courses",
    title: "훈련과정 탐색",
    description: "청년 대상 데이터 분석 관련 직업훈련 과정을 추천받습니다.",
    icon: "📚",
    initialMessage: "청년 대상 데이터 분석 훈련과정 추천해줘",
    tags: ["청년", "데이터분석", "훈련"],
    expectedNodes: [
      "profile_analysis",
      "training_search",
      "final_summary",
    ],
  },
  {
    id: "full-workflow",
    title: "종합 워크플로우",
    description: "채용 검색부터 안전성 분석, 자기소개서 생성까지 전체 과정을 실행합니다.",
    icon: "🚀",
    initialMessage:
      "서울 IT 개발자 채용 찾아주고, 안전한 기업 위주로 추천하고, 가장 안전한 기업에 자기소개서도 만들어줘",
    tags: ["서울", "IT", "자기소개서", "전체"],
    expectedNodes: [
      "profile_analysis",
      "worknet_search",
      "safety_check",
      "wage_check",
      "cover_letter",
      "final_summary",
    ],
  },
];
