# Etapa de compilación
FROM php:8.3-fpm-alpine AS builder

# Instalar dependencias del sistema
RUN apk add --no-cache bash git unzip curl

# Instalar Composer globalmente
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www

# Copiar archivos de Composer y descargar dependencias sin dependencias de desarrollo
COPY composer.json composer.lock ./

# Instalar dependencias de PHP SIN ejecutar los scripts
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copiar el resto de la aplicación
COPY . .

# Hacer ejecutable el archivo artisan por si no lo fuera
RUN chmod +x artisan

# Ejecutar los scripts de Composer (package:discover, etc.)
RUN composer run-script post-autoload-dump

# Generar caches de configuración, rutas y vistas (opcional)
RUN php artisan config:cache && \
    php artisan route:cache

# Etapa final: imagen optimizada y ligera
FROM php:8.3-fpm-alpine

WORKDIR /var/www

# Copiar la aplicación optimizada desde la etapa builder
COPY --from=builder /var/www /var/www

# Configurar el usuario y permisos para evitar errores (p.ej.: "Permission denied" en storage)
RUN addgroup -g 82 -S www-data || true && \
    adduser -u 82 -D -S -G www-data www-data || true && \
    chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache && \
    chmod -R 775 /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
