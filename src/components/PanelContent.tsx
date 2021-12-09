import React from "react";

import { useArgs } from "@storybook/api";
import { Placeholder } from "@storybook/components";

import UserAgent from "./UserAgent";

export default function () {
  const [args] = useArgs();
  const { activeUserAgent } = args;

  return (
    <Placeholder>
      <UserAgent name="iframe" userAgent={activeUserAgent} />
      <UserAgent name="Window" userAgent={window?.navigator?.userAgent} />
    </Placeholder>
  );
}
