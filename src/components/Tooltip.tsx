import React, { useMemo } from 'react';

import { useArgs, useParameter } from '@storybook/api';
import { TooltipLinkList } from '@storybook/components';

import { PARAM_KEY, DEFAULT_USER_AGENT_PARAMETER } from '../constants';

import { Link, TooltipProps, UserAgentParameter } from '../types';

export default function Tooltip({ onChange }: TooltipProps) {
  const [args = {}, updateArgs] = useArgs();
  const userAgentList = getUserAgentList();
  const { activeUserAgent } = args;

  const handleClick = (userAgent: string) => {
    const newUserAgent = activeUserAgent !== userAgent ? userAgent : '';
    onChange(newUserAgent);
    updateArgs({ activeUserAgent: newUserAgent });
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

function getUserAgentList(): UserAgentParameter[] {
  const fromParameter = useParameter(PARAM_KEY);
  if (Array.isArray(fromParameter) && fromParameter.length > 0) {
    return fromParameter;
  }
  return DEFAULT_USER_AGENT_PARAMETER;
}
