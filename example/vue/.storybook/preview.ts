import type { Preview } from "@storybook/vue3";
import { customUserAgents } from "./userAgent";

const preview: Preview = {
  parameters: {
    userAgent: customUserAgents,
  },
};

export default preview;
