#Defines the provider, in this case AWS and where it can find the
#credentials of the instance. The provider is AWS in this case
#and credentials are stored in ~/.aws/credentials

# Top of file
variable "environment" {
  type = string
}

provider "aws" {
  shared_credentials_file = "~/.aws/credentials"
  region                  = "us-east-1"
}

#Sets the security group in AWS wich defines what's allowed and what's not allowed. 
#Each Ingress rule defines an inbound rule to permit instances to recive traffic. 
#In this case it's allowed to recive traffic from and to port 22
#and from and to port 3000 to any IP address.
#Each egress rule defines a outbound rule that allows instances to send traffic.
#In this case it's allowed to send traffic from any port from any IP address.  
resource "aws_security_group" "game_security_group" {
  name = "GameSecurityGroup_${var.environment}"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

#Provides configurations to create an instance.
#It's name is game_server and the type is aws_instance and that provides an EC2 instance.
#Configures the SSH key to use (key_name) to access the instance and what kind of
#instance it is, in this case it's a T2 instance wich means it's a small, low cost
#instance. Defines the security group id to apply to this instance wich is the 
#security group defined above in this case.
resource "aws_instance" "game_server" {
  ami                    = "ami-0ac019f4fcb7cb7e6"
  instance_type          = "t2.micro"
  key_name               = "GameKeyPair"
  vpc_security_group_ids = [aws_security_group.game_security_group.id]
  tags = {
    Name = "GameServer_${var.environment}"
  }

  # Adds the initialize script to a specific place in the instance
  # and sets up the connection with the private key and tries to 
  #connect to the agent with SSH until it's available to perform 
  #this operation.
  #The host is found by getting the public IP address or private IP address
  #depending on wich one is defined, if both definded somehow, the public one
  #is used.
  provisioner "file" {
    source      = "/var/lib/jenkins/terraform/hgop/production/scripts/initialize_game_api_instance.sh"
    destination = "/home/ubuntu/initialize_game_api_instance.sh"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }
   #Adds the docker compose script to the instance
   provisioner "file" {
    source      = "/var/lib/jenkins/terraform/hgop/production/scripts/docker_compose_up.sh"
    destination = "/home/ubuntu/docker_compose_up.sh"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }

  # Adds the docker compose file to a specific place in the instance. 
  #Besides that, it does the same thing as the configuration above.
  provisioner "file" {
    source      = "/var/lib/jenkins/terraform/hgop/production/docker-compose.yml"
    destination = "/home/ubuntu/docker-compose.yml"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }

  #Adding game_api directory/home/ubuntu/game_api/
  provisioner "file" {
    source      = "/var/lib/jenkins/terraform/hgop/production/game_api/"
    destination = "/home/ubuntu"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }

  # This is used to run commands on the instance we just created.
  # Terraform does this by SSHing into the instance and then executing the commands.
  # Since it can take time for the SSH agent on machine to start up we let Terraform
  # handle the retry logic, it will try to connect to the agent until it is available
  # that way we know the instance is available through SSH after Terraform finishes.
  # When Terraform connects through SSH, it gives the initialize script an execution
  #permission.
  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/initialize_game_api_instance.sh",
      "chmod +x /home/ubuntu/docker_compose_up.sh",
    ]

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }
}

# Gets the instance public IP address and stores it in the public_ip variable
#so it's possible to use it when running terraform
output "public_ip" {
  value = aws_instance.game_server.public_ip
}