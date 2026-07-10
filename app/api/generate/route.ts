import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { validateGenerateRequest } from "@/lib/validation";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/promptBuilder";

// Force Node.js runtime (Anthropic SDK) and disable static caching for this route.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = validateGenerateRequest(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Never expose whether/why in detail beyond a generic server config message.
    return NextResponse.json(
      { error: "AI service is not configured. Please contact the administrator." },
      { status: 500 }
    );
  }

  const client = new Anthropic({ apiKey });
  const userPrompt = buildUserPrompt(parsed.data);

  try {
    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5-20250929",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text content returned by AI provider.");
    }

    let parsedOutput: { technique?: string; findings?: string };
    try {
      parsedOutput = JSON.parse(textBlock.text);
    } catch {
      // Fall back gracefully if the model wraps JSON in prose despite instructions.
      const match = textBlock.text.match(/\{[\s\S]*\}/);
      parsedOutput = match ? JSON.parse(match[0]) : {};
    }

    if (!parsedOutput.technique || !parsedOutput.findings) {
      return NextResponse.json(
        { error: "AI response was incomplete. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      technique: parsedOutput.technique,
      findings: parsedOutput.findings,
    });
  } catch (err) {
    console.error("Generation error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Failed to generate the operative note. Please try again." },
      { status: 502 }
    );
  }
}
