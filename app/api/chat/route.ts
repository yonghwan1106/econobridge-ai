import { createAgentUIStreamResponse } from "ai";
import { econoBridgeAgent } from "@/lib/ai/agent";

export async function POST(req: Request) {
  const { messages } = await req.json();
  return createAgentUIStreamResponse({
    agent: econoBridgeAgent,
    uiMessages: messages,
  });
}
