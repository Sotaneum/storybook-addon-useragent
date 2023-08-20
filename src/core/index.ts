const beforeAgent = window.navigator.userAgent;

export default function setUserAgent(userAgent?: string) {
  Object.defineProperty(window.navigator, "userAgent", {
    get: () => (userAgent ? userAgent : beforeAgent),
    configurable: true,
  });
}
