import { useEffect, makeDecorator } from "@storybook/addons";
import setUserAgent from "./core";
import { getUserAgent } from "./utils";
import { PARAM_KEY } from "./constants";

export default makeDecorator({
  name: "userAgentRender",
  parameterName: PARAM_KEY,
  wrapper: (storyFn, context) => {
    const userAgent = getUserAgent(context.args);

    useEffect(() => setUserAgent(userAgent), [userAgent]);

    return storyFn(context);
  },
});
