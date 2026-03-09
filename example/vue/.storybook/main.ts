import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../stories/*.stories.ts"],
  addons: ["storybook/addon-essentials", "storybook-addon-useragent"],
  framework: { name: "@storybook/vue3-vite", options: {} },
  docs: {
    autodocs: "tag",
  },
};
export default config;
