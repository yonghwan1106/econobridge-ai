export type DagNodeStatus =
  | "idle"
  | "pending"
  | "running"
  | "complete"
  | "skipped"
  | "error";

export interface DagNode {
  id: string;
  label: string;
  icon: string;
  toolName?: string; // null for synthetic nodes (profile_analysis, final_summary)
  status: DagNodeStatus;
  startedAt?: number;
  completedAt?: number;
  result?: unknown;
  error?: string;
}

export interface DagEdge {
  from: string;
  to: string;
  conditional?: boolean;
}

export interface DagState {
  nodes: DagNode[];
  edges: DagEdge[];
}

export interface DagNodePosition {
  id: string;
  x: number;
  y: number;
}
