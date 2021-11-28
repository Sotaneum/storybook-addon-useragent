import { STORYBOOK_IFRAME_ID } from '../constants';

export function changeUserAgent(userAgent: string, iframe: HTMLIFrameElement) {
  Object.defineProperty(iframe.contentWindow.navigator, "userAgent", {
    get: function () {
      return userAgent
    },
    configurable: true,
  })
}

export function fetchIFrame(): HTMLIFrameElement {
  const iframe = document.getElementById(
    STORYBOOK_IFRAME_ID
  );
  if (!iframe) {
    return null;
  }
  return iframe as HTMLIFrameElement;
}

export function toUserAgentDetail(userAgent: string): string[] {
  if (!userAgent) {
    return []
  }
  let prev = ""
  return userAgent
    .split(/(\s?\(?[\w\/.,:;\s]+\)?\s?)/g)
    .reduce((items, item) => {
      if (item.slice(0, 1) === "(") {
        return items.concat(item.slice(1, item.length - 2));
      }
      return items.concat(...item.split(" "));
    }, [])
    .filter((item) => !!item)
    .reduce((items, item) => {
      if (item === "like") {
        prev = "like";
        return items;
      }
      if (prev !== "") {
        const newItem = `${prev} ${item}`;
        prev = ""
        return items.concat(newItem);
      }
      return items.concat(item);
    }, [])
};
