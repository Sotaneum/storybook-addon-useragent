module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "./local-preset.js",
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
      },
    },
  ],
};
