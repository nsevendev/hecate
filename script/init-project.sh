#!/bin/bash

source .env.dev.local

# Vérifier si Cargo.toml existe déjà
if [ ! -f Cargo.toml ]; then
  echo "Initialisation du projet Rust..."
  cargo init --bin
  echo "Initialisation du projet Rust... OK"

  echo "Ajout des dépendances..."
  for dep in $DEPENDENCIES; do
    cargo add $dep
    echo "Ajout de la dépendance $dep... OK"
  done

  echo "Build du projet..."
  cargo build
  echo "Build du projet... OK"
  
  echo "Projet Rust API REST créé avec succès..."

  echo "Arrêt du container..."
  exit 0
else
  echo "Le projet existe déjà. Aucune action n'est requise."
  echo "Arrêt du container..."
  exit 0
fi

# Passer au processus principal du conteneur (commande CMD ou autre)
exec "$@"