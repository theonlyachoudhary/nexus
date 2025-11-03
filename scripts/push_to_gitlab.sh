#!/usr/bin/env bash
set -euo pipefail

# Usage:
#  ./scripts/push_to_gitlab.sh <registry> <image_name> <tag>
# Example:
#  ./scripts/push_to_gitlab.sh registry.gitlab.com your-group/your-project v1.2.3

REGISTRY=${1:-}
IMAGE=${2:-}
TAG=${3:-latest}

if [ -z "$REGISTRY" ] || [ -z "$IMAGE" ]; then
  echo "Usage: $0 <registry> <image_name> <tag>"
  exit 2
fi

# Use CI/CD Personal Access Token via env var GITLAB_PAT
if [ -z "${GITLAB_PAT:-}" ]; then
  echo "Please set GITLAB_PAT environment variable with a GitLab Personal Access Token (write_registry scope)."
  exit 3
fi

FULL_IMAGE="$REGISTRY/$IMAGE:$TAG"

echo "Building image: $FULL_IMAGE"
# Allow passing extra docker build args via BUILD_ARGS env (e.g. --build-arg DATABASE_URL=...)
if [ -n "${BUILD_ARGS:-}" ]; then
  echo "Using build args: $BUILD_ARGS"
  docker build $BUILD_ARGS -t "$FULL_IMAGE" .
else
  docker build -t "$FULL_IMAGE" .
fi

echo "Logging into GitLab registry $REGISTRY"
echo "$GITLAB_PAT" | docker login -u "gitlab-ci-token" --password-stdin "$REGISTRY"

echo "Pushing $FULL_IMAGE"
docker push "$FULL_IMAGE"

echo "Done. Image pushed: $FULL_IMAGE"
