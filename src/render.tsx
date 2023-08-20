import { useEffect, useState, makeDecorator } from "@storybook/addons";

export default makeDecorator({
  name: "userAgentRender",
  parameterName: "userAgent",
  wrapper: (storyFn, context) => {
    const nowUserAgent: string = context.globals.activeUserAgent ?? "";

    const [userAgent, setUserAgent] = useState(nowUserAgent);

    useEffect(() => {
      const nextUserAgent = JSON.stringify(nowUserAgent);
      if (userAgent !== nextUserAgent) {
        setUserAgent(nextUserAgent);
      }
    }, [nowUserAgent]);

    return storyFn(context);
  },
});
