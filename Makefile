#find variable in .env.dev file
#ifneq (,$(wildcard .env.dev))
#   include .env.dev
#   export $(shell sed 's/=.*//' .env.dev)
#endif

# Executables (local)
DOCKER_COMP = docker compose
DOCKER_COMP_PROD = docker compose -f compose.yaml -f compose.prod.yaml

# Docker containers
PHP_CONT = $(DOCKER_COMP) exec php

# Executables
PHP      = $(PHP_CONT) php
COMPOSER = $(PHP_CONT) composer
SYMFONY  = $(PHP) bin/console
SYMFONY_TEST  = $(PHP) bin/phpunit

# Files env
ENV_FILE_DEV = .env.dev.local
ENV_FILE_PROD = .env.prod.local

# Misc
.DEFAULT_GOAL = help
.PHONY        : help build up up-prod start start-prod down logs sh composer vendor sf cc test

## —— 🎵 🐳 The Symfony Docker Makefile 🐳 🎵 ——————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Docker dev 🐳 ————————————————————————————————————————————————————————————————
build: ## Builds the Docker images
	@$(DOCKER_COMP) build --pull --no-cache

up: ## Start the docker hub mode dev in detached mode (no logs)
	@$(DOCKER_COMP) --env-file $(ENV_FILE_DEV) up --detach

start: build up ## Build and start the containers mode dev

## —— Docker generic 🐳 ————————————————————————————————————————————————————————————————
down: ## Stop the docker hub
	@$(DOCKER_COMP) down --remove-orphans

logs: ## Show live logs
	@$(DOCKER_COMP) logs --tail=0 --follow

sh: ## Connect to the FrankenPHP container
	@$(PHP_CONT) sh

bash: ## Connect to the FrankenPHP container via bash so up and down arrows go to previous commands
	@$(PHP_CONT) bash

test: ## Start tests with paratest, pass the parameter "c=" to add options, example: make test c="tests/Unit"
	@$(eval c ?=)
	@$(COMPOSER) test $(c)

test-cover: ## Start tests with paratest with coverage, pass the parameter "c=" to add options to command, example: make test-cover c="--stop-on-failure"
	@$(eval c ?=)
	@$(COMPOSER) test:cover $(c)

check: ## Start all process to check code quality, cs, phpstan, les tests, et normalise le fichier composer.json
	@$(COMPOSER) check

## —— Composer 🧙 ——————————————————————————————————————————————————————————————
composer: ## Run composer, pass the parameter "c=" to run a given command, example: make composer c='req symfony/orm-pack'
	@$(eval c ?=)
	@$(COMPOSER) $(c)

composer-arg: ## Run composer, pass the parameter "c=" to run a given command, example: make composer c='req symfony/orm-pack'
	@$(eval c ?=)
	@$(eval arg ?=)
	@$(COMPOSER) $(c) $(arg)

vendor: ## Install vendors according to the current composer.lock file
vendor: c=install --prefer-dist --no-dev --no-progress --no-scripts --no-interaction
vendor: composer

## —— Symfony 🎵 ———————————————————————————————————————————————————————————————
sf: ## List all Symfony commands or pass the parameter "c=" to run a given command, example: make sf c=about
	@$(eval c ?=)
	@$(SYMFONY) $(c)

sf-test: ## List all Symfony commands or pass the parameter "c=" to run a given command, example: make sf-test c=about
	@$(eval c ?=)
	@$(SYMFONY_TEST) $(c)

cc: c=c:c ## Clear the cache
cc: sf

## —— Docker prod 🐳 ————————————————————————————————————————————————————————————————
up-prod: ## Start the docker hub mode prod in detached mode (no logs)
	@$(DOCKER_COMP_PROD) --env-file $(ENV_FILE_PROD) up --detach

start-prod: build up-prod ## Build and start the containers mode prod

## —— Docker other 🐳 ————————————————————————————————————————————————————————————————
create-test-db: ## Create the test database (NOT USE by default, use sqlite for tests in cache)
	#@$(DOCKER_COMP) exec database sh -c 'psql -U "$(POSTGRES_USER)" -d postgres -c "CREATE DATABASE $(POSTGRES_DB)_test OWNER = $(POSTGRES_USER);"'

sh-database: ## Connect to the database container
	@$(DOCKER_COMP) exec database sh

m-bdd: ## drop and create database for tests
	@$(COMPOSER) migration-bdd-test
