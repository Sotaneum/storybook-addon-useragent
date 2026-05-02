import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [],
  framework: { name: "@storybook/react-vite", options: {} },
  addons: ["storybook-addon-useragent", "@storybook/addon-docs"],
};

export default config;
