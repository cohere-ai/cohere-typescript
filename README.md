# Welcome to the Cohere AI Node.js SDK.

This package provides functionality developed to simplify interfacing with the [cohere.ai](https://cohere.ai) natural language API. This SDK provides support for both TypeScript and JavaScript Node.js projects. For a full description of the API please visit the [Cohere Docs](https://docs.cohere.ai/).

## Installation

### Install the package as a dependency.

```bash
npm install cohere-ai
```

## Usage

### Import the library to your node.js project.

```js
const cohere = require("cohere-ai");
```

### Initialize the library using the latest version of the API.

```js
cohere.init("YOUR_API_KEY");
```

### Or optionally initialize with a specific version. (Learn about versions [here](https://docs.cohere.ai/versions-reference).)

```js
cohere.init("YOUR_API_KEY", "2022-12-06");
```

### Call the endpoint function you'd like to hit to interact with the Cohere API.

```js
cohere.generate("MODEL_NAME", config);
```

## Endpoints

For a full breakdown of endpoints and their config objects please consult the [Cohere Docs](https://docs.cohere.ai/).

| Cohere Endpoint  | Function                |
| ---------------- | ----------------------- |
| /generate        | cohere.generate()       |
| /embed           | cohere.embed()          |
| /classify        | cohere.classify()       |
| /tokenize        | cohere.tokenize()       |
| /detokenize      | cohere.detokenize()     |
| /detect-language | cohere.detectLanguage() |

## Models

To view an up to date list of available models please consult the [Cohere CLI](https://docs.cohere.ai/command/). To get started try out `large`.

## Responses

All of the endpoint functions will return a response structure. For a detailed breakdown of the response body visit the [Cohere Docs](https://docs.cohere.ai/).

```js
{
  statusCode: STATUS,
  body: RESPONSE_OBJ
}
```

## _Code Examples:_

```js
(async () => {
  cohere.init(process.env.COHERE_API_KEY);

  // Hit the `generate` endpoint on the `large` model
  const generateResponse = await cohere.generate({
    model: "large",
    prompt: "Once upon a time in a magical land called",
    max_tokens: 50,
    temperature: 1,
  });

  /*
  {
    statusCode: 200,
    body: {
      text: "Eldorado, the anointed monarchs of the ancient world and the ruling family were divided into three kingdoms, each of which was ruled by an individual leader."
    }
  }
  */
})();
```

### Example error response:

```js
// error response from cohere.generate() where api key was not previously provided.
{
  statusCode: 403,
  body: {
    message: "Whoops! You need to provide an API key before making requests. Try cohere.init(YOUR_KEY)."
  }
}

```

## TypeScript support

Import the package as a class.

```ts
import cohere = require("cohere-ai");
```

Require the `cohere` package as usual, and the `./index.d.ts` file will be imported by typescript automatically.

## cohere-node package readme

If you'd like to help contribute to the package library itself or modify it locally, please check the development instructions [readme](https://github.com/cohere-ai/cohere-node/blob/main/DEV.md).
