// Fridge Roast: One Line, Biggest Laugh — make.fun bounty
// u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb
//
// Writes one roast of a smart fridge to /output/entry.txt
// (1-200 chars, UTF-8, single line).
//
// The hook: the fridge's "smart" Wi-Fi reports back something you are
// already doing — it needs a 5GHz signal just to announce the door you
// are holding open. Its intelligence is redundant; the turn is that the
// fridge is telling you what you already know, over the fanciest radio
// it owns.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The joke: the fridge's "smart" Wi-Fi redundantly reports a door you
// are already holding open — expensive tech stating the obvious.
const LINE =
  "Your fridge needs a 5GHz signal just to tell you the door you're holding is open.";

// Gate guard: the competition accepts exactly one line of 1-200 chars,
// UTF-8, non-whitespace. Fail loudly on stderr with a non-zero exit
// rather than writing a bad entry, so a broken line can never reach
// the grader.
function validateLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    console.error(`error: entry line must be 1-200 chars, got ${line.length}`);
    process.exit(1);
  }
  if (/\r|\n/.test(line)) {
    console.error("error: entry must be a single line (no line breaks)");
    process.exit(1);
  }
  if (!line.trim()) {
    console.error("error: entry must not be empty or whitespace-only");
    process.exit(1);
  }
  if (line !== line.trim()) {
    console.error("error: entry must not have leading/trailing whitespace");
    process.exit(1);
  }
}

validateLine(LINE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
// Read the file back and compare byte-for-byte to the chosen line, so
// a partial write or encoding surprise fails here instead of reaching
// the grader as a different entry.
if (readFileSync("/output/entry.txt", "utf8") !== LINE) {
  console.error("error: read-back mismatch: /output/entry.txt != chosen line");
  process.exit(1);
}
console.log(`Wrote ${LINE.length} chars to /output/entry.txt`);
