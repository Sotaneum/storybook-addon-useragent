import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext,
} from "@storybook/types";

import { useEffect, useMemo, useState } from "@storybook/preview-api";

import { setUserAgent, getUserAgent } from "./core";

export function withUserAgent(
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) {
  const [isUserAgentSet, setIsUserAgentSet] = useState(false);

  const userAgent = useMemo(
    () => getUserAgent(context.args),
    [context.args?.useragent],
  );

  const componentId = useMemo(() => context.id, [context.id]);

  useEffect(() => {
    let cleanup: (() => Promise<void>) | (() => void) = () => {};

    (async () => {
      try {
        setIsUserAgentSet(false);
        const cleanupFn = await setUserAgent(userAgent);
        cleanup = cleanupFn;
        setIsUserAgentSet(true);
      } catch (error) {
        console.error("Failed to set user agent:", error);
        setIsUserAgentSet(true);
      }
    })();

    return () => {
      if (cleanup instanceof Promise) {
        cleanup.catch((err) => console.error("Error during cleanup:", err));
      } else {
        cleanup();
      }
      setIsUserAgentSet(false);
    };
  }, [userAgent, componentId]);

  if (userAgent && !isUserAgentSet) {
    return null;
  }

  return StoryFn();
}
