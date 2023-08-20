import { useEffect, makeDecorator } from "@storybook/addons";
import setUserAgent from "./core";
import { getUserAgent } from "./utils";

export default makeDecorator({
  name: "userAgentRender",
  parameterName: "userAgent",
  wrapper: (storyFn, context) => {
    const userAgent = getUserAgent(context.args);

    useEffect(() => setUserAgent(userAgent), [userAgent]);

    return storyFn(context);
  },
});
