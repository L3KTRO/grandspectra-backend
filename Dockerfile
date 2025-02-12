# Etapa 1: Instalación de dependencias con Composer
FROM composer:2 AS composer

# Definir el directorio de trabajo para Composer
WORKDIR /app

# Copiar archivos de Composer para aprovechar el cache en reconstrucciones
COPY . .

RUN composer install --optimize-autoloader
RUN composer dump-autoload
RUN composer run-script post-autoload-dump

# Etapa 2: Construcción de la imagen final
FROM php:8.3-fpm-alpine

# Instalar dependencias del sistema necesarias para compilar extensiones y otras utilidades
RUN apk add --no-cache \
    libpng-dev \
    libxml2-dev \
    oniguruma-dev \
    zip \
    unzip \
    curl \
    postgresql-dev \
    composer

# Instalar extensiones PHP requeridas por Laravel
RUN docker-php-ext-install pdo pdo_pgsql mbstring

# Definir el directorio de la aplicación
WORKDIR /var/www

# Copiar el directorio vendor generado en la etapa anterior
COPY --from=composer /app /var/www

# Ajustar permisos para el usuario de PHP
RUN chown -R www-data:www-data /var/www

RUN php artisan config:cache && php artisan route:cache && php artisan view:cache
RUN composer dump-autoload --no-scripts

# Exponer el puerto en el que PHP-FPM atenderá las peticiones
EXPOSE 9000

# Comando para iniciar PHP-FPM
CMD ["php-fpm"]

