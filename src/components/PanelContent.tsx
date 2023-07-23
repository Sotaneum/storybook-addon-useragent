import React from 'react';

import { useArgs } from '@storybook/api';

import UserAgent from './UserAgent';

export default function PanelContent() {
  const [args = {}] = useArgs();
  const { activeUserAgent } = args;

  return (
    <>
      <UserAgent name="iframe" userAgent={activeUserAgent} />
      <UserAgent name="Window" userAgent={window?.navigator?.userAgent} />
    </>
  );
}
