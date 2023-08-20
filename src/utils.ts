export function getUseragent(args?: { [key: string]: string }) {
  if (!args) {
    return "";
  }
  if (args["useragent"]) {
    return args["useragent"];
  }
  if (args["activeUserAgent"]) {
    console.warn(
      '"activeUserAgent" is the args that will be removed soon. Please use "useragent".'
    );
    return args["activeUserAgent"];
  }
  return "";
}
