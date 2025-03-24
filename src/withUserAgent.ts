import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext,
} from "@storybook/types";

import { useEffect } from "@storybook/preview-api";

import { setUserAgent, getUserAgent } from "./core";

export function withUserAgent(
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) {
  const userAgent = getUserAgent(context.args);

  useEffect(() => setUserAgent(userAgent), [userAgent]);

  return StoryFn();
}
