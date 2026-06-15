import { defineConfig } from "vitest/config";
import vitestMongo from "vitest-mongo";
import podmanTestcontainers from "./plugins/podman-testcontainers/index.js";

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [vitestMongo()],
        test: { name: "mongodb-memory-server" },
      },
      {
        plugins: [
          podmanTestcontainers(),
          vitestMongo({ runtime: "testcontainers", testcontainers: { image: "mongo:6.0.1" } }),
        ],
        test: {
          name: "testcontainers",
          env: {
            DOCKER_HOST: "test",
          },
        },
      },
    ],
  },
});
