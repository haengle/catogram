/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	base: "/catogram",
	plugins: [react()],
	test: {
		coverage: {
			exclude: [
				"dist",
				"eslint.config.js",
				"node_modules",
				"tests",
				"vite.config.ts",
				"src/App.tsx",
				"src/main.tsx",
				"vite-env.d.ts",
				"types.d.ts",
			],
			thresholds: {
				branches: 80,
				functions: 94,
				lines: 94,
				statements: 94,
			},
		},
		globals: true,
		environment: "jsdom",
		include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
		root: "./",
	},
});
