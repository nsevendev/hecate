# Hecate

> Backend du site nseven

## Préréquis

- creer un fichier `.env.dev.local` en copiant le fichier `.env.dev.public`  
  demander les informations à l'administrateur.

## Utiliser le container dev

```bash
# lancer le container dev
docker compose --env-file .env.dev.local up rust-dev

# arrete/supprimer le container dev
docker compose --env-file .env.dev.local down rust-dev

# arreter/supprimer et supprimer l'image du container
docker compose --env-file .env.dev.local down --rmi all rust-dev
```

## Utiliser le container test

```bash
# lancer le container dev
docker compose --env-file .env.dev.local up rust-test

# arrete/supprimer le container dev
docker compose --env-file .env.dev.local down rust-test

# arreter/supprimer et supprimer l'image du container
docker compose --env-file .env.dev.local down --rmi all rust-test
```

## Utiliser le container linter

```bash
# lancer le container dev
docker compose --env-file .env.dev.local up rust-clippy

# arrete/supprimer le container dev
docker compose --env-file .env.dev.local down rust-clippy

# arreter/supprimer et supprimer l'image du container
docker compose --env-file .env.dev.local down --rmi all rust-clippy
```
