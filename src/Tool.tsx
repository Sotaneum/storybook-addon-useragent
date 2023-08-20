import React from "react";

import { useArgs } from "@storybook/api";
import { WithTooltip, IconButton } from "@storybook/components";

import Tooltip from "./components/Tooltip";

import { TOOL_ID } from "./constants";

export const Tool = () => {
  const [args] = useArgs();

  const { activeUserAgent } = args;

  return (
    <WithTooltip
      key={TOOL_ID}
      placement="bottom"
      trigger="click"
      tooltip={<Tooltip />}
    >
      <IconButton active={!!activeUserAgent} title="Change UserAgent">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </IconButton>
    </WithTooltip>
  );
};
