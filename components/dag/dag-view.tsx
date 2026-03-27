"use client";

import type { DagState } from "@/lib/dag/types";
import { NODE_POSITIONS, getNodePosition } from "@/lib/dag/layout";

const NODE_RADIUS = 28;

const STATUS_STYLES: Record<
  string,
  { fill: string; stroke: string; textFill: string; opacity: number }
> = {
  idle: {
    fill: "#E2E8F0",
    stroke: "#CBD5E1",
    textFill: "#94A3B8",
    opacity: 1,
  },
  pending: {
    fill: "#ecfdf5",
    stroke: "#00d4aa",
    textFill: "#059669",
    opacity: 1,
  },
  running: {
    fill: "#00d4aa",
    stroke: "#33e0be",
    textFill: "#0c1222",
    opacity: 1,
  },
  complete: {
    fill: "#059669",
    stroke: "#047857",
    textFill: "#FFFFFF",
    opacity: 1,
  },
  skipped: {
    fill: "#F1F5F9",
    stroke: "#CBD5E1",
    textFill: "#CBD5E1",
    opacity: 0.5,
  },
  error: {
    fill: "#DC2626",
    stroke: "#B91C1C",
    textFill: "#FFFFFF",
    opacity: 1,
  },
};

function getEdgeColor(
  fromStatus: string,
  toStatus: string
): { stroke: string; opacity: number } {
  if (fromStatus === "complete" && toStatus === "complete") {
    return { stroke: "#16A34A", opacity: 1 };
  }
  if (
    fromStatus === "running" ||
    fromStatus === "complete" ||
    toStatus === "running"
  ) {
    return { stroke: "#00d4aa", opacity: 0.8 };
  }
  if (fromStatus === "skipped" || toStatus === "skipped") {
    return { stroke: "#CBD5E1", opacity: 0.3 };
  }
  return { stroke: "#CBD5E1", opacity: 0.5 };
}

export function DagView({ dagState }: { dagState: DagState }) {
  const nodeMap = new Map(dagState.nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 600 520"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      style={{ maxHeight: "480px" }}
    >
      <defs>
        <filter id="dag-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {dagState.edges.map((edge) => {
        const from = getNodePosition(edge.from);
        const to = getNodePosition(edge.to);
        if (!from || !to) return null;

        const fromNode = nodeMap.get(edge.from);
        const toNode = nodeMap.get(edge.to);
        const edgeColor = getEdgeColor(
          fromNode?.status ?? "idle",
          toNode?.status ?? "idle"
        );

        // Bezier curve: vertical bias
        const midY = (from.y + to.y) / 2;
        const d = `M ${from.x} ${from.y + NODE_RADIUS} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y - NODE_RADIUS}`;

        const isActive =
          fromNode?.status === "running" ||
          (fromNode?.status === "complete" && toNode?.status === "running");

        return (
          <path
            key={`${edge.from}-${edge.to}`}
            d={d}
            fill="none"
            stroke={edgeColor.stroke}
            strokeWidth={2}
            strokeOpacity={edgeColor.opacity}
            strokeDasharray={edge.conditional ? "6 4" : undefined}
            className={isActive ? "dag-edge-active" : ""}
            style={{ transition: "stroke 0.5s, stroke-opacity 0.5s" }}
          />
        );
      })}

      {/* Nodes */}
      {NODE_POSITIONS.map((pos) => {
        const node = nodeMap.get(pos.id);
        if (!node) return null;

        const style = STATUS_STYLES[node.status] ?? STATUS_STYLES.idle;

        return (
          <g
            key={pos.id}
            style={{
              opacity: style.opacity,
              transition: "opacity 0.4s",
            }}
          >
            {/* Pulse ring for running nodes */}
            {node.status === "running" && (
              <circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_RADIUS + 4}
                fill="none"
                stroke="#00d4aa"
                strokeWidth={2}
                className="dag-pulse-ring"
              />
            )}

            {/* Main circle */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={NODE_RADIUS}
              fill={style.fill}
              stroke={style.stroke}
              strokeWidth={2}
              className={node.status === "complete" ? "dag-complete-pop" : ""}
              style={{ transition: "fill 0.4s, stroke 0.4s" }}
              filter={node.status === "running" ? "url(#dag-glow)" : undefined}
            />

            {/* Icon */}
            <text
              x={pos.x}
              y={pos.y + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={16}
              style={{ pointerEvents: "none" }}
            >
              {node.status === "complete" ? "✓" : node.icon}
            </text>

            {/* Label below node */}
            <text
              x={pos.x}
              y={pos.y + NODE_RADIUS + 15}
              textAnchor="middle"
              fontSize={12}
              fill={
                node.status === "running" || node.status === "complete"
                  ? "#0f172a"
                  : node.status === "skipped"
                    ? "#cbd5e1"
                    : "#475569"
              }
              fontWeight={
                node.status === "running" || node.status === "complete"
                  ? 700
                  : 500
              }
              style={{
                textDecoration:
                  node.status === "skipped" ? "line-through" : undefined,
                transition: "fill 0.4s",
              }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
