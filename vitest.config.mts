import { defineConfig } from "vitest/config";
export default defineConfig({
    test: {
        projects: [
            {
                test: {
                    globals: true,
                    name: "unit",
                    environment: "node",
                    root: "./tests",
                    include: ["**/*.test.{js,ts,jsx,tsx}"],
                    exclude: ["wire/**"],
                },
            },
            {
                test: {
                    globals: true,
                    name: "wire",
                    environment: "node",
                    root: "./tests/wire",
                    setupFiles: ["../mock-server/setup.ts"],
                },
            },
            {
                test: {
                    globals: true,
                    name: "custom",
                    environment: "node",
                    root: "./src/test",
                    include: ["**/*.test.{js,ts,jsx,tsx}"],
                    testTimeout: 300000,
                },
            },
        ],
        passWithNoTests: true,
    },
});
