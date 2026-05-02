import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  detectPlatform,
  detectPlatformVersion,
  detectBitness,
  detectWow64,
} from "../src/core/detection";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Expected {
  platform: string | undefined;
  version: string | undefined;
  bitness: string | undefined;
  wow64: boolean;
}

const EXPECTED: Record<string, Expected> = {
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246":
    { platform: "Windows", version: "10.0", bitness: "64", wow64: false },
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36":
    { platform: "Macintosh", version: "10.15.7", bitness: "64", wow64: false },
  "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1":
    { platform: "iOS", version: "15.6", bitness: "64", wow64: false },
  "Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36":
    { platform: "Android", version: "13", bitness: "64", wow64: false },
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36":
    { platform: "Windows", version: "10.0", bitness: "64", wow64: true },
  "Mozilla/5.0 (X11; Linux i686; rv:10.0) Gecko/20100101 Firefox/10.0": {
    platform: "Linux",
    version: undefined,
    bitness: "32",
    wow64: false,
  },
  "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19":
    { platform: "Android", version: "4.0.4", bitness: "32", wow64: false },
  "Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus S Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1":
    { platform: "Android", version: "2.3.6", bitness: "32", wow64: false },
  "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko": {
    platform: "Windows",
    version: "6.1",
    bitness: undefined,
    wow64: false,
  },
  "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:36.0) Gecko/20100101 Firefox/36.0": {
    platform: "Windows",
    version: "6.3",
    bitness: "64",
    wow64: true,
  },
  "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko": {
    platform: "Windows",
    version: "10.0",
    bitness: "64",
    wow64: true,
  },
};

const userAgents = readFileSync(
  join(__dirname, "data", "user-agents.txt"),
  "utf8",
)
  .split("\n")
  .filter(Boolean);

describe("platform / bitness / wow64 detection", () => {
  for (const ua of userAgents) {
    const expected = EXPECTED[ua];
    if (!expected) continue;

    it(ua.substring(0, 60), () => {
      expect(detectPlatform(ua)).toBe(expected.platform);
      expect(detectPlatformVersion(ua)).toBe(expected.version);
      expect(detectBitness(ua)).toBe(expected.bitness);
      expect(detectWow64(ua)).toBe(expected.wow64);
    });
  }
});
