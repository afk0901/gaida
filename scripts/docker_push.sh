#!/bin/bash

set -euxo pipefail

ARG GIT_COMMIT=$1

docker push afk0901/game_api_repoitory:$GIT_COMMIT

exit 0