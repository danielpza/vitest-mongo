import { x } from "tinyexec";
import type { TestProject } from "vitest/node";

export default async function setup({}: TestProject) {
  // start podman
  const ps = x("podman", ["system", "service", "--time=0"]);
  ps.process?.on("message", (message) => {
    console.log("[podman message]", message);
  });

  await new Promise((r) => void setTimeout(r, 1000)); // wait a bit for podman to start

  return () => {
    // stop podman
    ps.kill();
  };
}
