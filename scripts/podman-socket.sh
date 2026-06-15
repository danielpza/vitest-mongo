#!/usr/bin/env sh
# see https://node.testcontainers.org/supported-container-runtimes/#podman
# see https://podman-desktop.io/tutorial/testcontainers-with-podman

export DOCKER_HOST=unix://$(
  podman info --format '{{.Host.RemoteSocket.Path}}'
)
