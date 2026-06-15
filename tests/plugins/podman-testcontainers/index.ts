import { x } from "tinyexec";

export default async function podmanTestcontainers() {
  const DOCKER_HOST = `unix://${(await x("podman", ["info", "--format", "{{.Host.RemoteSocket.Path}}"])).stdout.trim()}`;
  const env = {
    DOCKER_HOST,
    TESTCONTAINERS_RYUK_DISABLED: true,
  };

  // we have to modify global process.env here instead of config.env because config.env it's not available in globalSetup
  Object.assign(process.env, env);

  return {
    name: "podman-test-containers",
    config() {
      return {
        test: {
          globalSetup: [import.meta.resolve("./globalSetup.ts")],
        },
      };
    },
  };
}
