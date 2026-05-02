import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["./local-preset.cjs"],
  framework: { name: "@storybook/react-vite", options: {} },
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
  docs: {},
};
export default config;
