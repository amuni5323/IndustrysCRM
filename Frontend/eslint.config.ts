// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//     // Custom rules
//     rules: {
//       "@next/next/no-html-link-for-pages": "off",
//     },
//   },
// ];

// export default eslintConfig;


import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Custom rules
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

// If you want to apply the `ignoreDuringBuilds` config:
eslintConfig.push({
  overrides: [
    {
      files: ["**/*.js", "**/*.ts", "**/*.tsx"],
      rules: {
        "eslint/ignoreDuringBuilds": ["warn", "error"]
      }
    },
  ],
});

export default eslintConfig;

// Module export for enabling the `ignoreDuringBuilds` config
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};
