#!/bin/bash
set -euxo pipefail

GIT_COMMIT=$1
export GIT_COMMIT
docker-compose down
docker-compose up

exit(0)


