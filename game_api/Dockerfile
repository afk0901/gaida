#Getting the image for NodeJS
FROM node:erbium

#Changing the working directory
WORKDIR /code

#Copy package.json to the container
COPY package.json package.json 

COPY ./ /code

#Install dependencies depending on the environment and run development things
ENV NODE_ENV = production;

RUN npm install; 
Run npm install eslint --save-dev;
RUN npm run eslint;

	else npm install --production; \
	fi

#Copy database.js to the database.js on the container
COPY database.js database.js

#Copy app.js to the app.js on the container
COPY app.js app.js

#Run app.js with NodeJS
CMD node app.js
