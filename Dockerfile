# Etapa 1: Instalación de dependencias con Composer
FROM composer:2 AS composer

# Definir el directorio de trabajo para Composer
WORKDIR /app

# Copiar archivos de Composer para aprovechar el cache en reconstrucciones
COPY composer.json composer.lock ./

# Instalar dependencias sin incluir paquetes de desarrollo y optimizando la instalación
RUN composer install --prefer-dist --no-scripts --ignore-platform-reqs

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
    postgresql-dev


# Instalar extensiones PHP requeridas por Laravel
RUN docker-php-ext-install pdo_pgsql mbstring


# Definir el directorio de la aplicación
WORKDIR /var/www

# Copiar el código de la aplicación desde el contexto al contenedor
COPY . .

# Copiar el directorio vendor generado en la etapa anterior
COPY --from=composer /app/vendor /var/www/vendor

# Ajustar permisos para el usuario de PHP
RUN chown -R www-data:www-data /var/www

# Crear un archivo crontab para ejecutar el scheduler cada minuto
RUN echo '* * * * * www-data php /var/www/artisan schedule:run >> /var/log/cron.log 2>&1' > /etc/crontabs/www-data

# Crear un archivo de log para cron
RUN touch /var/log/cron.log

# Exponer el puerto en el que PHP-FPM atenderá las peticiones
EXPOSE 9000

# Comando para iniciar cron en segundo plano y PHP-FPM
CMD ["sh", "-c", "crond & php-fpm"]
