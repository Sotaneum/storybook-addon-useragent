import React, { useMemo } from "react";

import { useGlobals } from "@storybook/api";
import { Placeholder } from "@storybook/components";

import UserAgent from "./UserAgent";

import { fetchIFrame } from "../utils";

export default function () {
  const [globals] = useGlobals();

  const iframe = fetchIFrame();
  const { activeUserAgent } = globals;

  const navigator = useMemo(() => {
    return iframe ? iframe.contentWindow.navigator : null;
  }, [iframe, activeUserAgent]);

  return (
    <Placeholder>
      <UserAgent name="iframe" navigator={navigator} />
      <UserAgent name="Window" navigator={window.navigator} />
    </Placeholder>
  );
}
