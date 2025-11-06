import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        name: "custom",
        environment: "node",
        root: "./src/test",
        include: ["**/*.test.{js,ts,jsx,tsx}"],
        testTimeout: 300000,
    },
});
