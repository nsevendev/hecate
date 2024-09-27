# Hecate

## Prérequis

-   cloner le projet
-   Copier le fichier `.env.public` en `.env.dev.local` et remplir les variables d'environnement  
    demander à un membre de l'équipe pour les valeurs à mettre
- creer les fichiers `init-db-test.sh` et `install-deps.sh`

## Code `init-db-test.sh`

- pour windows copier coller le code dans notepad avant de le copier coller dans le fichier.

```bash
#!/bin/bash
set -e

# Création de la base de données de test
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE ${POSTGRES_TEST_DB};
    GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_TEST_DB} TO ${POSTGRES_USER};
EOSQL

echo "Base de données de test '$POSTGRES_TEST_DB' créée avec succès."
```

## Code `install-deps.sh`

- pour windows copier coller le code dans notepad avant de le copier coller dans le fichier.

```bash
#!/bin/sh
set -e

# Check if node_modules is empty
if [ -z "$(ls -A 'node_modules' 2>/dev/null)" ]; then
    echo "node_modules est vide, lancement npm install..."
    npm ci
else
    echo "node_modules est déjà installé..."
fi

exec "$@"

```

## utilisation des containers (sans maker)

-   Lancement des containers

```bash
# lancement de tout les containers api + bdd
docker compose --env-file .env.dev.local up

# lancement du container api
# attention le container de la bdd doit être lancé
docker compose --env-file .env.dev.local up api

# lancement du container bdd
docker compose --env-file .env.dev.local up db
```

-   Arret des containers

```bash
# arret de tout les containers
docker compose --env-file .env.dev.local down

# arret du container api
docker compose --env-file .env.dev.local down api

# arret du container bdd
docker compose --env-file .env.dev.local down db

# arret de tout les containers et suppression des immages
docker compose --env-file .env.dev.local down --rmi all
```

## utilisation des containers (avec make)

-   Tapez la commande `make` pour voir les commandes disponibles

## Utiisation des fixtures

-   Les fixtures sont executer dans un micro service de l'application de base
    il replique l'application et lance la creation des fixtures. ATTENTION commande à ne pas lancer en production

```bash
# connection au container
docker exec -it namecontainer bash

# lancement des fixtures
npm run seed
```

## Utilisation des tests

```bash
# connexion au container
docker exec -it namecontainer bash

# lancement des tests dans le container
#(vous pouvez regarder les commandes disponible dans le package.json si besoin)
npm run test:v
```
