import React, { useState } from "react";

import { styled, themes, convert } from "@storybook/theming";

import ArrowIcon from "./ArrowIcon";

import { toUserAgentDetail } from "../utils";

const Box = styled.div({
  display: "flex",
  width: "100%",
  borderBottom: `1px solid ${convert(themes.normal).appBorderColor}`,
  "&:hover": {
    background: convert(themes.normal).background.hoverable,
  },
  alignItems: "flex-start",
  flexDirection: "column",
});

const Header = styled.div({
  padding: convert(themes.normal).layoutMargin,
  paddingLeft: convert(themes.normal).layoutMargin - 3,
  background: "none",
  color: "inherit",
  textAlign: "left",
  cursor: "pointer",
  borderLeft: "3px solid transparent",
  width: "100%",

  "&:focus": {
    outline: "0 none",
    borderLeft: `3px solid ${convert(themes.normal).color.secondary}`,
  },
});

const Data = styled.div({
  padding: convert(themes.normal).layoutMargin,
  marginLeft: convert(themes.normal).layoutMargin + 10,
  marginBottom: convert(themes.normal).layoutMargin,
  fontStyle: "italic",
});

interface UserAgentInfoProps {
  name: string;
  navigator?: Window["navigator"];
}

export default function ({ name, navigator }: UserAgentInfoProps) {
  const [open, setOpen] = useState(false);
  const userAgent = navigator?.userAgent;
  return (
    <Box>
      <Header onClick={() => setOpen(!open)}>
        {!!userAgent && <ArrowIcon open={open} />}
        {`${name} > ${
          userAgent
            ? userAgent.replace(/^([\w\/\s\.(;),]{0,50}).+/, "$1...")
            : "None"
        }`}
      </Header>
      {!!userAgent &&
        open &&
        toUserAgentDetail(userAgent).map((text, idx) => (
          <Data key={idx}>{text}</Data>
        ))}
    </Box>
  );
}
