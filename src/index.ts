import type { MongoMemoryServer } from "mongodb-memory-server";

import type {} from "./globalSetup.ts";

type MongoMemoryServerOpts = Parameters<typeof MongoMemoryServer.create>[0];

declare module "vitest/node" {
  export interface ResolvedConfig {
    vitestMongo?: {
      mongodbMemoryServerOptions?: MongoMemoryServerOpts;
    };
  }
}

export default function vitestMongo(opts?: { mongodbMemoryServerOptions?: MongoMemoryServerOpts }) {
  return {
    name: "vitest-mongo",
    config: () => ({
      vitestMongo: opts,
      test: {
        globalSetup: [import.meta.resolve("./globalSetup.mjs")],
      },
    }),
  };
}
