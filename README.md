# Full-stack Boilerplate

Boilerplate repository for a full-stack Laravel and React web app.

### Quick Start (Development)

```bash
# Setup .env file
cp .env.example .env

# Build and start docker services
docker-compose up --build # This will take ~5 minutes on first run

# Generate APP_KEY env
docker-compose exec api php artisan key:generate

# Migrate and seed database
docker-compose exec api php artisan migrate --seed
```

Now [localhost:8081](http://localhost:8081) will serve the compiled assets once the client service has finished processing.

### Adding Packages

```bash
# Add a PHP package
docker-compose exec api composer require guzzlehttp/guzzle

# Add a JS package
docker-compose exec client npm add lodash # or npm add -D lodash for a dev dependency
```

### Production Install

```bash
# Setup .env file
cp .env.example .env
```

Setup remote database, then change these values inside the .env file:

```dotenv
APP_ENV=production
APP_DEBUG=false

# Change the DB_* variables to point to a remote database
DB_HOST=remote-host
DB_USERNAME=remote-db-username
DB_PASSWORD=remote-db-password
```

```bash
# Build and start docker services
docker-compose -f docker-compose.prod.yml up --build # This will take ~5 minutes on first run

# Generate APP_KEY env
docker-compose -f docker-compose.prod.yml exec api php artisan key:generate

# Migrate and seed database
docker-compose -f docker-compose.prod.yml exec api php artisan migrate --seed
```

### Updating Production

```bash
./bin/update.sh
```
