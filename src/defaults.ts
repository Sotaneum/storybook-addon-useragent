import { UserAgentParameter } from "./types";

export const DEFAULT_USER_AGENT_PARAMETER: UserAgentParameter[] = [
  {
    name: "iOS_12.2-Safari_604.1",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1",
  },
  {
    name: "Windows_10-IE_11",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
  },
  {
    name: "macOS_10.15.6-Safari_14",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
  },
  {
    name: "Android_10-Chrome_91",
    userAgent:
      "Mozilla/5.0 (Linux; Android 10; Android SDK built for x86) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
  },
];
