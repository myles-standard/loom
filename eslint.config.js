import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            "build/**",
            "backend/vendors/**",
            "public/**"
        ]
    },
    js.configs.recommended,
        ...tseslint.configs.recommended,
    {
        files: ["frontend/**/*.{js,jsx,ts,tsx}"],
        plugins: { react },
        languageOptions: {
            globals: { ...globals.browser },
            parserOptions: { ecmaFeatures: { jsx: true } }
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
        },
    },
    {
        files: ["backend/**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            globals: { ...globals.node }
        },
        rules: {
            "no-console": "off"
        }
    },
    eslintConfigPrettier
];