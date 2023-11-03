![](banner.png)

# Cohere Typescript Library

[![npm shield](https://img.shields.io/npm/v/cohere-ai)](https://www.npmjs.com/package/cohere-ai)
[![fern shield](https://img.shields.io/badge/%F0%9F%8C%BF-SDK%20generated%20by%20Fern-brightgreen)](https://github.com/fern-api/fern)

The Cohere typescript library provides access to the Cohere API from JavaScript/TypeScript.

## Documentation

API reference documentation is available [here](https://docs.cohere.com/).

## Usage

[![Try it out](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/typescript-example-using-sdk-built-with-fern-az8lrn?file=app.ts&view=editor)

```typescript
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
    apiKey: "YOUR_API_KEY",
});

const prediction = cohere.generate({
    model: "large",
    prompt: "co:here",
    max_tokens: 10,
});

console.log("Received prediction", prediction);
```

## Streaming

The SDK supports streaming from the chat endpoint. To take advantage of this feature,
pass stream: true with your request and a callback to handle the events.

```ts
const stream = await cohere.chatStream({
    model: "command",
    message: "Tell me a story in 5 parts!",
});
for await (const chat of stream) {
  if (chat.type === "text-generation") {
    process.stdout.write(chat.text);
  }
}
```

## Errors

When the API returns a non-success status code (4xx or 5xx response),
a subclass of [CohereError](./src/errors/CohereError.ts) will be thrown:

```typescript
import { CohereError, CohereTimeoutError } from "cohere-ai";

try {
    await cohere.generate(/* ... */);
} catch (err) {
    if (err instanceof CohereTimeoutError) {
        console.log("Request timed out", err);
    } else if (err instanceof CohereError) {
        // catch all errros
        console.log(err.statusCode);
        console.log(err.message);
        console.log(err.body);
    }
}
```

## Retries

409 Conflict, 429 Rate Limit, and >=500 Internal errors will all be retried twice with exponential bakcoff.
You can use the maxRetries option to configure this behavior:

```typescript
await cohere.detectLanguage(..., {
    maxRetries: 0, // disable retries
});
```

## Timeouts

By default, the SDK has a timeout of 60s. You can use the `timeoutInSeconds` option to configure
this behavior

```typescript
await cohere.detectLanguage(..., {
    timeoutInSeconds: 10, // timeout after 10 seconds
});
```

## Beta status

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning the package version to a specific version in your package.json file. This way, you can install the same version each time without breaking changes unless you are intentionally looking for the latest version.

## Contributing

While we value open-source contributions to this SDK, this library is generated programmatically. Additions made directly to this library would have to be moved over to our generation code, otherwise they would be overwritten upon the next generated release. Feel free to open a PR as a proof of concept, but know that we will not be able to merge it as-is. We suggest opening an issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!