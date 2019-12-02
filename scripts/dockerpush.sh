#!/bin/bash

GIT_COMMIT=$1

#Logins automatically - prevents the password from ending up in shell's 
#history or log files, redirecteds the password to the stdin
cat ./scripts/dockerpass.txt | docker login --username afk0901 --password-stdin


docker push afk0901/item_repository:$GIT_COMMIT

#exit on error if any command fails
set -e

