const beforeAgent = window.navigator.userAgent;

function updateUserAgent(userAgent: string) {
  Object.defineProperty(window.navigator, "userAgent", {
    get: () => userAgent,
    configurable: true,
  });
}

export function setUserAgent(userAgent?: string) {
  updateUserAgent(userAgent ? userAgent : beforeAgent);
  return () => updateUserAgent(beforeAgent);
}

export function getUserAgent(args?: { [key: string]: string }) {
  return !args || !args["useragent"] ? "" : args["useragent"];
}
