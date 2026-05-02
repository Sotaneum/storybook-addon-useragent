import type { Preview } from "@storybook/react";
import { customUserAgents } from "./userAgent";

const preview: Preview = {
  parameters: {
    userAgent: customUserAgents,
  },
};

export default preview;
