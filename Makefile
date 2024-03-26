DOCKER_COMPOSE := docker-compose

PROJECT_NAME := blog-take-home

.DEFAULT_GOAL := help

help:
	@echo "Usage: make [TARGET] [PROJECT_NAME=project_name]"
	@echo ""
	@echo "Targets:"
	@echo "  up               Run docker-compose up for production environment"
	@echo "  up-dev           Run docker-compose up for development environment"
	@echo "  down             Stop and remove containers, networks, images, and volumes for production environment"
	@echo "  down-dev         Stop and remove containers, networks, images, and volumes for development environment"
	@echo ""

up:
	$(DOCKER_COMPOSE) -p $(PROJECT_NAME) -f docker-compose.yml up -d

up-dev:
	$(DOCKER_COMPOSE) -p $(PROJECT_NAME)-dev -f docker-compose-dev.yml up -d

down:
	$(DOCKER_COMPOSE) -p $(PROJECT_NAME) down

down-dev:
	$(DOCKER_COMPOSE) -p $(PROJECT_NAME)-dev down
