#!/bin/bash

docker build -t sqs-consumer --file Dockerfile .
docker stop sqs-consumer
docker rm sqs-consumer
docker run --rm -it --net mynet --env-file .env --name sqs-consumer -v $PWD:/usr/src/app/sqs_consumer_microservice:cached -w /usr/src/app/sqs_consumer_microservice sqs-consumer bash
