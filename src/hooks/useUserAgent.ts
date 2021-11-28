import { useMemo, useCallback } from 'react'

import { changeUserAgent } from '../utils';

import { LOG_MESSAGE } from '../constants';

export default function (iframe: HTMLIFrameElement) {
  const beforeAgent = useMemo(() => window.navigator.userAgent, []);

  const change = useCallback(
    (userAgent: string): void => {
      if (!userAgent || userAgent === '') {
        return change(beforeAgent);
      }
      changeUserAgent(userAgent, iframe);
      console.log(LOG_MESSAGE, userAgent)
    },
    [iframe, beforeAgent],
  );

  return change;
}
