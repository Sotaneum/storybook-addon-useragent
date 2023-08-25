module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
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
