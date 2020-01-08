#!/usr/bin/env bash

/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf

touch /var/log/cron.log
chmod 0644 /etc/cron.d/scheduler.conf
crontab /etc/cron.d/scheduler.conf

php-fpm && cron
