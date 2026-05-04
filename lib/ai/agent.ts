import { ToolLoopAgent, stepCountIs } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { SYSTEM_PROMPT } from "./system-prompt";
import { allTools } from "@/lib/tools";

export const econoBridgeAgent = new ToolLoopAgent({
  id: "econobridge-ai",
  model: anthropic("claude-opus-4-7"),
  instructions: {
    role: "system",
    content: SYSTEM_PROMPT,
    providerOptions: {
      anthropic: { cacheControl: { type: "ephemeral" } },
    },
  },
  tools: allTools,
  stopWhen: stepCountIs(10),
  providerOptions: {
    anthropic: {
      thinking: { type: "enabled", budgetTokens: 4000 },
    },
  },
});
