import React from 'react';

import { themes, convert } from '@storybook/theming';
import { Icons } from '@storybook/components';

export default function ArrowIcon({ open = false }) {
  return (
    <Icons
      icon="arrowdown"
      color={convert(themes.normal).appBorderColor}
      style={{
        height: 10,
        width: 10,
        minWidth: 10,
        marginRight: 10,
        transition: 'transform 0.1s ease-in-out',
        alignSelf: 'center',
        display: 'inline-flex',
        transform: `rotate(${open ? 0 : -90}deg)`,
      }}
    />
  );
}
