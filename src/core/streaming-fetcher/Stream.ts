import { Readable } from "stream";
import { SuccessfulResponse } from "../fetcher/APIResponse";
import { StreamUtils } from "./streaming-utils";

export class Stream<T> implements AsyncIterable<T> {
    private response: SuccessfulResponse<Readable>;
    private parse: (val: unknown) => Promise<T>;
    private terminator: string;

    constructor({
        response,
        parse,
        terminator,
    }: {
        response: SuccessfulResponse<Readable>;
        parse: (val: unknown) => Promise<T>;
        terminator: string;
    }) {
        this.response = response;
        this.parse = parse;
        this.terminator = terminator;
    }

    private async *iterMessages(): AsyncGenerator<T, void> {
        const sse = Boolean(this.response?.headers?.get("content-type")?.includes("text/event-stream"));
        const stream: StreamUtils<{}> = sse ? StreamUtils.fromSSEResponse(this.response, null as any):StreamUtils.fromReadableStream(this.response.body , null as any);

        for await (const obj of stream) {
            const message = await this.parse(obj);
            yield message;
        }
    }

    async *[Symbol.asyncIterator](): AsyncIterator<T, void, unknown> {
        for await (const message of this.iterMessages()) {
            yield message;
        }
    }
}