import React, { useMemo } from "react";

import { useGlobals, useParameter } from "@storybook/api";
import { TooltipLinkList } from "@storybook/components";

import { DEFAULT_USER_AGENT_PARAMETER } from "../constants";

import { TooltipProps, UserAgentParameter } from "../types";
import { Link } from "@storybook/components/dist/ts3.9/tooltip/TooltipLinkList";

export default function ({ onChange }: TooltipProps) {
  const [globals, updateGlobals] = useGlobals();
  const userAgentList: UserAgentParameter[] =
    useParameter("userAgent") || DEFAULT_USER_AGENT_PARAMETER;

  const { activeUserAgent } = globals;

  const handleClick = (userAgent: string) => {
    const newUserAgent = activeUserAgent !== userAgent ? userAgent : "";
    onChange(newUserAgent);
    updateGlobals({ activeUserAgent: newUserAgent });
  };

  const links: Link[] = useMemo(
    () =>
      userAgentList.map(({ name, userAgent }, idx) => {
        return {
          id: `${idx}_${name}`,
          title: name,
          active: userAgent === activeUserAgent,
          onClick: () => handleClick(userAgent),
        };
      }),
    [userAgentList, activeUserAgent]
  );

  return <TooltipLinkList links={links} />;
}
