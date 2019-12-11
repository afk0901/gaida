#!/bin/bash
set -euxo pipefail

GIT_COMMIT=$1;

docker-compose down
docker-compose up

exit(0)


