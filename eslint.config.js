import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import reactX from "eslint-plugin-react-x";

export default tseslint.config([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommendedTypeChecked,
			reactHooks.configs["recommended-latest"],
			reactRefresh.configs.vite,
			reactX.configs["recommended-typescript"],
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
	},
]);
