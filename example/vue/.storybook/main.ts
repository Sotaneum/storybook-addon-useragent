import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../stories/*.stories.ts"],
  framework: { name: "@storybook/vue3-vite", options: {} },
  addons: ["storybook-addon-useragent", "@storybook/addon-docs"],
};

export default config;
