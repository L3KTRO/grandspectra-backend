#!/bin/sh

# Configuración inicial
php artisan config:cache
php artisan view:cache
php artisan route:cache

(crontab -l ; echo "* * * * * cd /var/www && php artisan schedule:run >> /dev/null 2>&1")| crontab -

# Asegurar permisos finales
chown -R www-data:www-data /var/www/storage

# Resetear permisos de logs al iniciar
chown -R www-data:www-data /var/log/php-fpm
rm -f /var/log/php-fpm/*


exec "$@"
