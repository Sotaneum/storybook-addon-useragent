import type { Renderer, ProjectAnnotations } from "@storybook/types";
import { PARAM_KEY } from "./constants";
import { withUserAgent } from "./withUserAgent";

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withUserAgent],
  initialGlobals: { [PARAM_KEY]: false },
};

export default preview;
