import type { Meta, StoryObj } from "@storybook/react";
import Template from "./Template";

const meta: Meta<typeof Template> = {
  title: "Example/UserAgent",
  component: Template,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Template>;

export const IOS: Story = {
  args: {
    useragent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1",
  },
};

export const ANDROID: Story = {
  args: {
    useragent:
      "Mozilla/5.0 (Linux; Android 10; Android SDK built for x86) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
  },
};

export const WINDOWS: Story = {
  args: {
    useragent:
      "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
  },
};

export const MAC: Story = {
  args: {
    useragent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
  },
};

export const CUSTOM: Story = {
  args: {
    useragent: "Mozilla/5.0 (Terminator; T-800) Version/T-800",
  },
};
