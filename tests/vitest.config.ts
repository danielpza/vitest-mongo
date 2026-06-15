import { defineConfig } from "vitest/config";
import vitestMongo from "vitest-mongo";

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [vitestMongo()],
        test: { name: "mongodb-memory-server" },
      },
      {
        plugins: [
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
