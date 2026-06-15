import { x } from "tinyexec";

console.log((await x("podman", ["info", "--format", "{{.Host.RemoteSocket.Path}}"])).stdout);
