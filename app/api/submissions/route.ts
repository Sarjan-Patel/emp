import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { storeSubmission } from "@/lib/blob";
import type { Answers, StoredSubmission } from "@/lib/types";

export const runtime = "nodejs";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isValidAnswers(value: unknown): value is Answers {
  if (!isPlainObject(value)) return false;
  for (const [k, v] of Object.entries(value)) {
    // Keys must look like positive integers (question ids).
    if (!/^\d+$/.test(k)) return false;
    if (typeof v === "string") continue;
    if (Array.isArray(v) && v.every((item) => typeof item === "string")) continue;
    return false;
  }
  return true;
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

export async function POST(request: Request) {
  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON" },
      { status: 400 }
    );
  }

  if (!isPlainObject(parsed)) {
    return NextResponse.json(
      { error: "Request body must be a JSON object" },
      { status: 400 }
    );
  }

  const { answers, submittedAt, userAgent } = parsed;

  if (!isValidAnswers(answers)) {
    return NextResponse.json(
      {
        error:
          "`answers` must be an object whose keys are question ids and whose values are strings or arrays of strings",
      },
      { status: 400 }
    );
  }

  if (!isIsoDate(submittedAt)) {
    return NextResponse.json(
      { error: "`submittedAt` must be an ISO 8601 timestamp" },
      { status: 400 }
    );
  }

  if (userAgent !== undefined && typeof userAgent !== "string") {
    return NextResponse.json(
      { error: "`userAgent` must be a string when present" },
      { status: 400 }
    );
  }

  const stored: StoredSubmission = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    answers,
    submittedAt,
    userAgent,
  };

  try {
    const result = await storeSubmission(stored);
    return NextResponse.json({ id: result.id, key: result.key });
  } catch (err) {
    // Avoid leaking submission contents into logs.
    console.error("storeSubmission failed", {
      id: stored.id,
      reason: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json(
      {
        error:
          "Storage failed. Check that the Vercel Blob integration is configured and BLOB_READ_WRITE_TOKEN is set.",
      },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export function PUT() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
