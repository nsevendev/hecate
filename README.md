# Hecate

## Prérequis

-   cloner le projet
-   Copier le fichier `.env.public` en `.env.dev.local` et remplir les variables d'environnement  
    demander à un membre de l'équipe pour les valeurs à mettre

- SUR WINDOWS

    - recreer à la main tous les fichiers du dossier scripts

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
```

## utilisation des containers (avec make)

-   Tapez la commande `make` pour voir les commandes disponibles

## Utiisation des fixtures

-   Les fixtures sont executer dans un micro service de l'application de base
    il replique l'application et lance la creation des fixtures. ATTENTION commande à ne pas lancer en production

```bash
# connection au container
docker exec -it nest-dev-hecate bash

# lancement des fixtures
npm run seed
```

## Commandes utiles

```bash
# connexion au container
docker exec -it nest-dev-hecate bash

# lancement des tests dans le container
#(vous pouvez regarder les commandes dans le package.json si besoin)
npm run test:v

# lancement des fixtures
npm run seed
```
