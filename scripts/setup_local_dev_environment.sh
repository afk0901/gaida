#!/bin/bash

#This script installs Git, NodeJS, Aws and Terraform
#the OS used is Linux Ubuntu 18.04

#Installs Git
installGit () {
    #Changing color to green
    echo -e "\e[92mINSTALLING GIT:"
    #Changing color back to default
    echo -e "\e[39m"
    #Installs git
    sudo apt-get -y install git
    echo -e "\e[92mDONE INSTALLING GIT"
}

#Installs NodeJS 
installNodeJS () {

    #Install Node.js
    echo -e "\e[92mINSTALLING NODEJS..."
    #Changing color back to default
    echo -e "\e[39m"
    sudo apt-get -y install nodejs
    echo -e "\e[92mINSTALLING NODEJS DONE"
}

installNodeDependencies() {
    echo -e "\e[92mINSTALL NODE DEPENDENCIES..."
    #Go to the app
    cd ../item_repository
    #Install express
    npm install express
  
    echo -e "\e[92mDONE INSTALL NODE DEPENDENCIES"
    #Go back
    cd -
}

#Installs AWS
installAws()
{
    #Install awscli and its dependencies
    echo -e "\e[92mINSTALLING awscli..."
    #Changing color back to default
    echo -e "\e[39m"
    sudo apt -y install awscli
    echo -e "\e[92mDONE INSTALLING awscli"
}

#Installs Docker
installDocker()
{
    #Install Docker Engine - Community - latest version
    echo -e "\e[92mINSTALLING DOCKER ENGINE..."
    #Changing color back to default
    echo -e "\e[39m"
    sudo apt -y install docker.io
    echo -e "\e[92mDONE INSTALLING DOCKER ENGINE"
    #Installing docker compose
    echo "INSTALLING DOCKER COMPOSE..."
    #Changing color back to default
    echo -e "\e[39m"
    sudo apt -y install docker-compose
    echo -e "\e[92mDONE INSTALLING DOCKER COMPOSE"
    #Changing color back to default
    echo -e "\e[39m"
}

#Downloads Terraform and exctracts it 
#(Credit: https://askubuntu.com/questions/983351/how-to-install-terraform-in-ubuntu)
install_TerraForm() {
    echo -e "\e[92mINSTALLING TERRAFORM..."
    #Changing color back to default
    echo -e "\e[39m"

    #So it's possible to unzip the Terraform zip file
    sudo apt-get -y install unzip 
    #Download Terraform
    wget https://releases.hashicorp.com/terraform/0.12.16/terraform_0.12.16_linux_amd64.zip
    #Unzip Terraform
    unzip terraform_0.12.16_linux_amd64.zip
    echo -e "\e[92mDONE INSTALLING TERRAFORM"
    #Changing color back to default
    echo -e "\e[39m"
}

printVersions() {
    #Changing color to green
    echo -e "\e[92m"
    #For seperation of the text
    createLineBreaks
    echo "VERSION OF ALL TOOLS:" 
    echo "GIT VERSION:"
    #Git version 
    git --version 

    echo "NodeJS version:"
    #NodeJS version 
    node -v 

    echo "NPM VERSION:"
    #NPM version
    npm -v 

    echo "AWS VERSION:"
    #aws version
    aws --version

    #For seperation of the text
    createLineBreaks
    echo "DOCKER INFORMATION:"
    #Prints out docker information
    sudo docker version

    #For seperation of the text
    createLineBreaks
    echo "TERRAFORM VERSION:"
    #Terraform version
    ../terraform --version

    #Changing color back to default
    echo -e "\e[39m"
}

#Log the output to a text file (When installing NodeJS and Git)
createLog() {
    #Create a log file
    touch ./log.txt
    #Change permissions so it's possible to write and read the log file
    sudo chmod 777 ./log.txt
}

#Creates line breaks for seperation
createLineBreaks() {
    printf "\n" | tee -a ./log.txt
    printf "\n" | tee -a ./log.txt
    printf "\n" | tee -a ./log.txt
    printf "\n" | tee -a ./log.txt
}

main () {
    #Date when the script started with seconds
    NOW=`date +"%c"`

    echo "SCRIPT STARTED AT:"
    #Current date
    echo $NOW
    #A welcome message to the current user
    #Change the text color to light cyan
    echo -e "\e[96m"
    echo Welcome $USER
    echo "This script prints out the current OS, git, NodeJS and Terraform"
    echo "It also prints the versions of these tools"

    #current OS
    OS=`uname -a`
    echo "Running on: $OS"

    #Changing color back to default
    echo -e "\e[39m"
}

main

#For seperation of the text
createLineBreaks

#Update the package list
sudo apt-get update

#For seperation of the text
createLineBreaks

cd .. #So everything is installed in the correct directory

#Install AWS
installAws
#For seperation of the text
createLineBreaks
#Installs Docker
installDocker
#For seperation of the text
createLineBreaks
#Installs Terraform
install_TerraForm

cd - #Back in the  scripts directory so the log file is created in the right place
#Creates a log
createLog
#install Git
installGit | tee -a ./log.txt

#For seperation of the text
createLineBreaks

#Install NodeJS
installNodeJS | tee -a ./log.txt

#For seperation of the text
createLineBreaks

installNodeDependencies

#For seperation of the text
createLineBreaks

#Printing the version of the things that was installed
printVersions

#For seperation of the text
createLineBreaks

#Script ended at this date with seconds
echo "SCRIPT ENDED AT:" 
date +"%c" 
