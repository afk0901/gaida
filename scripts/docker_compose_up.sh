#!/bin/bash

export GIT_COMMIT=$1
docker-compose down
GIT_COMMIT=$1 docker-compose u
