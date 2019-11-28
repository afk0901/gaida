#!/bin/bash
cd .. #Moving one above where teraform is installed
./terraform init #Initalize Terraform so its possible to use it
./terraform destroy -auto-approve #Destroys all instances managed by Terraform
./terraform plan #Show the execution plan
./terraform apply -auto-approve #Apply the new instance
#Run the initialization script on the instance
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(./terraform output public_ip) "./initialize_game_api_instance.sh"


