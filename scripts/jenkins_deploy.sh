#!/bin/bash


GIT_COMMIT=$1

# We need to move some files around, because of the terraform state limitations.
#apitest = environment
mkdir -p /var/lib/jenkins/terraform/hgop/apitest
mkdir -p /var/lib/jenkins/terraform/hgop/apitest/scripts
rm -f /var/lib/jenkins/terraform/hgop/apitest/scripts/initialize_game_api_instance.sh
cp scripts/initialize_game_api_instance.sh /var/lib/jenkins/terraform/hgop/apitest/scripts/initialize_game_api_instance.sh
rm -f /var/lib/jenkins/terraform/hgop/apitest/scripts/docker_compose_up.sh
cp scripts/docker_compose_up.sh /var/lib/jenkins/terraform/hgop/apitest/scripts/docker_compose_up.sh
rm -f /var/lib/jenkins/terraform/hgop/apitest/docker-compose.yml
cp docker-compose.yml /var/lib/jenkins/terraform/hgop/apitest/docker-compose.yml


rm -f /var/lib/jenkins/terraform/hgop/apitest/*.tf
cp ./*.tf /var/lib/jenkins/terraform/hgop/apitest/

#cd into the Terraform path and set the environment
cd /var/lib/jenkins/terraform/hgop/apitest
./terraform init # In case terraform is not initialized.
./terraform force-unlock
./terraform destroy -auto-approve -var environment=apitest || exit 1
./terraform apply -auto-approve -var environment=apitest  || exit 1

echo "Game API running at " + $(./terraform output public_ip)

ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(./terraform output public_ip) "./initialize_game_api_instance.sh"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(./terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT"

exit 0
