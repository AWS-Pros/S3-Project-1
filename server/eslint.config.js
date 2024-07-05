const globals = require("globals");
const pluginJs = require("@eslint/js");

exports = [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];
