import { addons, types } from "@storybook/addons";

import { Tool } from "../Tool";
import { Panel } from "../Panel";

import { ADDON_ID, TOOL_ID, PANEL_ID } from "../constants";

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "UserAgent",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: Tool,
  });

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "User Agent",
    match: ({ viewMode }) => viewMode === "story",
    render: Panel,
  });
});
