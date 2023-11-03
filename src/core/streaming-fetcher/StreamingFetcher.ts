import axios, { AxiosAdapter, AxiosResponse } from "axios";
import qs from "qs";
import { Readable } from "stream";

export type StreamingFetchFunction<T> = (args: StreamingFetcher.Args<T>) => Promise<Stream<T>>;

export declare namespace StreamingFetcher {
    export interface Args<T> {
        url: string;
        method: string;
        headers?: Record<string, string | undefined>;
        queryParameters?: Record<string, string>;
        body?: unknown;
        timeoutMs?: number;
        withCredentials?: boolean;
        adapter?: AxiosAdapter;
        parse: (val: unknown) => Promise<T>;

        terminator?: string;
    }

    export interface Response {
        data: Readable;
        headers: Record<string, any>;
    }
}

export async function streamingFetcher<T>(args: StreamingFetcher.Args<T>): Promise<Stream<T>> {
    const headers: Record<string, string> = {};
    if (args.body !== undefined) {
        headers["Content-Type"] = "application/json";
    }
    if (args.headers != null) {
        for (const [key, value] of Object.entries(args.headers)) {
            if (value != null) {
                headers[key] = value;
            }
        }
    }

    const response = await axios({
        url: args.url,
        params: args.queryParameters,
        paramsSerializer: (params) => {
            return qs.stringify(params);
        },
        method: args.method,
        headers,
        data: args.body,
        timeout: args.timeoutMs,
        transitional: {
            clarifyTimeoutError: true,
        },
        withCredentials: args.withCredentials,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        responseType: "stream",
        adapter: args.adapter,
    });

    return new Stream(response, args.parse);
}

export class Stream<T> implements AsyncIterable<T> {
    private response: AxiosResponse<any, any>;
    private parse: (val: unknown) => Promise<T>;

    constructor(response: AxiosResponse<any, any>, parse: (val: unknown) => Promise<T>) {
        this.response = response;
        this.parse = parse;
    }

    private async *iterMessages(): AsyncGenerator<T, void, unknown> {
        let previous = "";
        for await (const chunk of this.response.data) {
            const bufferChunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
            previous += bufferChunk;
            let eolIndex: number;
            while ((eolIndex = previous.indexOf("\n")) >= 0) {
                const line = previous.slice(0, eolIndex).trimEnd();
                const message = await this.parse(JSON.parse(line));
                yield message;
                previous = previous.slice(eolIndex + 1);
            }
        }
    }

    async *[Symbol.asyncIterator](): AsyncIterator<T, void, unknown> {
        for await (const message of this.iterMessages()) {
            yield message;
        }
    }
}
