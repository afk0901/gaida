#!/bin/bash

GIT_COMMIT=$1

docker push afk0901/item_repository:$GIT_COMMIT

#exit on error if any command fails
set -e

