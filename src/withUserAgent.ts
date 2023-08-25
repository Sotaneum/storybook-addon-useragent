import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext,
} from "@storybook/types";

import { useEffect } from "@storybook/preview-api";

import setUserAgent from "./core";

import { getUserAgent } from "./utils";

export function withUserAgent(
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>
) {
  const userAgent = getUserAgent(context.args);

  useEffect(() => setUserAgent(userAgent), [userAgent]);

  return StoryFn();
}
