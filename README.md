# Hecate

> Api pour l'application nseven

## Mode dev

- Copier le fichier `.env` en `.env.dev.local` et modifier les valeurs  
- Recuperer les fichiers `dev.decrypt.private` et les placer dans le dossier `config/secret/dev`

```bash
# build image (premier lancement)
make build

# lancer les containers dev
make up-dev

# les deux commandes
make start-dev
```
> pour d'autre commande taper `make` dans le terminal
