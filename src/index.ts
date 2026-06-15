import type { MongoMemoryServer } from "mongodb-memory-server";

declare module "vitest" {
  // https://vitest.dev/config/provide.html
  export interface ProvidedContext {
    MONGO_URI: string;
  }
}

declare module "vitest/node" {
  export interface ResolvedConfig {
    vitestMongo?: VitestMongoConfig;
  }
}

type MongoMemoryServerOpts = Parameters<typeof MongoMemoryServer.create>[0];

export interface VitestMongoConfig {
  /**
   * Either "mongodb-memory-server" or "testcontainers"
   * @default "mongodb-memory-server"
   */
  runtime?: "mongodb-memory-server" | "testcontainers";
  mongodbMemoryServerOptions?: MongoMemoryServerOpts;
  testcontainers?: { image?: string };
}

export default function vitestMongo(opts?: VitestMongoConfig) {
  const name = "vitest-mongo";

  if (opts?.runtime === "testcontainers") {
    return {
      name,
      config: () => ({
        vitestMongo: opts,
        test: {
          globalSetup: [import.meta.resolve("./runtimes/testcontainers/globalSetup.mjs")],
        },
      }),
    };
  }

  return {
    name,
    config: () => ({
      vitestMongo: opts,
      test: {
        globalSetup: [import.meta.resolve("./runtimes/mongodb-memory-server/globalSetup.mjs")],
      },
    }),
  };
}
