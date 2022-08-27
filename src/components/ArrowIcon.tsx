import React from "react";

import { styled, themes, convert } from "@storybook/theming";
import { Icons, IconsProps } from "@storybook/components";

const Icon = styled(Icons)<IconsProps>({
  height: 10,
  width: 10,
  minWidth: 10,
  color: convert(themes.normal).color.mediumdark,
  marginRight: 10,
  transition: "transform 0.1s ease-in-out",
  alignSelf: "center",
  display: "inline-flex",
});

export default function ArrowIcon({ open = false }) {
  return (
    <Icon
      icon="chevrondown"
      color={convert(themes.normal).appBorderColor}
      style={{
        transform: `rotate(${open ? 0 : -90}deg)`,
      }}
    />
  );
}
