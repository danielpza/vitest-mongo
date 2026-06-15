# vitest-mongo

[![NPM Version](https://img.shields.io/npm/v/vitest-mongo)](https://www.npmjs.com/package/vitest-mongo)

Minimal [vitest](https://vitest.dev/) plugin for mongodb.

- typescript support
- small
- multiple mongodb runtimes support

Supports the following runtimes:

- [mongodb-memory-server](#mongodbmemoryserver)
- [testcontainers](#testcontainers)

The runtimes need to be installed separately to keep the installation size minimal. Refer to each runtime section for how to use.

## Installation

```shell
npm install -D vitest-mongo
yarn add -D vitest-mongo
pnpm add -D vitest-mongo
```

## Setup

The main entrypoint is the `vitestMongo` plugin. It extends the vitest context with the `MONGO_URI` value, which you can import with `inject`:

```js
// vitest.config.ts
import { defineConfig } from "vitest/config";
import vitestMongo from "vitest-mongo";

export default defineConfig({
  plugins: [
    vitestMongo({
      runtime: "mongodb-memory-server", // this is the default
      // other options go here, see below for specific runtimes
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

## Runtimes

### MongodbMemoryServer

This is the default runtime.

Install `mongodb-memory-server`:

```shell
npm install -D vitest-mongo mongodb-memory-server
yarn add -D vitest-mongo mongodb-memory-server
pnpm add -D vitest-mongo mongodb-memory-server
```

```js
// vitest.config.ts
import { defineConfig } from "vitest/config";
import vitestMongo from "vitest-mongo";
export default defineConfig({
  plugins: [
    vitestMongo({
      runtime: "mongodb-memory-server", // this is the default
      mongodbMemoryServerOptions: {
        /* optional MongoMemoryServer options, see https://typegoose.github.io/mongodb-memory-server/docs/api/config-options */
      },
    }),
  ],
});
```

### Testcontainers

Install `@testcontainers/mongodb`:

```shell
npm install -D vitest-mongo @testcontainers/mongodb
yarn add -D vitest-mongo @testcontainers/mongodb
pnpm add -D vitest-mongo @testcontainers/mongodb
```

```js
// vitest.config.ts
import { defineConfig } from "vitest/config";
import vitestMongo from "vitest-mongo";
export default defineConfig({
  plugins: [
    vitestMongo({
      runtime: "@testcontainers/mongodb",
      testcontainers: {
        /* options for MongoDBContainer, see https://node.testcontainers.org/modules/mongodb/ */
        image: "mongo:6.0.1", // default is "mongo:latest"
      },
    }),
  ],
});
```
