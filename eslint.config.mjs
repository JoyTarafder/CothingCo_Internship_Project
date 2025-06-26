import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", "dist/**"],
  },
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "no-unused-vars": "off",
      "no-console": "off",
      "no-undef": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default config;
