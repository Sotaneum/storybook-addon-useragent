import type { UserAgentData, UserAgentArgs } from "./types";
import { parseUserAgent } from "./browser";

let currentUserAgent =
  typeof window !== "undefined" ? window.navigator.userAgent : "";

const beforeAgent =
  typeof window !== "undefined" ? window.navigator.userAgent : "";

if (typeof window !== "undefined") {
  (async () => {
    try {
      const initialParsedData = await parseUserAgent(beforeAgent);

      if (window.navigator.userAgentData) {
        setUserAgentData(initialParsedData);
      }
    } catch (error) {
      console.warn("Failed to initialize consistent userAgentData:", error);
    }
  })();
}

function setUserAgentData(parsedData: Partial<UserAgentData>): void {
  if (!window.navigator.userAgentData) return;

  Object.defineProperty(window.navigator, "userAgentData", {
    get: () => ({
      ...parsedData,
      getHighEntropyValues: async () => parsedData,
    }),
    configurable: true,
  });
}

async function updateUserAgent(userAgent: string): Promise<void> {
  if (typeof window === "undefined") return;

  Object.defineProperty(window.navigator, "userAgent", {
    get: () => userAgent,
    configurable: true,
  });

  if (window.navigator.userAgentData) {
    const parsedData = await parseUserAgent(userAgent);
    setUserAgentData(parsedData);
  }
}

export async function set(userAgent?: string): Promise<() => Promise<void>> {
  if (typeof window === "undefined") return async () => {};

  if (!userAgent) {
    currentUserAgent = beforeAgent;
    await updateUserAgent(beforeAgent);
    return async () => {};
  }

  currentUserAgent = userAgent;
  await updateUserAgent(userAgent);

  return async () => {
    await updateUserAgent(currentUserAgent);
  };
}

export function getFromArgs(args?: UserAgentArgs): string {
  return args?.useragent || "";
}
