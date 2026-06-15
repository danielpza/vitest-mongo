import { defineConfig } from "vitest/config";
import vitestMongo from "vitest-mongo";

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [vitestMongo()],
        test: {
          name: "mongodb-memory-server",
          include: ["src/index.test.ts"],
        },
      },
    ],
  },
});
