import React, { useCallback, useMemo } from "react";

import { useArgs, useParameter } from "@storybook/api";
import {
  WithTooltip,
  IconButton,
  TooltipLinkList,
} from "@storybook/components";

import { getUserAgent } from "../utils";

import { PARAM_KEY, TOOL_ID } from "../constants";
import { DEFAULT_USER_AGENT_PARAMETER } from "../defaults";

import { Link, UserAgentParameter } from "../types";

export const Tool = () => {
  const [args, updateArgs] = useArgs();
  const currentUserAgent = getUserAgent(args);
  const userAgentList = getUserAgentList();

  const setAgent = useCallback(
    (userAgent?: string) => {
      updateArgs({
        useragent: currentUserAgent !== userAgent ? userAgent : "",
      });
    },
    [updateArgs, currentUserAgent]
  );

  const links: Link[] = useMemo(() => {
    const items = userAgentList.map(({ name, userAgent }, idx) => {
      return {
        id: `${idx}_${name}`,
        title: name,
        active: userAgent === currentUserAgent,
        onClick: () => setAgent(userAgent),
      };
    });

    const hasActive = items.some(({ active }) => active);
    const isCustomSelected = !!currentUserAgent && !hasActive;

    if (isCustomSelected) {
      items.push({
        id: "custom agent",
        title: "custom agent",
        active: true,
        onClick: () => setAgent(currentUserAgent),
      });
    }

    return items;
  }, [setAgent, userAgentList, currentUserAgent]);

  return (
    <WithTooltip
      key={TOOL_ID}
      placement="bottom"
      trigger="click"
      tooltip={<TooltipLinkList links={links} />}
    >
      <IconButton active={currentUserAgent.length > 0} title="Change UserAgent">
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

function getUserAgentList(): UserAgentParameter[] {
  const fromParameter = useParameter(PARAM_KEY);
  if (Array.isArray(fromParameter) && fromParameter.length > 0) {
    return fromParameter;
  }
  return DEFAULT_USER_AGENT_PARAMETER;
}
