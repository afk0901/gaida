#!/bin/bash

set -euxo pipefail

docker build ../game_api -t afk0901/game_api_repoitory:dev
GIT_COMMIT=dev docker-compose up