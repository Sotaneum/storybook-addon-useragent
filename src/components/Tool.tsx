import React, { useCallback, useMemo } from "react";

import { useArgs, useParameter } from "storybook/manager-api";
import {
  PopoverProvider,
  TooltipLinkList,
  ToggleButton,
} from "storybook/internal/components";

import { getUserAgent } from "../core";

import { ARG_KEY, PARAM_KEY } from "../constants";
import { DEFAULT_USER_AGENT_PARAMETER } from "../defaults";

import { Link, UserAgentParameter } from "../types";
import Icon from "./Icon";

const OFF_ID = "__off__";

function useUserAgentList(): UserAgentParameter[] {
  const fromParameter = useParameter<UserAgentParameter[]>(PARAM_KEY);
  return useMemo(() => {
    // Respect explicit empty arrays — only fall back when undefined.
    if (Array.isArray(fromParameter)) {
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
    (userAgent: string) => {
      updateArgs({ [ARG_KEY]: userAgent });
    },
    [updateArgs],
  );

  const links: Link[] = useMemo(() => {
    // First-match-wins: avoid double-active when the list contains duplicate UAs.
    const activeIdx = userAgentList.findIndex(
      ({ userAgent }) => userAgent === currentUserAgent,
    );

    const items: Link[] = userAgentList.map(({ name, userAgent }, idx) => ({
      id: `${idx}_${name}`,
      title: name,
      active: idx === activeIdx,
      onClick: () => setAgent(userAgent),
    }));

    const isCustomSelected = !!currentUserAgent && activeIdx === -1;

    if (isCustomSelected) {
      items.push({
        id: "custom agent",
        title: "custom agent",
        active: true,
        onClick: () => setAgent(currentUserAgent),
      });
    }

    if (currentUserAgent) {
      items.unshift({
        id: OFF_ID,
        title: "Reset (browser default)",
        active: false,
        onClick: () => setAgent(""),
      });
    }

    return items;
  }, [setAgent, userAgentList, currentUserAgent]);

  return (
    <PopoverProvider
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
