const beforeAgent = window.navigator.userAgent;

function updateUserAgent(userAgent: string) {
  Object.defineProperty(window.navigator, "userAgent", {
    get: () => userAgent,
    configurable: true,
  });
}

export default function setUserAgent(userAgent?: string) {
  updateUserAgent(userAgent ? userAgent : beforeAgent);
  return () => updateUserAgent(beforeAgent);
}
