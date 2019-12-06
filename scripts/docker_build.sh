#!/bin/bash

GIT_COMMIT=$1

docker build -t afk0901/game_api:$GIT_COMMIT item_repository/

#exit on error if any command fails
set -e
