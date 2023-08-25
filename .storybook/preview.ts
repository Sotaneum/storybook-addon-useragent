import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
};

export default preview;
