#!/bin/bash
set -euxo pipefail

docker-compose down
docker-compose up

exit(0)


