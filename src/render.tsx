import { useEffect, useState, makeDecorator } from "@storybook/addons";

export default makeDecorator({
  name: "userAgentRender",
  parameterName: "userAgent",
  wrapper: (storyFn, context) => {
    const nowUserAgent: string = context?.globals?.activeUserAgent || "";

    const [key, setKey] = useState(Date.now());
    const [userAgent, setUserAgent] = useState(nowUserAgent);

    useEffect(() => {
      const nextUserAgent = JSON.stringify(nowUserAgent);
      if (userAgent !== nextUserAgent) {
        setKey(Date.now());
        setUserAgent(nextUserAgent);
      }
    }, [nowUserAgent]);

    return storyFn({ ...context, key });
  },
});
