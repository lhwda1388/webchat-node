#!/bin/sh

echo "Building and starting docker containers ..."

cd infra

docker-compose build

docker-compose up -d