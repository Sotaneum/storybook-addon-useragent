import React, { useCallback, useMemo } from "react";

import { useArgs, useParameter } from "@storybook/api";
import { TooltipLinkList } from "@storybook/components";

import { PARAM_KEY } from "../constants";
import { DEFAULT_USER_AGENT_PARAMETER } from "../defaults";

import { Link, UserAgentParameter } from "../types";
import { getUserAgent } from "../utils";

export default function Tooltip() {
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

  return <TooltipLinkList links={links} />;
}

function getUserAgentList(): UserAgentParameter[] {
  const fromParameter = useParameter(PARAM_KEY);
  if (Array.isArray(fromParameter) && fromParameter.length > 0) {
    return fromParameter;
  }
  return DEFAULT_USER_AGENT_PARAMETER;
}
