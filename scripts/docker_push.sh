#!/bin/bash

set -euxo pipefail

docker push afk0901/game_api_repoitory:$GIT_COMMIT

exit 0