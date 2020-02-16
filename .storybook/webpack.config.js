const path = require("path");
module.exports = ({ config }) => ({
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.(ts|tsx)?$/,
        include: path.resolve(__dirname, "../src"),
        use: [require.resolve("react-docgen-typescript-loader")],
      },
    ],
  },
  resolve: {
    ...config.resolve,
    extensions: [...config.resolve.extensions, ".ts", ".tsx"],
  },
});
