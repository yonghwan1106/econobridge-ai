import { ToolLoopAgent, stepCountIs } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { SYSTEM_PROMPT } from "./system-prompt";
import { allTools } from "@/lib/tools";

export const econoBridgeAgent = new ToolLoopAgent({
  id: "econobridge-ai",
  model: anthropic("claude-sonnet-4-6"),
  instructions: SYSTEM_PROMPT,
  tools: allTools,
  stopWhen: stepCountIs(10),
});
