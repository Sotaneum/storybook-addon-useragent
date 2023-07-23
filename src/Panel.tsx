import React from 'react';

import { AddonPanel } from '@storybook/components';

import PanelContent from './components/PanelContent';

export const Panel: React.FC<{ key: string; active: boolean }> = ({
  key,
  active,
}) => (
  <AddonPanel key={key} active={active}>
    <PanelContent />
  </AddonPanel>
);
