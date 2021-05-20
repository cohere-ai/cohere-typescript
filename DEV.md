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

### Add an *.env.test* file to the root containing:

```
API_KEY=YOUR_KEY
```

### Run tests

```bash
npm run test
```