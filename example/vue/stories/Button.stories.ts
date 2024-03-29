import Button from "./Button.vue";

export default {
  title: "Example",
  component: Button,
  argTypes: { useragent: { control: "text" } },
  tags: ["autodocs"],
  args: {
    useragent:
      "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
  },
};

export const Example = {};
