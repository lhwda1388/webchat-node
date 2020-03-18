#!/bin/sh

echo "Killing containers"

cd infra

docker-compose down

echo "Pruning container and removing data from data..."

docker container prune -f && docker volume rm webchat-redis

./start_infra.sh