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

## Installation and Compatibility

| Storybook Version | Installation Command                   | Status                                     |
| ----------------- | -------------------------------------- | ------------------------------------------ |
| v8                | `npm i -D storybook-addon-useragent@8` | Current major version, actively maintained |
| v7                | `npm i -D storybook-addon-useragent@7` | Legacy support                             |
| v6                | `npm i -D storybook-addon-useragent@6` | Legacy support                             |

You can check for updates and upgrade to the latest version:

```bash
npm outdated
npm install storybook-addon-useragent@latest
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

## Browser Compatibility

This addon uses modern browser APIs to simulate user agents:

| Browser Category | Support Level | Browsers                        | Notes                                        |
| ---------------- | ------------- | ------------------------------- | -------------------------------------------- |
| **Full Support** | ✅            | Chrome 89+, Edge 89+, Opera 75+ | All features work as expected                |
| **Good Support** | ⚠️            | Firefox 90+, Safari 16.4+       | Most features work, some limitations         |
| **Limited**      | ⚠️            | Safari 15-16.3, Firefox 78-89   | UserAgent string works, Client Hints limited |
| **Minimal**      | ⚠️            | IE11, Legacy Edge               | Basic functionality only                     |

In browsers with limited support, the addon falls back to basic functionality while showing appropriate warnings.

## Performance Considerations

The UserAgent addon has minimal impact on Storybook performance:

- First-time initialization: ~5-20ms
- Subsequent UserAgent changes: ~1-5ms
- Memory usage: Negligible (<1MB)

In rare cases, changing UserAgent in rapid succession may cause temporary UI flickering. We recommend:

- Avoid changing UserAgent in loops
- Allow sufficient time between UserAgent changes (>100ms)
- Consider using the addon only in specific stories that require it

## Testing Across Environments

### Example Testing Workflow

This example shows how to test a responsive component across multiple devices:

```js
// ResponsiveComponent.stories.js
import { ResponsiveComponent } from "./ResponsiveComponent";

export default {
  title: "Components/ResponsiveComponent",
  component: ResponsiveComponent,
};

// Basic template
const Template = (args) => <ResponsiveComponent {...args} />;

// Create stories for different device types
export const Desktop = Template.bind({});
Desktop.args = {
  // Default desktop user agent is used
};

export const iPhone = Template.bind({});
iPhone.args = {
  useragent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
};

export const Android = Template.bind({});
Android.args = {
  useragent:
    "Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36",
};
```

You can then create a testing matrix to ensure your components work across browsers:

1. Test baseline functionality in your default browser
2. Use the UserAgent addon to test across different simulated environments
3. Verify with real devices for critical features

## Security Considerations

This addon modifies the `navigator` object to simulate different user agents. While we've implemented safeguards:

- Some browser security policies may restrict these modifications
- The addon uses proxies and fallback mechanisms when possible
- Changes are isolated to the Storybook iframe
- All modifications are reverted when the story changes

## Troubleshooting

### Common Issues

| Issue                                     | Possible Cause                   | Solution                                        |
| ----------------------------------------- | -------------------------------- | ----------------------------------------------- |
| UserAgent not changing                    | Browser security restrictions    | Try a different browser (Chrome works best)     |
| UI components not responding to UserAgent | Component not using UA detection | Ensure component checks navigator.userAgent     |
| Stories show error when changing UA       | Timing or cleanup issues         | Reload the story or check for errors in console |
| Inconsistent behavior                     | Caching or stale state           | Clear browser cache and restart Storybook       |

### Debugging Tips

If you encounter issues with the UserAgent addon:

1. Check browser console for errors
2. Verify UserAgent is actually changing by adding:
   ```js
   console.log(window.navigator.userAgent);
   ```
3. Test with a simple component first to isolate the issue
4. Try using the UserAgent addon in isolation (disable other addons)

## Real-world Use Cases

### Responsive Design Testing

Test how your components adapt to different device characteristics beyond just screen size:

```jsx
// DeviceResponsiveMenu.jsx
import React from "react";
import { useUserAgent } from "./useUserAgent";

export function DeviceResponsiveMenu({ items }) {
  const { isMobile, isTablet, isMacOS } = useUserAgent();

  // Adapt menu based on device type
  return (
    <nav className={`menu ${isMobile ? "mobile-menu" : "desktop-menu"}`}>
      {items.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          useShortText={isMobile}
          useTouchOptimized={isMobile || isTablet}
          useNativeControls={isMacOS}
        />
      ))}
    </nav>
  );
}
```

### Browser-specific Feature Detection

Conditionally enable features based on browser capability:

```jsx
function BrowserOptimizedVideo({ src }) {
  const userAgent = window.navigator.userAgent;
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

  return (
    <video
      src={src}
      controls
      playsInline={isSafari} // Safari-specific attribute
      format={isSafari ? "hls" : "dash"} // Different format based on browser
    />
  );
}
```

## Changelog and Updates

We maintain a detailed changelog of all versions and updates:

- [View the full CHANGELOG.md](https://github.com/Sotaneum/storybook-addon-useragent/blob/main/CHANGELOG.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Reporting Issues

If you encounter compatibility issues:

1. Check you're using the correct addon version for your Storybook version
2. Update to the latest patch version of the addon
3. Report the issue with details about your environment at:
   [GitHub Issues](https://github.com/Sotaneum/storybook-addon-useragent/issues)
