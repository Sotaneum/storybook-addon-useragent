const stories = require("./stories");
const framework = require("./framework");

module.exports = {
  stories,
  framework,
  addons: ["storybook-addon-useragent", "@storybook/addon-docs"],
  docs: {
    //👇 See the table below for the list of supported options
    autodocs: "tag",
  },
};
