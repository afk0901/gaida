#!/bin/bash

set -euxo pipefail

docker build game_api -t afk0901/game_api:$GIT_COMMIT

exit 0