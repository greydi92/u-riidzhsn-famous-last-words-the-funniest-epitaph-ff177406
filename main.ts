// Famous Last Words: The Funniest Epitaph
// Writes one one-line epitaph (<= 150 chars) to /output/entry.txt.
// No network, no dependencies, Node 22. Exits 0, never throws.

import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The line: a good-news/bad-news dying quip. He spent his life trying
// to lose weight — and finally succeeded, by losing all of it: his body.
const EPITAPH = "Good news: I finally lost weight. Bad news: all of it.";

function outputDir(): string {
  // Grader sets MAKEFUN_OUTPUT_DIR; fall back to the sandbox /output.
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return resolve(fromEnv);
  return "/output";
}

function main(): void {
  // Safety net: the line must pass the gate (1-150 chars, not whitespace).
  // The constant above is 54 chars, so this guard never fires; it exists
  // only so a future edit cannot silently ship an invalid entry.
  const line = EPITAPH.trim();
  const chars = [...line].length;
  if (chars < 1 || chars > 150) return; // write nothing invalid, exit 0

  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "entry.txt"), line + "\n", "utf8");
}

try {
  main();
} catch {
  // Never throw out of the entrypoint: a failed write still exits 0 so
  // the grader records a gate failure instead of a crash.
}
