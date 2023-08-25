import React, { useEffect, useState } from "react";

export default function Template({ useragent }) {
  const [agent, setAgent] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setAgent(window.navigator.userAgent));
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      window.navigator.userAgent:
      <br />
      <textarea cols={100} rows={10} value={agent} readOnly />
      <br />
      <br />
      (storybook) args.useragent:
      <br />
      <textarea cols={100} rows={10} value={useragent} readOnly />
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
