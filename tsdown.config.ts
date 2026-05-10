import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts", "./src/globalSetup.ts"],
  dts: true,
  exports: true,
});
