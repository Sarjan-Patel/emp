import { put } from "@vercel/blob";
import type { StoredSubmission } from "./types";

/**
 * Storage interface — kept narrow so we can swap Vercel Blob for a database
 * (e.g. Neon Postgres) without touching the route handler.
 */
export interface StoredResult {
  id: string;
  key: string;
}

export async function storeSubmission(
  submission: StoredSubmission
): Promise<StoredResult> {
  const date = new Date(submission.receivedAt);
  const yyyy = date.getUTCFullYear().toString();
  const mm = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const dd = date.getUTCDate().toString().padStart(2, "0");
  const key = `submissions/${yyyy}/${mm}/${dd}/${submission.id}.json`;

  await put(key, JSON.stringify(submission, null, 2), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });

  return { id: submission.id, key };
}
