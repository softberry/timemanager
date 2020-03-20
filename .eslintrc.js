module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["react-app", "plugin:@typescript-eslint/eslint-recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/explicit-function-return-type": 2,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-unused-vars": 0,
  },
};
