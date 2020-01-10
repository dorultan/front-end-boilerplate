#!/usr/bin/env bash

git pull

docker system prune -f

docker-compose -f docker-compose.prod.yml up --build

docker-compose -f docker-compose.prod.yml exec api php artisan migrate

docker-compose -f docker-compose.prod.yml run client npm run build

docker system prune -f
