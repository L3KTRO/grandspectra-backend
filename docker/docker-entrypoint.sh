#!/bin/sh
set -e

echo "Limpiando cache de Laravel..."
rm -rf bootstrap/cache/*.php
rm -f public/hot

php artisan clear-compiled 2>/dev/null || true

echo "Compilando assets del frontend..."
npm run build

echo "Esperando a que la base de datos esté lista..."
until php artisan db:show 2>/dev/null | grep -q "Connection"; do
    echo "Base de datos no disponible aún - esperando..."
    sleep 2
done

echo "Base de datos lista. Ejecutando migraciones..."
php artisan migrate --force --no-interaction 

echo "Inicializando aplicación..."
php artisan optimize
php artisan wayfinder:generate || true
php artisan scout:sync-index-settings || true

echo "Configurando cron..."
(crontab -l 2>/dev/null ; echo "* * * * * cd /var/www && php artisan schedule:run >> /tmp/output.txt 2> /tmp/output.err")| crontab -
crond

# Asegurar permisos finales
chown -R www-data:www-data /var/www/storage
mkdir -p /var/log/php-fpm
chown -R www-data:www-data /var/log/php-fpm 2>/dev/null || true

echo "Iniciando servicios..."
exec "$@"
