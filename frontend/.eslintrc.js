module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "standard",
    "prettier",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "space-before-function-paren": ["off"],
    "object-shorthand": ["error", "properties"],
    semi: ["error", "always"],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};