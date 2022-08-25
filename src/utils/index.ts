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

export function toUserAgentDetail(userAgent: string): string[] {
  if (!userAgent) {
    return [];
  }
  let prev = "";
  return userAgent
    .split(/(\s?\(?[\w\/.,:;\s]+\)?\s?)/g)
    .reduce(
      (items, item) =>
        items.concat(
          ...(item.slice(0, 1) === "("
            ? [item.slice(1, item.length - 2)]
            : item.split(" "))
        ),
      []
    )
    .filter((item) => !!item)
    .reduce((items, item) => {
      if (item === "like") {
        prev = "like";
        return items;
      }
      if (prev === "") {
        return items.concat(item);
      }
      const newItem = `${prev} ${item}`;
      prev = "";
      return items.concat(newItem);
    }, []);
}
