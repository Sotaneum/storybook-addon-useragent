import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../stories/*.stories.ts"],
  framework: { name: "@storybook/react-vite", options: {} },
  addons: ["storybook-addon-useragent", "@storybook/addon-docs"],
};

export default config;
