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
const cohere = require('cohere-ai');
```

### Initialize the library using the latest version of the API.
```js
cohere.init('YOUR_API_KEY');
```
### Or optionally initialize with a specific version. (Learn about versions [here](https://docs.cohere.ai/versions-reference).)
```js
cohere.init('YOUR_API_KEY', '2021-11-08');
```

### Call the endpoint function you'd like to hit to interact with the Cohere API.

```js
cohere.generate('MODEL_NAME', config);
```
## Endpoints
For a full breakdown of endpoints and their config objects please consult the [Cohere Docs](https://docs.cohere.ai/).

Cohere Endpoint | Function
----- | -----
/generate  | cohere.generate()
/similarity | cohere.similarity()
/choose-best | cohere.chooseBest()
/embed | cohere.embed()
/likelihood | cohere.likelihood()

## Models
To view an up to date list of available models please consult the [Cohere CLI](https://docs.cohere.ai/command/). To get started try out `baseline-shrimp` or `baseline-seal`.

## Responses
All of the endpoint functions will return a response structure. For a detailed breakdown of the response body visit the [Cohere Docs](https://docs.cohere.ai/).

```js
{
  statusCode: STATUS,
  body: RESPONSE_OBJ
}
```

## *Code Examples:*
```js
(async () => {
  cohere.init(process.env.API_KEY);

  // Hit the `generate` endpoint on the `baseline-shrimp` model
  const generateResponse = await cohere.generate("baseline-shrimp", {
    prompt: "Once upon a time in a magical land called",
    max_tokens: 50,
    temperature: 1
  });

  /*
  {
    statusCode: 200,
    body: {
      text: "Eldorado, the anointed monarchs of the ancient world and the ruling family were divided into three kingdoms, each of which was ruled by an individual leader."
    }
  }
  */

  // Hit the `similarity` endpoint on the `baseline-shark` model
  const similarityResponse = await cohere.similarity("baseline-seal", {
    anchor: "Hello! How are you?",
    targets: [
      "Hey, how's it going?",
      "Talk to you later",
      "Avast ye scallywags!",
      "I am the king of France!"
    ]
  });

  /*
  {
    statusCode: 200,
    body: {
      similarities: [ 0.55396456, 0.211992, 0.1795376, 0.022282645 ]
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
import cohere = require('cohere-ai')
```
Require the `cohere` package as usual, and the `./index.d.ts` file will be imported by typescript automatically.

## Local development instructions
To tinker with the package library itself, please check the development instructions [readme](https://github.com/cohere-ai/cohere-node/blob/main/DEV.md).