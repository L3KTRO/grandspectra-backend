# Etapa 1: Instalación optimizada de dependencias con Composer
FROM composer:2.8.12 AS builder

WORKDIR /app

# Copiar solo archivos esenciales para cachear dependencias
COPY composer.json composer.lock ./

# Instalación optimizada para producción (sin dev dependencies)
RUN composer install \
    --prefer-dist \
    --no-scripts \
    --no-dev \
    --ignore-platform-reqs \
    --optimize-autoloader \
    --ansi

# Etapa 2: Construcción de la imagen final
FROM php:8.3-fpm-alpine

COPY ./php-overrides.ini /usr/local/etc/php/conf.d

# Dependencias del sistema y extensiones PHP
RUN apk add --no-cache \
    libpng-dev \
    libxml2-dev \
    oniguruma-dev \
    postgresql-dev \
    supervisor \
    shadow \
    tzdata \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        pdo_pgsql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
    && docker-php-ext-enable opcache

# Configuración de PHP y OPcache (mejora rendimiento)
COPY docker/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

# Configuración de Supervisor para queues y cron
COPY docker/supervisor.conf /etc/supervisor/supervisord.conf

COPY docker/www.conf /usr/local/etc/php/pool.d/www.conf

WORKDIR /var/www

# Copiar aplicación y dependencias
COPY . .
RUN rm -rf vendor
COPY --from=builder /app/vendor vendor/

# Ajustar permisos y usuario
RUN chown -R www-data:www-data /var/www \
    && usermod -u 1000 www-data \
    && chmod -R 775 storage bootstrap/cache

RUN mkdir -p /var/log/supervisor && \
    chown -R www-data:www-data /var/log/supervisor && \
    chmod -R 755 /var/log/supervisor

# Entrypoint para configuraciones dinámicas
COPY docker/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 9000

# Añadir esta línea al final del Dockerfile
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
