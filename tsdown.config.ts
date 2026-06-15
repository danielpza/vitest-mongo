import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts", "./src/runtimes/*/globalSetup.ts"],
  dts: true,
  exports: true,
});
