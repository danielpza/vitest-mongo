import { defineConfig } from "vitest/config";
import vitestMongo from "vitest-mongo";

export default defineConfig({
  plugins: [vitestMongo()],
});
