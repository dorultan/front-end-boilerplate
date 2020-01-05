#!/usr/bin/env bash

git pull

docker system prune -f

docker-compose -f docker-compose.prod.yml up --build

docker-compose -f docker-compose.prod.yml php artisan migrate

docker system prune -f
