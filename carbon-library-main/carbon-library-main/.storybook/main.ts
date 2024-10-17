import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/preset-ant-design",
    "@storybook/addon-styling-webpack",
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpack(config: any, options: any) {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "sass-loader" },
      ],
    });
    return config;
  },
  staticDirs: ['../src/locales'],
   /*
   * 👇 The `config` argument contains all the other existing environment variables.
   * Either configured in an `.env` file or configured on the command line.
   */
  env: (config) => ({
    ...config,
    STORYBOOK_ACCESS_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbiI6IkFudGFjdGljIFJlZ2lvbiIsIm4iOiJSb290Iiwic3ViIjo1LCJyIjoiUm9vdCIsImNpZCI6NywiY3IiOiJHb3Zlcm5tZW50IiwicyI6MSwiaWF0IjoxNzAyMjg0Mjk0LCJleHAiOjE3MDIyOTE0OTR9.U5cM_MNvQ5XyCBEAvT2_VSiY8zIeE2yiycaIdpSPGzc",
    STORYBOOK_USER_ID: "",
    STORYBOOK_USER_ROLE: "",
    STORYBOOK_COMPANY_ROLE: "",
    STORYBOOK_COMPANY_ID: "",
    STORYBOOK_COMPANY_LOGO: "",
    STORYBOOK_COMPANY_NAME: "",
    STORYBOOK_COMPANY_STATE: ""
  }),
};
export default config;
