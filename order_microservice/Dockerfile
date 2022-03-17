FROM node:14

#create a working directory
WORKDIR /usr/src/app/order-service

#copy package.json file under the working directory
COPY package.json /usr/src/app/order-service

RUN npm install && npm install -g nodemon
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app/order-service

#expose the port 4009
EXPOSE 4009

#start nodejs server
#CMD npm start

CMD npm run start-watch

