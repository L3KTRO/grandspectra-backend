# Dockerfile
FROM php:8.3-fpm-alpine

# Instalar dependencias necesarias
RUN apk add --no-cache bash git unzip curl libpng-dev libjpeg-turbo-dev freetype-dev icu-dev libxml2-dev oniguruma-dev mariadb-connector-c-dev zlib-dev postgresql-dev

# Habilitar extensiones de PHP necesarias
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install -j$(nproc) pdo pdo_mysql pdo_pgsql pgsql gd intl mbstring xml

WORKDIR /var/www

# Copiar la aplicación
COPY . .

EXPOSE 9000

CMD ["php-fpm"]
