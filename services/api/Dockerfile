FROM php:7.2-fpm

RUN apt-get update --fix-missing && apt-get install -y apt-transport-https
RUN apt-get install -y git curl cron openssl zip unzip build-essential zlib1g-dev libpng-dev supervisor

RUN curl -L -o /tmp/redis.tar.gz https://github.com/phpredis/phpredis/archive/5.0.0.tar.gz \
    && tar xvf /tmp/redis.tar.gz \
    && rm -r /tmp/redis.tar.gz \
    && mkdir -p /usr/src/php/ext \
    && mv phpredis-* /usr/src/php/ext/redis

RUN docker-php-ext-install pdo_mysql mbstring zip gd bcmath redis
RUN docker-php-ext-configure pdo_mysql
RUN docker-php-ext-enable redis

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www

ADD composer.json ./

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN composer install --no-interaction --no-progress --no-scripts --no-autoloader --ansi

ADD . ./

RUN composer dump-autoload
