// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "max-len": ["error", { code: 320 }],
  },
};
// npx expo lint
// npx expo install -- --save-dev prettier eslint-config-prettier eslint-plugin-prettier
