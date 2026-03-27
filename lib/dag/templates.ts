import type { DagNode, DagEdge, DagNodeStatus, DagState } from "./types";

export const DAG_NODES: DagNode[] = [
  {
    id: "profile_analysis",
    label: "프로필 분석",
    icon: "📋",
    status: "idle",
  },
  {
    id: "worknet_search",
    label: "워크넷 검색",
    icon: "🔍",
    toolName: "search_worknet_jobs",
    status: "idle",
  },
  {
    id: "disability_search",
    label: "장애인 채용검색",
    icon: "♿",
    toolName: "search_disability_jobs",
    status: "idle",
  },
  {
    id: "training_search",
    label: "훈련과정 검색",
    icon: "📚",
    toolName: "search_training_courses",
    status: "idle",
  },
  {
    id: "safety_check",
    label: "안전성 분석",
    icon: "🛡️",
    toolName: "check_company_safety",
    status: "idle",
  },
  {
    id: "safety_laws",
    label: "안전법령 검색",
    icon: "⚖️",
    toolName: "search_safety_laws",
    status: "idle",
  },
  {
    id: "wage_check",
    label: "임금체불 조회",
    icon: "💰",
    toolName: "check_wage_violations",
    status: "idle",
  },
  {
    id: "final_summary",
    label: "종합 결과",
    icon: "📊",
    status: "idle",
  },
  {
    id: "cover_letter",
    label: "자기소개서",
    icon: "📝",
    toolName: "generate_cover_letter",
    status: "idle",
  },
];

export const DAG_EDGES: DagEdge[] = [
  { from: "profile_analysis", to: "worknet_search" },
  { from: "profile_analysis", to: "disability_search", conditional: true },
  { from: "profile_analysis", to: "training_search", conditional: true },
  { from: "worknet_search", to: "safety_check" },
  { from: "disability_search", to: "safety_check" },
  { from: "safety_check", to: "wage_check" },
  { from: "wage_check", to: "final_summary" },
  { from: "training_search", to: "final_summary" },
  { from: "safety_laws", to: "final_summary", conditional: true },
  { from: "final_summary", to: "cover_letter", conditional: true },
];

/** Tool name → DAG node id lookup */
export const TOOL_TO_NODE: Record<string, string> = {};
for (const node of DAG_NODES) {
  if (node.toolName) {
    TOOL_TO_NODE[node.toolName] = node.id;
  }
}

/** Create a fresh DAG state from the template */
export function createInitialDagState(): DagState {
  return {
    nodes: DAG_NODES.map((n) => ({ ...n, status: "idle" as DagNodeStatus })),
    edges: DAG_EDGES.map((e) => ({ ...e })),
  };
}
