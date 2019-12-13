#!/bin/bash


GIT_COMMIT=$1

# We need to move some files around, because of the terraform state limitations.
mkdir -p /var/lib/jenkins/terraform/hgop/$2
mkdir -p /var/lib/jenkins/terraform/hgop/$2/scripts
rm -f /var/lib/jenkins/terraform/hgop/$2/scripts/initialize_game_api_instance.sh
cp scripts/initialize_game_api_instance.sh /var/lib/jenkins/terraform/hgop/$2/scripts/initialize_game_api_instance.sh
rm -f /var/lib/jenkins/terraform/hgop/$2/scripts/docker_compose_up.sh
cp scripts/docker_compose_up.sh /var/lib/jenkins/terraform/hgop/$2/scripts/docker_compose_up.sh
rm -f /var/lib/jenkins/terraform/hgop/$2/docker-compose.yml
cp docker-compose.yml /var/lib/jenkins/terraform/hgop/$2/docker-compose.yml
cp game_api/package.json /var/lib/jenkins/terraform/hgop/$2/package.json


rm -f /var/lib/jenkins/terraform/hgop/$2/*.tf
cp ./*.tf /var/lib/jenkins/terraform/hgop/$2/
cp ./terraform /var/lib/jenkins/terraform/hgop/$2/


cd /var/lib/jenkins/terraform/hgop/$2
./terraform init # In case terraform is not initialized
./terraform force-unlock
./terraform destroy -auto-approve -var environment=$2 || exit 1
./terraform apply -auto-approve -var environment=$2 || exit 1


echo "Game API running at " + $(./terraform output public_ip)

ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(./terraform output public_ip) "./initialize_game_api_instance.sh"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(./terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT"

#Runs api tests against the apitest instance
if [ $2 == apitest ]
then
  cd /var/lib/jenkins/workspace/Pipeline_project/game_api
  API_URL = $(./terraform output public_ip)
  echo "API url is " + $API_URL
  API_URL="$API_URL:3000" npm run test:api
  cd -
  ./terraform destroy -auto-approve -var environment=$2 || exit 1
fi  

#Runs capacity tests against the capacitytest instance
exit 0