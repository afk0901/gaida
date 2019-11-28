# Docker Exercise
This assignment was about using docker. 
Creating images, build them and run the containers a
nd expose one container outside that container. 
It's about the very fundamentals of docker. These questions are to
get people to think about what it is and how it works.

## What is Docker?
Docker makes it easier to create, deploy and run applications by using containers. 
Because containers are totally isolated and it thinks it's alone in the world and 
it's possible to share resources with containers on the same machine, 
then docker also reduce a lot of cost. It simplifies deploying configurations 
because it's easy to tear them down and up and change them at any time. It's also
no need to install things as it's possible to have docker to do it for you.
Docker also always remains the same, no need to make a docker file for each deployment stage.

## What is the difference between:
* Virtual Machine
* Docker Container
* Docker Image

A virtual machine uses the kernel space and shares hardware from the host. 
A virtual machine behaves exactly like a real computer, unless it is very 
depended on the hardware and the OS. VM machines act like many OS on the same computer and is 
therefore slower, takes time to setup and sometimes daunting to do and wastes resources.
  
On the other hand a docker container is a system process, so it shares the operating system,
boots fast and is easy to tear down and run up again in seconds and are very lightweight.

Still they remain in isolation like VMs do, so the benefits of VMs, that they are isolated 
is achived. In both cases a "clean" machines are created and containers save resources 
becuse they are only processes. On the other hand, VMs may be more secure in some cases.
With Docker it's also easier to have the same configuration file through the development pipeline.

A image is like a blueprint of how the container should behave. It's a set of configurations
that makes up the container, such as installing dependencies, environment variables and how
it's going to run, for example, how to start the program/process. It's an instance of a 
container.

## Web API?
A Web API is an API that uses HTTP requests to communicate between the client and the server.
It uses methods such as GET, POST, DELETE, PUT, PATCH, UPDATE and so on. It's a way to get some
resources from the server via HTTP and is widelly used today. Many of them use hypermedia
to prevent the client from breaking.

## Postgres?
Postgres is a  PostgreSQL object-relational SQL database system. 
It's a yet another way to create, store and read data with the help of SQL. 
It's open source and free. Many people like it's architecture, data integrity, 
reliability and so on. Postgres is also often used as another name for PostgreSQL  

## package.json file dependencies field:
Package.json is a file that stores all the dependencies that a Node application may need and
other metadata such as what project it is, the version of the project in distrubution and so on.
It's used by the NPM to find dependencies for example with npm install. 

## npm express package:
It's a node.js module that provides a web framework for NodeJS for routing, test coverage and 
acts like a server so it hangs there and waits for clients to connect to route them. 
It's a small robust tool for HTTP servers. It's focus is on high performance, high test coverage 
and routing.

## npm pg package:
It's a npm package for PostgreSQL. It provides a pure javascript client, extensible JS, 
parameterized queries and many stuff related to PostgreSQL. 

## What is docker-compose:
Docker compose is a tool to put many containers together in a simple manner by using a .yml file.
It helps a lot in getting the containers up and tearing them down, many at once. It fetches the
images from dockerHub by pulling them.

## Results
In this exercise we learned about the very fundamentals of docker. 
We learned to create images, containers, share our image with the world and getting to know
docker compose, so it's easy to tear containers down and get them up again at no time. 
We also runned some containers without docker composer. Then some general questions were
asked for more understanding.
