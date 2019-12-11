#!/bin/bash

set -euxo pipefail

GIT_COMMIT=$1

docker push afk0901/game_api_repoitory:$GT_COMMIT

exit 0