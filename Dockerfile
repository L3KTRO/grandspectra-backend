# Dockerfile
FROM php:8.3-fpm-alpine

# Instalar dependencias necesarias
RUN apk add --no-cache bash git unzip curl libpng-dev libjpeg-turbo-dev freetype-dev icu-dev libxml2-dev oniguruma-dev mariadb-connector-c-dev zlib-dev postgresql-dev

# Habilitar extensiones de PHP necesarias
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install -j$(nproc) pdo pdo_mysql pdo_pgsql pgsql gd intl mbstring xml

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar la aplicación
WORKDIR /var/www
COPY . .

# Instalar dependencias de Composer
RUN composer install --no-dev --optimize-autoloader

# Establecer permisos para storage y bootstrap/cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache || true && \
    chmod -R 775 /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
