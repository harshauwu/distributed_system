# Distributed System

### Used Technologies
- Nodejs
- Express
- Mongodb
- AWS
- Swagger
- Docker

### Architecture

##### Below is the architectural diagram for distributed system project.

![My Image](/documents/architecture/distributed_system.png)

This system has two microservices
- Order Microservice
- Voucher Consumer Microservice

### Installation
First you need to clone order and voucher microservice code into local machine.

##### Create network
```
docker network create mynet
```

##### Pull Mongo Image
```
docker pull mongo
docker run --name mongod -d -v mongo-data:/data/db -p 27017:27017 --network mynet mongo
```
Then you can create two table in mongodb
- order_db
- voucher_db

##### Env Variable for Microservices
- Order Microservice

```
APP=dev
PORT=4009

DB_DIALECT=mongo
DB_SERVER=mongod
DB_HOST=mongod
DB_PORT=27017
DB_NAME=order_db
REPLICA_NAME=rs0

AWS_ACCESS_KEY_ID=xxxxx
AWS_SECRET_ACCESS_KEY=xxxx
AWS_REGION=xx-xxxx-x
SQS_URL=xxxxx
```
- Consumer Microservice

```
APP=dev

DB_HOST=mongod

AWS_ACCESS_KEY_ID=XXXXXXX
AWS_SECRET_ACCESS_KEY=XXXXXXX
AWS_REGION=xx-xxxx-x
SQS_URL=xxxxx

```
Both the microservices has build-dev.sh file. To up the microservice need to run this file.

After run the Order Microservice we can access api documentation using below url:
http://localhost:4009/order-service/v1/api-docs

I have attached screenshot of the swagger api documentation below.

![My Image](/documents/swagger_documentation.png)
