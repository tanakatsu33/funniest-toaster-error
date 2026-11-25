import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FAULT_REPORT = "FAULT: I TOASTED BOTH SIDES.";
const CONFESSION = "ONE SIDE IS PERFECT.";
const KICKER = "PLEASE DO NOT TURN IT OVER.";
const ENTRY = `${FAULT_REPORT} ${CONFESSION} ${KICKER}`;

function check(entry: string): void {
  const length = [...entry].length;
  if (length < 1 || length > 120) {
    throw new Error(`entry must be 1-120 characters, got ${length}`);
  }
  if (/[\r\n]/.test(entry)) {
    throw new Error("entry must be a single line");
  }
  if (/[\u0000-\u001f\u007f-\u009f]/.test(entry)) {
    throw new Error("entry must not contain tabs or other control characters");
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

check(ENTRY);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), `${ENTRY}\n`, "utf8");
