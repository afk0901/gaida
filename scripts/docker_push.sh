#!/bin/bash

GIT_COMMIT=$1

docker push afk0901/game_api_repoitory:$GIT_COMMIT game_api/

#exit on error if any command fails
set -e

