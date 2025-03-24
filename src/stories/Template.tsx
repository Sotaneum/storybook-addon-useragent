import React from "react";

interface TemplateProps {
  useragent: string;
}

export default function Template({ useragent }: TemplateProps) {
  return (
    <div>
      window.navigator.userAgent:
      <br />
      <textarea cols={100} rows={10} value={window.navigator.userAgent} readOnly />
      <br />
      <br />
      (storybook) args.useragent:
      <br />
      <textarea cols={100} rows={10} value={useragent} readOnly />
      <br />
      <br />
      (storybook) window.navigator.userAgentData:
      <br />
      <textarea cols={100} rows={10} value={JSON.stringify(window.navigator.userAgentData)} readOnly />
      <br />
      <br />
      (storybook) window.top.navigator.userAgent:
      <br />
      <textarea
        cols={100}
        rows={10}
        value={window.top.navigator.userAgent}
        readOnly
      />
    </div>
  );
}
