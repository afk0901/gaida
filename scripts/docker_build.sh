#!/bin/bash

set -euxo pipefail

export GIT_COMMIT=$1;

docker build game_api -t afk0901/game_api:$GIT_COMMIT

exit 0