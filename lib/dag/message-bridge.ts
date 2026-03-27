import type { UIMessage } from "ai";
import type { DagState, DagNodeStatus } from "./types";
import { createInitialDagState, TOOL_TO_NODE } from "./templates";

/**
 * Derive DAG state from the current UIMessage array.
 *
 * This is a pure, stateless function — called on every render.
 * The DAG state is always a projection of the messages, never maintained separately.
 */
export function messagesToDagState(messages: UIMessage[]): DagState {
  const dag = createInitialDagState();

  // Build quick lookup: nodeId → node index
  const nodeIndex = new Map<string, number>();
  dag.nodes.forEach((n, i) => nodeIndex.set(n.id, i));

  const setStatus = (nodeId: string, status: DagNodeStatus, result?: unknown) => {
    const idx = nodeIndex.get(nodeId);
    if (idx === undefined) return;
    const node = dag.nodes[idx];
    // Don't downgrade: complete > running > pending > idle
    const priority: Record<DagNodeStatus, number> = {
      idle: 0,
      pending: 1,
      running: 2,
      complete: 3,
      skipped: 0,
      error: 4,
    };
    if (priority[status] > priority[node.status]) {
      node.status = status;
      if (status === "running" && !node.startedAt) node.startedAt = Date.now();
      if (status === "complete") {
        node.completedAt = Date.now();
        if (result !== undefined) node.result = result;
      }
    }
  };

  // Track which tools were invoked
  const invokedToolNodes = new Set<string>();
  let hasAssistantText = false;
  let lastAssistantHasOnlyText = false;

  for (const msg of messages) {
    if (msg.role !== "assistant") continue;

    let msgHasTool = false;
    let msgHasText = false;

    for (const part of msg.parts) {
      if (part.type === "text" && part.text.trim()) {
        hasAssistantText = true;
        msgHasText = true;
      }

      // Tool call parts: type is "tool-<toolName>"
      if (part.type.startsWith("tool-") && part.type !== "tool-result") {
        msgHasTool = true;
        const toolName = part.type.replace("tool-", "");
        const nodeId = TOOL_TO_NODE[toolName];
        if (!nodeId) continue;

        invokedToolNodes.add(nodeId);

        const toolPart = part as {
          state?: string;
          output?: unknown;
        };

        if (toolPart.state === "output-available") {
          setStatus(nodeId, "complete", toolPart.output);
        } else {
          setStatus(nodeId, "running");
        }
      }
    }

    lastAssistantHasOnlyText = msgHasText && !msgHasTool;
  }

  // Synthetic node: profile_analysis
  if (hasAssistantText) {
    setStatus("profile_analysis", "complete");
  }

  // Synthetic node: final_summary — complete when the last assistant message is pure text
  // (no tool calls), and at least one tool has completed
  const anyToolComplete = dag.nodes.some(
    (n) => n.toolName && n.status === "complete"
  );
  if (lastAssistantHasOnlyText && anyToolComplete) {
    setStatus("final_summary", "complete");
  }

  // Mark conditional nodes as skipped if the conversation is done
  // (final_summary complete) but they were never invoked
  const isDone =
    dag.nodes.find((n) => n.id === "final_summary")?.status === "complete";
  if (isDone) {
    for (const node of dag.nodes) {
      if (node.status === "idle" && !invokedToolNodes.has(node.id)) {
        node.status = "skipped";
      }
    }
  }

  // Set pending status for nodes whose predecessors are running/complete
  // but the node itself hasn't started yet
  if (!isDone) {
    for (const edge of dag.edges) {
      const fromNode = dag.nodes[nodeIndex.get(edge.from)!];
      const toNode = dag.nodes[nodeIndex.get(edge.to)!];
      if (
        fromNode &&
        toNode &&
        (fromNode.status === "running" || fromNode.status === "complete") &&
        toNode.status === "idle"
      ) {
        // Only set pending for non-conditional or nodes that exist in invoked set
        if (!edge.conditional || invokedToolNodes.has(toNode.id)) {
          setStatus(toNode.id, "pending");
        }
      }
    }
  }

  return dag;
}
