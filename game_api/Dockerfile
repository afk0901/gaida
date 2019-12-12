#Getting the image for NodeJS
FROM node:erbium

#Changing the working directory
WORKDIR /code

#Copy package.json to the container
COPY package.json package.json 

COPY ./ /code

RUN npm install --production

COPY *.js ./

#Run app.js with NodeJS
CMD node app.js

