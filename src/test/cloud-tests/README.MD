# Cloud Tests

This directory contains tests that you can run on your cohere container to check that it supports all of the parameters that we would expect it to support.

## Running the tests

Running the tests from npm is very simple. Just run the following command:

```
npx cohere-ai@latest \
    --baseUrl https://api.cohere.com \
    --apiKey my_key \
    --featuresToTest chat,embed,rerank,chat-2,rerank-2,embed-2
```

This will automatically download the latest test suite and execute them against whichever local service or contaienr you are running. Often the apiKey will be optional if you are running the tests against a local service.