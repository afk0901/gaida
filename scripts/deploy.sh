#!/bin/bash
#Moving to the directory where Terraform is installed and its configuration files
cd ..
set -euxo pipefail
./terraform init #Initalize Terraform so its possible to use it
./terraform destroy -auto-approve -var environment=production #Destroys all instances managed by Terraform
./terraform plan #Show the execution plan
./terraform apply -auto-approve -var environment=production #Apply the new instance
#Run the initialization script on the instance
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(./terraform output public_ip) "./initialize_game_api_instance.sh"
curl $(terraform output public_ip):3000/status


