<p align="center">
  <img src="docs/assets/logo.png" width="200">
</p>
<h1 align="center">UserAgent Storybook Addon</h1>

## Features

- Screens displayed differently depending on `UserAgent` can also be configured in Storybook.
- Beyond simply analyzing whether or not mobile is based on the screen size, the page itself can be recognized as mobile.
- You can use it without installing additional libraries.

[Storybook Demo](https://Sotaneum.github.io/storybook-addon-useragent/)

## Installing and Setup

npm:

```sh
npm i storybook-addon-useragent -D
```

  yarn:

```sh
yarn add storybook-addon-useragent -D
```

### Add it to addons in `.storybook/main.js`.

```js
module.exports = {
  ...
  addons: [..., "storybook-addon-useragent"],
  ...
};
```

## Usage

### Customize list

You can change the list item to any data you want.

`.storybook/userAgent.js`
```js
export const customUserAgents = [
  {
    name: "Windows_7-IE_11",
    userAgent:
      "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
  },
];
```
`.storybook/preview.js`
```js
import { customUserAgents } from "./userAgent";

export const parameters = {
  userAgent: customUserAgents,
};
```

### Set as default in `stories`

You can specify a default UserAgent value for story.

Items not in the list can also be specified.

```js
import React from "react";
import { Button } from "./Button";

export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    myAddonParameter: `
<MyComponent boolProp scalarProp={1} complexProp={{ foo: 1, bar: '2' }}>
  <SomeOtherComponent funcProp={(a) => a.id} />
</MyComponent>
`,
  },
};

const Template = (args) => <Button {...args} />;

export const IOS = Template.bind({});
IOS.args = {
  activeUserAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1",
};
```

