#!/bin/bash
set -e

# Création de la base de données de test
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE ${POSTGRES_TEST_DB};
    GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_TEST_DB} TO ${POSTGRES_USER};
EOSQL

echo "Base de données de test '$POSTGRES_TEST_DB' créée avec succès."