#!/usr/bin/env bash

git pull

docker system prune -f

docker-compose -f docker-compose.prod.yml up --build -d

docker-compose -f docker-compose.prod.yml exec api php artisan migrate

docker system prune -f
