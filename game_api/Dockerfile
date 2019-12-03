#Getting the image for NodeJS
FROM node:erbium

#Changing the working directory
WORKDIR /code

#Copy package.json to the container
COPY package.json package.json

#Install dependencies
RUN npm install

#Copy database.js to the database.js on the container
COPY database.js database.js

#Copy app.js to the app.js on the container
COPY app.js app.js

#Run app.js with NodeJS
CMD node app.js
