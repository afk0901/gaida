#Getting the image for NodeJS
FROM node:erbium

#Changing the working directory
WORKDIR /code

#Copy package.json to the container
COPY package.json package.json

ENV NODE_ENV production

#Install dependencies depending on the environment and run development things
RUN if [ "$NODE_ENV" = "development" ]; \
	then npm install;  \
         npm install; \
         npm install eslint --save-dev \
         npm run eslint \

	else npm install --production; \
	fi

#Copy database.js to the database.js on the container
COPY database.js database.js

#Copy app.js to the app.js on the container
COPY app.js app.js

#Run app.js with NodeJS
CMD node app.js
