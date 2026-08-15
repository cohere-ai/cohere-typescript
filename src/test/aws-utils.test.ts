import { afterEach, describe, expect, it } from "vitest";

import { getAuthHeaders } from "../aws-utils";

const envKeys = [
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_SESSION_TOKEN",
    "COHERE_CONCURRENT_UPDATE",
] as const;
const originalEnv = new Map(envKeys.map((key) => [key, process.env[key]]));

afterEach(() => {
    for (const key of envKeys) {
        const value = originalEnv.get(key);
        if (value === undefined) {
            delete process.env[key];
        } else {
            process.env[key] = value;
        }
    }
});

describe("getAuthHeaders", () => {
    it("does not discard concurrent environment updates", async () => {
        const signing = getAuthHeaders(
            new URL("https://bedrock-runtime.us-east-1.amazonaws.com/model/test/invoke"),
            "POST",
            { host: "bedrock-runtime.us-east-1.amazonaws.com" },
            "{}",
            "bedrock",
            {
                awsRegion: "us-east-1",
                awsAccessKey: "EXPLICIT_ACCESS_KEY",
                awsSecretKey: "test-secret",
            },
        );

        process.env.COHERE_CONCURRENT_UPDATE = "preserve-me";
        await signing;

        expect(process.env.COHERE_CONCURRENT_UPDATE).toBe("preserve-me");
    });

    it("keeps concurrent explicit credentials isolated", async () => {
        delete process.env.AWS_ACCESS_KEY_ID;
        delete process.env.AWS_SECRET_ACCESS_KEY;
        delete process.env.AWS_SESSION_TOKEN;

        const sign = (accessKeyId: string) =>
            getAuthHeaders(
                new URL("https://bedrock-runtime.us-east-1.amazonaws.com/model/test/invoke"),
                "POST",
                { host: "bedrock-runtime.us-east-1.amazonaws.com" },
                "{}",
                "bedrock",
                {
                    awsRegion: "us-east-1",
                    awsAccessKey: accessKeyId,
                    awsSecretKey: "test-secret",
                },
            );

        for (let iteration = 0; iteration < 10; iteration++) {
            const [first, second] = await Promise.all([sign("FIRST_ACCESS_KEY"), sign("SECOND_ACCESS_KEY")]);

            expect(first.authorization).toContain("Credential=FIRST_ACCESS_KEY/");
            expect(second.authorization).toContain("Credential=SECOND_ACCESS_KEY/");
        }
    });
});
