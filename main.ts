// fortune-in-a-pot: writes one kind, funny fortune for the houseplant
// on the windowsill to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Deterministic: no clock reads, no randomness, no network, no secrets.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "Your newest leaf will unfurl toward the windowsill sun, and your keeper will smile before their first coffee.";

// The gate counts characters: this line is 109 characters, inside 1-120.
const EXPECTED_CHARS = 109;
const MIN_CHARS = 1;
const MAX_CHARS = 120;

function validateFortune(line: string): number {
  const chars = [...line].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `Fortune must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}.`,
    );
  }
  if (chars !== EXPECTED_CHARS) {
    throw new Error(
      `Fortune length changed: expected ${EXPECTED_CHARS}, got ${chars}.`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("Fortune must not be only whitespace.");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Fortune must be a single line.");
  }
  if (line.includes("  ")) {
    throw new Error("Fortune must not contain double spaces.");
  }
  if (!line.endsWith(".")) {
    throw new Error("Fortune must end with a full stop.");
  }
  return chars;
}

function main(): void {
  const chars = validateFortune(FORTUNE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), FORTUNE, "utf8");
  console.log(`Wrote entry.txt (${chars} chars) to ${outDir}`);
}

main();
