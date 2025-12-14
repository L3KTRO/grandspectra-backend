#!/bin/sh
set -e

# Ruta al schema dump de Laravel
SCHEMA_FILE="/docker-entrypoint-initdb.d/mysql-schema.sql"

# Si ya importado, salir
if [ -f "/var/lib/mysql/.schema_imported" ]; then
  echo "Schema ya importado, saliendo."
  exit 0
fi

echo "Esperando a que MySQL esté disponible..."
until mysqladmin ping -h localhost --silent; do
  sleep 1
done

# Crear base de datos y usuario para métricas si están definidos
if [ -n "$METRICS_DATABASE" ] && [ -n "$METRICS_USER" ] && [ -n "$METRICS_PASSWORD" ]; then
  echo "Creando base de datos de métricas: $METRICS_DATABASE"
  mysql -uroot -proot <<-EOSQL
    CREATE DATABASE IF NOT EXISTS \`${METRICS_DATABASE}\`;
    CREATE USER IF NOT EXISTS '${METRICS_USER}'@'%' IDENTIFIED BY '${METRICS_PASSWORD}';
    GRANT ALL PRIVILEGES ON \`${METRICS_DATABASE}\`.* TO '${METRICS_USER}'@'%';
    FLUSH PRIVILEGES;
EOSQL
  echo "Base de datos de métricas creada."
fi

if [ ! -f "$SCHEMA_FILE" ]; then
  echo "No se encuentra $SCHEMA_FILE, nada que importar."
  touch /var/lib/mysql/.schema_imported
  exit 0
fi

echo "Comprobando si la base de datos '$MYSQL_DATABASE' ya tiene tablas..."
EXISTING_TABLES=$(mysql -N -s -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '${MYSQL_DATABASE}';" 2>/dev/null) || EXISTING_TABLES=0

if [ "$EXISTING_TABLES" -gt 0 ]; then
  echo "La base de datos ya contiene $EXISTING_TABLES tablas. No se realizará la importación."
  touch /var/lib/mysql/.schema_imported
  echo "Marcador creado."
  exit 0
fi

echo "Importando schema desde $SCHEMA_FILE..."
mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" < "$SCHEMA_FILE"

echo "Creando marcador de importación..."
touch /var/lib/mysql/.schema_imported

echo "Importación de schema completada."
