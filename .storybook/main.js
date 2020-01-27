const path = require("path");

module.exports = {
  stories: ["../src/__stories/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-docs/register",
    {
      name: "@storybook/addon-docs",
      options: { configureJSX: true },
    },
    {
      name: "@storybook/preset-create-react-app",
      options: {
        tsDocgenLoaderOptions: {},
      },
    },
  ],
};
