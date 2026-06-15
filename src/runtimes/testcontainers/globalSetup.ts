import type { TestProject } from "vitest/node";

import { MongoDBContainer } from "@testcontainers/mongodb";

export type { ProvidedContext } from "vitest";

const DEFAULT_MONGO_IMAGE = "mongo:latest";

declare module "vitest" {
  export interface ProvidedContext {
    MONGO_URI: string;
  }
}

export default async function setup({ provide, config }: TestProject) {
  const mongodbContainer = await new MongoDBContainer(
    config.vitestMongo?.testcontainers?.image ?? DEFAULT_MONGO_IMAGE,
  ).start();

  const uri = mongodbContainer.getConnectionString();

  provide("MONGO_URI", uri);

  return async () => {
    await mongodbContainer.stop();
  };
}
