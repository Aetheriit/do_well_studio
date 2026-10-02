import { randomUUID } from "node:crypto";
import { link, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import type { LeadDetails } from "./lead-validation";

export class LeadConflictError extends Error {}

export async function saveLead(
  id: string,
  details: LeadDetails,
  directory = path.join(process.cwd(), "data", "leads"),
) {
  await mkdir(directory, { recursive: true });
  const destination = path.join(directory, `${id}.json`);
  const temporary = path.join(directory, `.${id}-${randomUUID()}.tmp`);
  const record = { id, createdAt: new Date().toISOString(), details };

  try {
    await writeFile(temporary, JSON.stringify(record, null, 2), { flag: "wx", mode: 0o600 });
    try {
      // Publishing a completed file atomically also makes simultaneous retries safe.
      await link(temporary, destination);
      return { id, duplicate: false };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      const existing = JSON.parse(await readFile(destination, "utf8"));
      if (JSON.stringify(existing.details) !== JSON.stringify(details)) {
        throw new LeadConflictError("This request identifier has already been used.");
      }
      return { id, duplicate: true };
    }
  } finally {
    await unlink(temporary).catch(() => undefined);
  }
}
