export function getUserAgent(args?: { [key: string]: string }) {
  if (!args) {
    return "";
  }
  if (args["useragent"]) {
    return args["useragent"];
  }
  if (args["activeUserAgent"]) {
    console.warn(
      '"activeUserAgent" is an argument that will be removed in v6.4.0. Use "useragent".'
    );
    return args["activeUserAgent"];
  }
  return "";
}
