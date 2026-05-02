import type { Renderer, ProjectAnnotations } from "storybook/internal/types";
import { PARAM_KEY } from "./constants";
import { setUserAgent, getUserAgent } from "./core";

const preview: ProjectAnnotations<Renderer> = {
  loaders: [
    async ({ args }) => {
      await setUserAgent(getUserAgent(args));
      return {};
    },
  ],
  initialGlobals: { [PARAM_KEY]: false },
};

export default preview;
