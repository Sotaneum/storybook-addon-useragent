import type { UserAgentData, UserAgentArgs } from "./types";
import { parseUserAgent } from "./browser";
import { ARG_KEY } from "./constants";

let initialized = false;
let beforeAgent = "";
let originalNavigator: Navigator | undefined;
let seq = 0;

function ensureInitialized(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  beforeAgent = window.navigator.userAgent;
  originalNavigator = window.navigator;
}

async function applyNavigator(userAgent: string): Promise<void> {
  if (typeof window === "undefined" || !originalNavigator) return;

  // Tag this invocation. If a newer set() starts while we await below, we
  // discard our own result so the most recent call wins deterministically.
  const my = ++seq;

  let userAgentData: UserAgentData | undefined;
  if (originalNavigator.userAgentData) {
    try {
      const parsed = await parseUserAgent(userAgent);
      if (my !== seq) return;
      userAgentData = {
        ...originalNavigator.userAgentData,
        ...parsed,
        getHighEntropyValues: async () => parsed,
      };
    } catch (error) {
      console.warn("Failed to parse userAgent for userAgentData:", error);
    }
  }

  if (my !== seq) return;

  // Always proxy the original navigator so repeated set() calls don't
  // accumulate proxy chains.
  const proxy = new Proxy(originalNavigator, {
    get(target, prop) {
      if (prop === "userAgent") return userAgent;
      if (prop === "userAgentData" && userAgentData) return userAgentData;
      return Reflect.get(target, prop);
    },
  });

  if (typeof window.Navigator !== "function") return;

  try {
    Object.defineProperty(window, "navigator", {
      value: proxy,
      configurable: true,
      writable: true,
    });
  } catch (e) {
    console.warn("Unable to replace navigator object with proxy:", e);
    // Partial fallback: UA-only override on the existing navigator.
    // userAgentData stays untouched in this branch — see README/Troubleshooting.
    try {
      Object.defineProperty(window.navigator, "userAgent", {
        get: () => userAgent,
        configurable: true,
      });
    } catch (fallbackError) {
      console.warn("All UA spoofing methods failed:", fallbackError);
    }
  }
}

export async function set(userAgent?: string): Promise<void> {
  if (typeof window === "undefined") return;
  ensureInitialized();
  await applyNavigator(userAgent || beforeAgent);
}

export function getFromArgs(args?: UserAgentArgs): string {
  return args?.[ARG_KEY] ?? "";
}
