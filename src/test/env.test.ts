import { describe, test, expect } from "vitest";
import webpack from 'webpack';

describe("test env compatibility", () => {
    test("webpack", async () => {
        await new Promise<void>((resolve, reject) => {
            webpack({
                mode: "production",
                entry: "./src/index.ts",
                module: {
                    rules: [
                        {
                            test: /\.tsx?$/,
                            use: 'ts-loader',
                            exclude: /node_modules/,
                        },
                    ],
                },
                resolve: {
                    extensions: ['.tsx', '.ts', '.js'],
                },

            }, (err, stats) => {
                console.log(stats?.toString())
                try {
                    expect(err).toBe(null);
                    expect(stats?.hasErrors()).toBe(false);
                    resolve();
                } catch (e) {
                    reject(e);
                }
            })
        });
    })
});
