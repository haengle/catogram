/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import fs from "node:fs";

// https://vite.dev/config/
export default defineConfig({
	base: "/catogram",
	plugins: [
		react(),
		{
			name: "generate-404",
			apply: "build",
			enforce: "post",
			closeBundle() {
				/* duplicate the dist/index.html file so GH pages doesn't 404 */
				const distDir = path.resolve(__dirname, "dist");
				const indexPath = path.join(distDir, "index.html");
				const notFoundPath = path.join(distDir, "404.html");
				if (fs.existsSync(indexPath)) {
					fs.copyFileSync(indexPath, notFoundPath);
				}
			},
		},
	],
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
				functions: 90,
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
