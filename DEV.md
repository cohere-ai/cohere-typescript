# SDK Local Development Instructions

### Get Started:

```bash
npm install
```

### Build for production (including generation of `./index.d.ts`)

```bash
npm run build
```

### Run a local dev server (in node) to test.

```bash
npm run dev
```

### Set the following environment variable:

```
COHERE_API_KEY=YOUR_KEY
```

### Run tests

```bash
npm run test
```

### Publish to npm

The package needs to be built before publishing. As such, please avoid using the default npm command of `npm publish`. Instead, to build and then publish run:

```bash
npm run publish
```
