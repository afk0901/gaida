#!/bin/bash

set -euxo pipefail
sudo docker build ../game_api -t afk0901/game_api:dev
GIT_COMMIT=dev docker-compose up -d