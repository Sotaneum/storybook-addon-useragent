<p align="center">
  <img src="docs/assets/logo.png" width="200" alt="user-agent logo">
</p>
<h1 align="center">UserAgent Storybook Addon</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/storybook-addon-useragent">
    <img src="https://badgen.net/npm/v/storybook-addon-useragent" alt="npm version" />
  </a>
  <a href="https://npmjs.com/package/storybook-addon-useragent">
    <img src="https://badgen.net/npm/dy/storybook-addon-useragent" alt="npm package yearly downloads" />
  </a>
  <a href="https://lbesson.mit-license.org/">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
  </a>
  <a href="https://Sotaneum.github.io/storybook-addon-useragent/">
    <img src="https://img.shields.io/badge/Demo-Storybook-pink.svg" alt="Demo" />
  </a>
</p>

## Features

- Test and simulate different user agents directly in Storybook
- Display content differently based on device and browser detection
- Go beyond simple screen-size based device detection with actual UserAgent parsing
- Use without installing additional dependencies
- Support for modern User-Agent Client Hints API for more accurate browser and device detection

## Support

| Storybook Version | Addon Version                          |
| ----------------- | -------------------------------------- |
| v8                | `npm i -D storybook-addon-useragent@8` |
| v7                | `npm i -D storybook-addon-useragent@7` |
| v6                | `npm i -D storybook-addon-useragent@6` |

## Installation

Using npm:

```sh
npm install storybook-addon-useragent --save-dev
```

Using yarn:

```sh
yarn add storybook-addon-useragent --dev
```

## Setup

Add the addon to your Storybook configuration in `.storybook/main.js` (or `.storybook/main.ts`):

```js
export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    // Other addons...
    "storybook-addon-useragent",
  ],
};
```

## Usage

### Basic Usage

Once installed, the UserAgent addon will appear in your Storybook UI. You can select from a list of predefined user agents to simulate different browsers and devices.

### Customizing UserAgent List

You can customize the list of user agents available in the addon by creating a configuration file:

`.storybook/userAgent.js`:

```js
export const customUserAgents = [
  {
    name: "Windows_7-IE_11",
    userAgent:
      "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
  },
  // Add more custom user agents as needed
];
```

Then import and use it in your `.storybook/preview.js` file:

```js
import { customUserAgents } from "./userAgent";

export const parameters = {
  // Other parameters...
  userAgent: customUserAgents,
};
```

### Set Default UserAgent in Stories

You can set a default UserAgent for individual stories:

```js
import React from "react";
import { UserAgentExample } from "./UserAgentExample";

export default {
  title: "Example/UserAgentExample",
  component: UserAgentExample,
  argTypes: { useragent: { control: "text" } },
};

const Template = (args) => <UserAgentExample {...args} />;

export const IOS = Template.bind({});
IOS.args = {
  useragent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1",
};
```

## Client Hints Support

This addon supports the User-Agent Client Hints API, which is a more modern and privacy-preserving way to get browser and device information than the traditional user agent string.

### Available Client Hints Information:

- Browser information (brand, version)
- Platform information (platform, platformVersion)
- Architecture information (architecture, bitness)
- Mobile status detection
- Device model information

The addon automatically uses Client Hints in modern browsers while falling back to traditional User-Agent string parsing in older browsers.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
