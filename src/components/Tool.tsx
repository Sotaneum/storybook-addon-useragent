import React, { useCallback, useMemo } from "react";

import { useArgs, useParameter } from "storybook/manager-api";
import {
  PopoverProvider,
  TooltipLinkList,
  ToggleButton,
} from "storybook/internal/components";

import { getUserAgent } from "../core";

import { PARAM_KEY, TOOL_ID } from "../constants";
import { DEFAULT_USER_AGENT_PARAMETER } from "../defaults";

import { Link, UserAgentParameter } from "../types";
import Icon from "./Icon";

function useUserAgentList(): UserAgentParameter[] {
  const fromParameter = useParameter<UserAgentParameter[]>(PARAM_KEY);
  return useMemo(() => {
    if (Array.isArray(fromParameter) && fromParameter.length > 0) {
      return fromParameter;
    }
    return DEFAULT_USER_AGENT_PARAMETER;
  }, [fromParameter]);
}

export function Tool() {
  const [args, updateArgs] = useArgs();
  const currentUserAgent = getUserAgent(args);
  const userAgentList = useUserAgentList();

  const setAgent = useCallback(
    (userAgent?: string) => {
      updateArgs({
        useragent: currentUserAgent !== userAgent ? userAgent : "",
      });
    },
    [updateArgs, currentUserAgent],
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
    <PopoverProvider
      key={TOOL_ID}
      placement="bottom"
      ariaLabel="User-Agent options"
      hasChrome={false}
      popover={<TooltipLinkList links={links} />}
    >
      <ToggleButton
        pressed={currentUserAgent.length > 0}
        ariaLabel="Change UserAgent"
        padding="small"
        variant="ghost"
      >
        <Icon />
      </ToggleButton>
    </PopoverProvider>
  );
}

Tool.displayName = "UserAgentTool";
