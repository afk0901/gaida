#!/bin/bash

#This script installs Git, NodeJS, Aws and Terraform
#the OS used is Linux (debian) with Ubuntu Mate

#Date when the script started with seconds
NOW=`date +"%c"`
cd .. #So everything is installed in the correct directory

#Update the package list if needed
sudo apt-get update

#Prints out the current username, installs git and node JS, prints out the OS,
#git version NodeJS version and npm version 
installNodeJSAndGit () {
#Create a log file
touch ./log.txt
#Change permissions so it's possible to write and read the log file
sudo chmod 777 ./log.txt 
echo "SCRIPT STARTED AT:"
#Current date
echo $NOW
#A welcome message to the current user
echo Welcome $USER
echo "This script prints out the type of the operating system, git and NodeJS and prints the version of each one"
#current OS
OS=`uname -a`
echo "Running on: $OS"
echo "INSTALLING GIT:"
#Installs git
sudo apt-get install git
echo "DONE INSTALLING GIT"
#Getting packages to install Node.js
echo "SETTING UP PACKAGES TO INSTALL NODE.JS..."
#Installs curl
sudo apt-get install curl
#Get the package to install NodeJS
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash - 
#Install Node.js
echo "INSTALLING NODEJS..." 
sudo apt-get install nodejs 
echo "INSTALLING NODEJS DONE"
echo "INSTALLING NPM..."
#Install npm 
sudo apt-get install npm 
echo "DONE INSTALLING NPM" 
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
}
#Log the output to a text file
installNodeJSAndGit | tee -a ./log.txt

#Installs Aws and prints the aws version
installAws()
{
#Install awscli and its dependencies
echo "INSTALLING awscli..."
sudo apt install awscli
echo "DONE INSTALLING awscli"
echo "AWS VERSION:"
aws --version
}

#Downloads Terraform and exctracts it 
#(Credit: https://askubuntu.com/questions/983351/how-to-install-terraform-in-ubuntu)
install_TerraForm()
{
echo "INSTALLING TERRAFORM..."
#So it's possible to unzip the Terraform zip file
sudo apt-get install unzip 
#Download Terraform
wget https://releases.hashicorp.com/terraform/0.12.16/terraform_0.12.16_linux_amd64.zip
#Unzip Terraform
unzip terraform_0.12.16_linux_amd64.zip
#Print Teraform version
./terraform --version
echo "DONE INSTALLING TERRAFORM"
}

#Log the output when installing NodeJS and git
installNodeJSAndGit | tee -a ./log.txt
#Install Docker Engine - Community - latest version
echo "INSTALLING DOCKER ENGINE..."
sudo apt-get install docker-ce docker-ce-cli containerd.io
echo "DONE INSTALLING DOCKER ENGINE"
echo "DOCKER INFORMATION:"
docker version
#Installs Terraform
install_TerraForm
echo "SCRIPT ENDED AT:" 
#Script ended at this date with seconds
date +"%c" 
