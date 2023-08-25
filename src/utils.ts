export function getUserAgent(args?: { [key: string]: string }) {
  return !args || !args["useragent"] ? args["useragent"] : "";
}
