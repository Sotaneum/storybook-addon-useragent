import React from "react";

import { RenderOptions } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";

import PanelContent from "./components/PanelContent";

export const Panel: React.FC<RenderOptions> = ({ key, active }) => (
  <AddonPanel key={key} active={active}>
    <PanelContent />
  </AddonPanel>
);
