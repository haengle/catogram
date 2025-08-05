/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		coverage: {
			exclude: [
				"dist",
				"eslint.config.mjs",
				"node_modules",
				"tests",
				"vite.config.js",
			],
			thresholds: {
				branches: 80,
				functions: 94,
				lines: 94,
				statements: 94,
			},
		},
		environment: "jsdom",
		include: ["tests/**/*.test.ts"],
		root: "./src",
	},
});
