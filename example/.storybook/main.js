module.exports = {
  stories: ["../stories/*.stories.jsx"],
  addons: ["@storybook/addon-essentials", "storybook-addon-useragent"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
