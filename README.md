# vitest-mongo

[![NPM Version](https://img.shields.io/npm/v/vitest-mongo)](https://www.npmjs.com/package/vitest-mongo)

vitest plugin for mongodb.

## Installation

```shell
npm install -D vitest-mongo mongodb-memory-server
yarn add -D vitest-mongo mongodb-memory-server
pnpm add -D vitest-mongo mongodb-memory-server
```

## Setup

The main entrypoint is the `vitestMongo` plugin. It extends the vitest context with the `MONGO_URI` value, which you can import with `inject`:

```js
// vitest.config.mjs
import { defineConfig } from "vitest/config";
import vitestMongo from "vitest-mongo";

export default defineConfig({
  plugins: [
    vitestMongo({
      mongodbMemoryServerOptions: {
        /* optional mongodb-memory-server options */
      },
    }),
  ],
});
```

Then in your tests, use `inject("MONGO_URI")` to get the started server

```js
// index.test.js
import { inject } from "vitest";

const MONGO_URI = inject("MONGO_URI");

// use mongodb/mongoose/other packages to connect to mongodb using MONGO_URI
import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(MONGO_URI);
```

## Roadmap

- [x] [mongodb-memory-server suppport](https://github.com/typegoose/mongodb-memory-server)
- [ ] [testcontainer mongodb support](https://testcontainers.com/modules/mongodb/?language=nodejs)
