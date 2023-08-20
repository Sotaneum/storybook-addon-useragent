import { useMemo, useCallback } from "react";

import { changeUserAgent } from "./utils";

export default function (iframe?: HTMLIFrameElement) {
  const beforeAgent = useMemo(() => window.navigator.userAgent, []);

  const change = useCallback(
    (userAgent: string): void =>
      userAgent ? changeUserAgent(userAgent, iframe) : change(beforeAgent),
    [iframe]
  );

  return change;
}
