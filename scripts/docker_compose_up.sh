#!/bin/bash

export GIT_COMMIT
echo $GIT_COMMIT
docker-compose down
docker-compose up
