#!/bin/bash
set -euxo pipefail

export GIT_COMMIT=$1
docker-compose up -d