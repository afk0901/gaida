#!/bin/bash

#This script installs Git, NodeJS and Aws

#Date when the script started with seconds
NOW=`date +"%c"`

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
echo "Running on $OS"
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
#Log the output
installNodeJSAndGit | tee -a ./log.txt

#Installs Aws and prints the aws version
installAws()
{
#Install awscli
#echo "INSTALLING awscli..."
#Installs awscli and its dependencies
sudo apt install awscli
echo "DONE INSTALLING awscli"
echo "AWS VERSION:"
aws --version
}

#Log the output when installing NodeJS and git
installNodeJSAndGit | tee -a ./log.txt
#Installs Aws and prints its version
installAws
echo "INATALLING DOCKER ENGINE..."
#Install Docker Engine - Community - latest version
sudo apt-get install docker-ce docker-ce-cli containerd.io
echo "DONE INSTALLING DOCKER ENGINE"
echo "DOCKER INFORMATION:"
docker version
echo "SCRIPT ENDED AT:" 
#Script ended at this date with seconds
date +"%c" 
