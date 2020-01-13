const path = require("path");

module.exports = {
  stories: ["../src/__stories/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-actions/register",
    "@storybook/addon-docs/register",
    {
      name: "@storybook/addon-actions"
    },
    {
      name: "@storybook/addon-docs",
      options: { configureJSX: true }
    },
    {
      name: "@storybook/preset-create-react-app"
    }
  ]
};

// import t from "@storybook/addon-info/docs/register"
