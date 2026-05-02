import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext,
} from "storybook/internal/types";

import { useEffect, useMemo, useState } from "storybook/preview-api";

import { setUserAgent, getUserAgent } from "./core";

export function withUserAgent(
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) {
  const [isUserAgentSet, setIsUserAgentSet] = useState(false);

  const userAgent = useMemo(
    () => getUserAgent(context.args),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context.args?.useragent],
  );

  useEffect(() => {
    let cancelled = false;
    let cleanupFn: (() => Promise<void> | void) | null = null;

    setIsUserAgentSet(false);

    setUserAgent(userAgent)
      .then((fn) => {
        if (cancelled) {
          const r = fn();
          if (r instanceof Promise) r.catch(() => {});
          return;
        }
        cleanupFn = fn;
        setIsUserAgentSet(true);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to set user agent:", error);
        setIsUserAgentSet(true);
      });

    return () => {
      cancelled = true;
      if (cleanupFn) {
        const r = cleanupFn();
        if (r instanceof Promise) {
          r.catch((err) => console.error("Error during cleanup:", err));
        }
      }
    };
  }, [userAgent, context.id]);

  if (userAgent && !isUserAgentSet) {
    return null;
  }

  return StoryFn();
}
