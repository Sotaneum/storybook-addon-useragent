import React, { useState, useEffect } from "react";

import { StoryContext } from "@storybook/addons";

export default function (StoryFn: React.FC, context: StoryContext) {
  const nowUserAgent = context?.globals?.activeUserAgent;
  const [key, setKey] = useState(Date.now());
  const [userAgent, setUserAgent] = useState(nowUserAgent);

  useEffect(() => {
    const nextUserAgent = JSON.stringify(nowUserAgent);
    if (userAgent !== nextUserAgent) {
      setKey(Date.now());
      setUserAgent(nextUserAgent);
    }
  }, [nowUserAgent]);

  return <StoryFn key={key} />;
}
