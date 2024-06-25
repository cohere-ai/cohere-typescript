import { describe, test } from "@jest/globals";
import webpack from 'webpack';

describe("test env compatibility", () => {
    test("webpack", (done) => {
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
            done();
            console.log(stats?.toString())
            expect(err).toBe(null);
            expect(stats?.hasErrors()).toBe(false);
        })
    })
});
