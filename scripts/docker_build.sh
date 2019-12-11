#!/bin/bash

set -euxo pipefail

GIT_COMMIT=$1

docker build -t afk0901/game_api_repository/:$GITCOMMIT game_api/

exit 0
