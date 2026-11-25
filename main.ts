import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FAULT = "FAULT: I TOASTED BOTH SIDES. ONE SIDE IS PERFECT.";
const KICKER = "PLEASE DO NOT TURN IT OVER.";
const ENTRY = `${FAULT} ${KICKER}`;

function check(entry: string): void {
  const length = [...entry].length;
  if (length < 1 || length > 120) {
    throw new Error(`entry must be 1-120 characters, got ${length}`);
  }
  if (/[\r\n]/.test(entry)) {
    throw new Error("entry must be a single line");
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

check(ENTRY);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), `${ENTRY}\n`, "utf8");
