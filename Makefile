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

.PHONY: up
up: ## Lancer tous les conteneurs (API + BDD)
	@echo "Lancement de tous les conteneurs (API + BDD)..."
	$(DOCKER_COMPOSE) up

.PHONY: up-api
up-api: ## Lancer uniquement le conteneur API
	@echo "Lancement du conteneur API..."
	$(DOCKER_COMPOSE) up api

.PHONY: up-db
up-db: ## Lancer uniquement le conteneur BDD
	@echo "Lancement du conteneur de la base de données..."
	$(DOCKER_COMPOSE) up db

.PHONY: down
down: ## Arrêter tous les conteneurs
	@echo "Arrêt de tous les conteneurs..."
	$(DOCKER_COMPOSE) down

.PHONY: down-api
down-api: ## Arrêter uniquement le conteneur API
	@echo "Arrêt du conteneur API..."
	$(DOCKER_COMPOSE) down api

.PHONY: down-db
down-db: ## Arrêter uniquement le conteneur BDD
	@echo "Arrêt du conteneur de la base de données..."
	$(DOCKER_COMPOSE) down db

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

.PHONY: seed

seed: ## Executer les fixtures
	@echo "Execute les fixtures sur la bdd principal (local)"
	$(DOCKER_EXEC) "npm run seed"

.PHONY: sh-api

sh-api: ## Connexion container api
	@echo "Connexion au container de l'api"
	$(DOCKER_EXEC_CONNECT_API)

.PHONY: sh-db

sh-db: ## Connexion container db
	@echo "Connexion au container de la database"
	$(DOCKER_EXEC_CONNECT_DB)
