#/bin/bash

docker stop order-ms && docker rm order-ms
docker build -t order-ms --file Dockerfile .
docker run --rm -v $PWD:/usr/src/app/order-service:cached --name order-ms -p 4009:4009 --env-file .env --network mynet -d order-ms
docker logs -f order-ms