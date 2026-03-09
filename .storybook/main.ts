import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "storybook/addon-essentials",
    fileURLToPath(import.meta.resolve("./local-preset.ts")),
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  core: {
    disableTelemetry: true,
  },
  docs: {},
};
export default config;
