# Hecate

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

-   Arrete des containers

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
