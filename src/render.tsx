import { useEffect, makeDecorator } from "@storybook/addons";
import setUserAgent from "./core";

export default makeDecorator({
  name: "userAgentRender",
  parameterName: "userAgent",
  wrapper: (storyFn, context) => {
    const useragent: string = context.args?.activeUserAgent ?? "";

    useEffect(() => setUserAgent(useragent), [useragent]);

    return storyFn(context);
  },
});
