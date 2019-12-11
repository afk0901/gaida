#!/bin/bash

set -euxo pipefail

docker build ../game_api -t afk0901/game_api:dev
GIT_COMMIT=$1 docker-compose up