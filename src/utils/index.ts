import { STORYBOOK_INLINE_FRAME_ID } from "../constants";

export function getInlineFrame(): HTMLIFrameElement {
  return document.getElementById(
    STORYBOOK_INLINE_FRAME_ID
  ) as HTMLIFrameElement;
}

export function changeUserAgent(userAgent: string, iframe: HTMLIFrameElement) {
  if (iframe === null) {
    return console.error(
      "storybook-addon-userAgent: The userAgent value cannot be changed because the iframe cannot be found. Leave an issue at https://github.com/Sotaneum/storybook-addon-useragent/issues!"
    );
  }
  Object.defineProperty(iframe.contentWindow.navigator, "userAgent", {
    get: function () {
      return userAgent;
    },
    configurable: true,
  });
}
