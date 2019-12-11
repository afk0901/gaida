#!/bin/bash

set -euxo pipefail

ARG GIT_COMMIT=$1

docker build -t afk0901/game_api_repoitory:$GITCOMMIT game_api/

exit 0
