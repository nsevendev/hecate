# Variables
ifneq (,$(wildcard .env.dev.local))
    include .env.dev.local
    export $(shell sed 's/=.*//' .env.dev.local)
endif

ENV_FILE=.env.dev.local
DOCKER_COMPOSE=docker compose --env-file $(ENV_FILE)
DOCKER_EXEC=docker exec -it ${API_CONTAINER_NAME} bash -c
DOCKER_EXEC_CONNECT_API=docker exec -it ${API_CONTAINER_NAME} bash
DOCKER_EXEC_CONNECT_DB=docker exec -it ${POSTGRES_CONTAINER_NAME} bash

# Générer automatiquement l'aide en utilisant les commentaires ##
.PHONY: help
help:
	@echo "Commandes disponibles :"
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ {printf "  make %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: up up-d up-api up-db down down-api down-db

up: ## Lancer tous les conteneurs (API + BDD) avec logs
	@echo "Lancement de tous les conteneurs (API + BDD)..."
	$(DOCKER_COMPOSE) up

up-d: ## Lancer tous les conteneurs (API + BDD) sans logs
	@echo "Lancement de tous les conteneurs (API + BDD)..."
	$(DOCKER_COMPOSE) up -d

up-api: ## Lancer uniquement le conteneur API
	@echo "Lancement du conteneur API..."
	$(DOCKER_COMPOSE) up api -d

up-db: ## Lancer uniquement le conteneur BDD
	@echo "Lancement du conteneur de la base de données..."
	$(DOCKER_COMPOSE) up db -d

down: ## Arrêter tous les conteneurs
	@echo "Arrêt de tous les conteneurs..."
	$(DOCKER_COMPOSE) down

down-api: ## Arrêter uniquement le conteneur API
	@echo "Arrêt du conteneur API..."
	$(DOCKER_COMPOSE) down api

down-db: ## Arrêter uniquement le conteneur BDD
	@echo "Arrêt du conteneur de la base de données..."
	$(DOCKER_COMPOSE) down db

.PHONY: clean clean-api clean-db clean-db-v

clean: ## Supprimer toutes les images du projet
	@echo "Suppression de toutes les images du projet..."
	$(DOCKER_COMPOSE) down --rmi all

clean-api: ## Supprimer toutes les images de api
	@echo "Suppression des images api..."
	$(DOCKER_COMPOSE) down api --rmi all

clean-db: ## Supprimer toutes les images de db
	@echo "Suppression des images db..."
	$(DOCKER_COMPOSE) down db --rmi all

clean-db-v: ## Supprimer tous les volumes de db
	@echo "Suppression des volumes de db..."
	$(DOCKER_COMPOSE) down db -v

.PHONY: test test-v test-w test-vw

test: ## Exécuter les tests dans le conteneur (jest)
	@echo "Exécution des tests dans le conteneur (jest)..."
	$(DOCKER_EXEC) "npm run test"

test-v: ## Exécuter les tests en mode verbose (jest --verbose)
	@echo "Exécution des tests en mode verbose dans le conteneur..."
	$(DOCKER_EXEC) "npm run test:v"

test-w: ## Exécuter les tests en mode watch (jest --watch)
	@echo "Exécution des tests en mode watch dans le conteneur..."
	$(DOCKER_EXEC) "npm run test:w"

test-vw: ## Exécuter les tests en mode watch + verbose (jest --watch --verbose)
	@echo "Exécution des tests en mode watch + verbose dans le conteneur..."
	$(DOCKER_EXEC) "npm run test:vw"

.PHONY: migration-g

migration-g: ## Creer une migration
	@echo "Creation d'une migration"
	$(DOCKER_EXEC) "npm run migration:generate -- src/migrations/migration"

.PHONY: migation-r

migration-r: ## Executer les migrations
	@echo "Execution des migrations"
	$(DOCKER_EXEC) "npm run migration:run"

.PHONY: migration-rev

migration-rev: ## Annuler la dernière migration
	@echo "Annulation de la dernière migration"
	$(DOCKER_EXEC) "npm run migration:reverse"

.PHONY: seed

seed: ## Executer les fixtures
	@echo "Execute les fixtures sur la bdd principal (local)"
	$(DOCKER_EXEC) "npm run seed"

.PHONY: sh-api

exec-api: ## Connexion container api
	@echo "Connexion au container de l'api"
	$(DOCKER_EXEC_CONNECT_API)

.PHONY: sh-db

exec-db: ## Connexion container db
	@echo "Connexion au container de la database"
	$(DOCKER_EXEC_CONNECT_DB)
