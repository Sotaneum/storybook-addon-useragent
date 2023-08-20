import { useEffect, makeDecorator } from "@storybook/addons";
import setUserAgent from "./core";
import { getUseragent } from "./utils";

export default makeDecorator({
  name: "userAgentRender",
  parameterName: "userAgent",
  wrapper: (storyFn, context) => {
    const useragent: string = getUseragent(context.args);

    useEffect(() => setUserAgent(useragent), [useragent]);

    return storyFn(context);
  },
});
