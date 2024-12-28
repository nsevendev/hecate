# Hecate  

> Api pour l'application nseven  

## Mode dev  

- Copier le fichier `.env.dev` en `.env.dev.local` et modifier les valeurs  
- Recuperer les fichiers `dev.decrypt.private` et les placer dans le dossier `config/secret/dev`  

**Si vous êtes en production alors faites la meme chose mais avec les fichiers prod**  
- Recuperer les fichiers `prod.decrypt.private` et les placer dans le dossier `config/secret/prod`  

### Utilisation de docker
```bash
# build image (premier lancement)
make build

# lancer les containers dev
make up

# fait les deux commandes ci-dessus
make start
```
> pour d'autre commande taper `make` dans le terminal  

## Premiere utilisation des tests  

### Creer la bdd de test  

- decommentez les lignes de 2 à 5 du `Makefile`  
- decommentez la ligne de la commande `create-test-db`  
- executer la commande `make create-test-db` dans un terminal, cela creera la bdd de test appeller `hecate_test`  
- commentez toutes les lignes que vous avez decommentez
- executer les tests avec la commande `make test`

## Commandes utiles  

- toutes ses commandes sont dans le compose.json et sont executer via make pour ne pas être obliger de se connecter au container  
- pour voir les commandes taper `make` dans le terminal  
```
# drop and create bdd de test pour réinitialiser le schema de la bdd
make m-bdd

# lancer les tests
make test

# lancer les tests avec coverage
make test-cover

# voir les commandes SF
make sf

... etc ...
```
