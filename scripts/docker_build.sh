#!/bin/bash

GIT_COMMIT=$1

docker build -t afk0901/item_repository:$GIT_COMMIT game_api/

#exit on error if any command fails
set -e
