FROM node:14

#create a working directory
WORKDIR /usr/src/app/sqs_consumer_microservice

#copy package.json file under the working directory
COPY package.json /usr/src/app/sqs_consumer_microservice

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app/sqs_consumer_microservice

#expose the port 4004
#EXPOSE 4004

#start nodejs server
CMD node index.js
