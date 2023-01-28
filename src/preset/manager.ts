import { addons, types } from "@storybook/addons";

import { Tool } from "../Tool";
import { Panel } from "../Panel";

import {
  TOOL_ID,
  ADDON_ID,
  PANEL_ID,
  PARAM_KEY,
  TOOL_TITLE,
  PANEL_TITLE,
} from "../constants";

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: TOOL_TITLE,
    paramKey: PARAM_KEY,
    match: ({ viewMode }) => !!viewMode?.match(/^(story|docs)$/),
    render: Tool,
  });

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: PANEL_TITLE,
    paramKey: PARAM_KEY,
    match: ({ viewMode }) => viewMode === "story",
    render: Panel,
  });
});
