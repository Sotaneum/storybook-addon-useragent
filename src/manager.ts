import { addons, types } from "@storybook/addons";

import { Tool } from "./components/Tool";

import { TOOL_ID, ADDON_ID, PARAM_KEY, TOOL_TITLE } from "./constants";

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: TOOL_TITLE,
    paramKey: PARAM_KEY,
    match: ({ viewMode }) => !!viewMode?.match(/^(story|docs)$/),
    render: Tool,
  });
});
