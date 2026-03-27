import type { DagNodePosition } from "./types";

/**
 * Hand-tuned node positions for the EconoBridge DAG.
 * Coordinates are in SVG viewBox units (600 x 520).
 *
 * Layer 0: profile_analysis
 * Layer 1: worknet_search, disability_search, training_search
 * Layer 2: safety_check, safety_laws
 * Layer 3: wage_check
 * Layer 4: final_summary
 * Layer 5: cover_letter
 */
export const NODE_POSITIONS: DagNodePosition[] = [
  // Layer 0
  { id: "profile_analysis", x: 300, y: 40 },
  // Layer 1
  { id: "worknet_search", x: 120, y: 130 },
  { id: "disability_search", x: 300, y: 130 },
  { id: "training_search", x: 480, y: 130 },
  // Layer 2
  { id: "safety_check", x: 180, y: 230 },
  { id: "safety_laws", x: 440, y: 230 },
  // Layer 3
  { id: "wage_check", x: 180, y: 320 },
  // Layer 4
  { id: "final_summary", x: 300, y: 410 },
  // Layer 5
  { id: "cover_letter", x: 300, y: 490 },
];

export function getNodePosition(nodeId: string): DagNodePosition | undefined {
  return NODE_POSITIONS.find((p) => p.id === nodeId);
}
