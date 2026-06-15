import type { TestProject } from "vitest/node";

import { MongoMemoryServer } from "mongodb-memory-server";

export type { ProvidedContext } from "vitest";

declare module "vitest" {
  export interface ProvidedContext {
    MONGO_URI: string;
  }
}

export default async function setup({ provide, config }: TestProject) {
  const mongod = await MongoMemoryServer.create(config.vitestMongo?.mongodbMemoryServerOptions);

  const uri = mongod.getUri();

  provide("MONGO_URI", uri);

  return async () => {
    await mongod.stop();
  };
}
