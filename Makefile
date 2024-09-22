# Variables
ENV_FILE=.env.dev.local
DOCKER_COMPOSE=docker compose --env-file $(ENV_FILE)

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
	$(DOCKER_COMPOSE) exec app npm run test

test-v: ## Exécuter les tests en mode verbose (jest --verbose)
	@echo "Exécution des tests en mode verbose dans le conteneur..."
	$(DOCKER_COMPOSE) exec app npm run test:v

test-w: ## Exécuter les tests en mode watch (jest --watch)
	@echo "Exécution des tests en mode watch dans le conteneur..."
	$(DOCKER_COMPOSE) exec app npm run test:w

test-vw: ## Exécuter les tests en mode watch + verbose (jest --watch --verbose)
	@echo "Exécution des tests en mode watch + verbose dans le conteneur..."
	$(DOCKER_COMPOSE) exec app npm run test:vw