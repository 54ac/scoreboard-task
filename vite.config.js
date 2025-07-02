/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "lib/main.ts"),
			formats: ["es"],
			name: "scoreboard",
			fileName: () => `index.js`
		},
		copyPublicDir: false,
		sourcemap: true
	},
	test: {
		globals: true,
		environment: "node",
		include: ["lib/**/*.test.ts"],
		exclude: ["dist", "src"]
	}
});
