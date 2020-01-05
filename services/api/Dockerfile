FROM php:7.2-fpm

RUN apt-get update --fix-missing && apt-get install -y apt-transport-https
RUN apt-get install -y git curl cron openssl zip unzip build-essential zlib1g-dev libpng-dev

RUN docker-php-ext-configure pdo_mysql
RUN docker-php-ext-install pdo_mysql mbstring zip gd bcmath

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www

ADD composer.json /var/www/composer.json

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN composer install --no-interaction --no-progress --no-scripts --no-autoloader

ADD . ./

RUN composer install
