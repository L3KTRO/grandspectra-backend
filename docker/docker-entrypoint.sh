#!/bin/sh

php artisan app:initialize

(crontab -l ; echo "* * * * * cd /var/www && php artisan schedule:run >> /tmp/output.txt 2> /tmp/output.err")| crontab -

crond

# Asegurar permisos finales
chown -R www-data:www-data /var/www/storage

# Resetear permisos de logs al iniciar
chown -R www-data:www-data /var/log/php-fpm
rm -f /var/log/php-fpm/*

exec "$@"
