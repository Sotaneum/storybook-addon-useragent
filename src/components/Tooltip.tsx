import React, { useMemo } from "react";

import { useArgs, useParameter } from "@storybook/api";
import { TooltipLinkList } from "@storybook/components";

import { PARAM_KEY } from "../constants";
import { DEFAULT_USER_AGENT_PARAMETER } from "../defaults";

import { Link, UserAgentParameter } from "../types";
import { getUserAgent } from "../utils";

export default function Tooltip() {
  const [args, updateArgs] = useArgs();
  const userAgentList = getUserAgentList();
  const currentUserAgent = getUserAgent(args);

  const handleClick = (userAgent?: string) => {
    updateArgs({ useragent: currentUserAgent !== userAgent ? userAgent : "" });
  };

  const links: Link[] = useMemo(
    () =>
      userAgentList.map(({ name, userAgent }, idx) => {
        return {
          id: `${idx}_${name}`,
          title: name,
          active: userAgent === currentUserAgent,
          onClick: () => handleClick(userAgent),
        };
      }),
    [userAgentList, currentUserAgent]
  );

  return <TooltipLinkList links={links} />;
}

function getUserAgentList(): UserAgentParameter[] {
  const fromParameter = useParameter(PARAM_KEY);
  if (Array.isArray(fromParameter) && fromParameter.length > 0) {
    return fromParameter;
  }
  return DEFAULT_USER_AGENT_PARAMETER;
}
