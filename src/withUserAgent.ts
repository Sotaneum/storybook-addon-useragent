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

  // Re-apply the user agent whenever the component changes to ensure it's properly applied
  const componentId = useMemo(() => context.id, [context.id]);

  useEffect(() => {
    let cleanup: (() => Promise<void>) | (() => void) = () => {};
    
    (async () => {
      try {
        // Always reset state before setting to ensure proper re-rendering
        setIsUserAgentSet(false);
        const cleanupFn = await setUserAgent(userAgent);
        cleanup = cleanupFn;
        setIsUserAgentSet(true);
      } catch (error) {
        console.error('Failed to set user agent:', error);
        setIsUserAgentSet(true); // Continue rendering even if an error occurs
      }
    })();
    
    return () => {
      // Handle cleanup function if it's a Promise
      if (cleanup instanceof Promise) {
        cleanup.catch(err => console.error('Error during cleanup:', err));
      } else {
        cleanup();
      }
      setIsUserAgentSet(false);
    };
  // Include componentId in dependencies to ensure effect runs when stories change
  }, [userAgent, componentId]);

  // Prioritize rendering when we have a user agent string
  // This avoids flashing with original user agent before custom one is applied
  if (userAgent && !isUserAgentSet) {
    // Return loading state while waiting for userAgent to be set
    return null;
  }
  
  return StoryFn();
}
