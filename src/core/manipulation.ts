import type { UserAgentData, UserAgentArgs } from "./types";
import { parseUserAgent } from "./browser";

let currentUserAgent =
  typeof window !== "undefined" ? window.navigator.userAgent : "";

const beforeAgent =
  typeof window !== "undefined" ? window.navigator.userAgent : "";

let originalNavigator: Navigator | undefined;
if (typeof window !== "undefined") {
  originalNavigator = window.navigator;

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
  if (typeof window === "undefined" || !window.navigator.userAgentData) return;

  try {
    const userAgentDataProxy = {
      ...window.navigator.userAgentData,
      ...parsedData,
      getHighEntropyValues: async () => parsedData,
    };

    const navigatorProxy = new Proxy(window.navigator, {
      get(target, prop) {
        if (prop === "userAgentData") {
          return userAgentDataProxy;
        }
        return Reflect.get(target, prop);
      },
    });

    if (window.Navigator && typeof window.Navigator === "function") {
      try {
        Object.defineProperty(window, "navigator", {
          value: navigatorProxy,
          configurable: true,
          writable: true,
        });
      } catch (e) {
        console.warn("Unable to replace navigator object with proxy:", e);
      }
    }
  } catch (error) {
    console.warn("Failed to set userAgentData safely:", error);
  }
}

async function updateUserAgent(userAgent: string): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const navigatorProxy = new Proxy(window.navigator, {
      get(target, prop) {
        if (prop === "userAgent") {
          return userAgent;
        }
        return Reflect.get(target, prop);
      },
    });

    if (window.Navigator && typeof window.Navigator === "function") {
      try {
        Object.defineProperty(window, "navigator", {
          value: navigatorProxy,
          configurable: true,
          writable: true,
        });
      } catch (e) {
        console.warn("Unable to replace navigator object with proxy:", e);

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

    if (window.navigator.userAgentData) {
      const parsedData = await parseUserAgent(userAgent);
      setUserAgentData(parsedData);
    }
  } catch (error) {
    console.warn("Failed to update userAgent safely:", error);
  }
}

export async function set(userAgent?: string): Promise<() => Promise<void>> {
  if (typeof window === "undefined") return async () => {};

  try {
    if (!userAgent) {
      currentUserAgent = beforeAgent;
      await updateUserAgent(beforeAgent);
      return async () => {};
    }

    currentUserAgent = userAgent;
    await updateUserAgent(userAgent);

    return async () => {
      try {
        if (originalNavigator) {
          Object.defineProperty(window, "navigator", {
            value: originalNavigator,
            configurable: true,
            writable: true,
          });
        } else {
          await updateUserAgent(currentUserAgent);
        }
      } catch (error) {
        console.warn("Failed to restore original navigator:", error);
        await updateUserAgent(currentUserAgent);
      }
    };
  } catch (error) {
    console.warn("Error in userAgent setting process:", error);
    return async () => {};
  }
}

export function getFromArgs(args?: UserAgentArgs): string {
  return args?.useragent || "";
}
