import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../stories/*.stories.ts"],
  addons: ["storybook/addon-essentials", "storybook-addon-useragent"],
  framework: { name: "@storybook/react-vite", options: {} },
  docs: {
    autodocs: "tag",
  },
};
export default config;
