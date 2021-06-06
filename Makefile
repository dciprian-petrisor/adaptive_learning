# This makefile is used as an entrypoint for useful scripts (dev, test, etc)
PWD := ${CURDIR}
ARGS := 
DOCKER_BID_FILE := /tmp/docker.bid
DOCKER_BUILD_DEFAULT_ARGS := --iidfile ${DOCKER_BID_FILE}
DOCKER_BUILD_TARGET := base
ifdef CI 
UNIT_TEST_COMMAND := yarn test:unit:ci
else
UNIT_TEST_COMMAND := yarn test:unit
endif



.PHONY: build dev clean

clean:
	echo "Pruning images.." && docker system prune -f --volumes

build:
	docker build ${DOCKER_BUILD_DEFAULT_ARGS} --target ${DOCKER_BUILD_TARGET} $(ARGS) .

dev: DOCKER_BUILD_TARGET:=dev
dev: clean build
	docker run -ti --rm -v ${PWD}:/app -w /app -p 8080:8080 $$(cat ${DOCKER_BID_FILE}) /bin/bash

unit: DOCKER_BUILD_TARGET:=test
unit: clean build
	docker run -ti --rm $$(cat ${DOCKER_BID_FILE}) quasar build && ${UNIT_TEST_COMMAND}

e2e:
	docker compose -f "docker-compose.test.yml" up --force-recreate --remove-orphans --build -V --abort-on-container-exit --exit-code-from frontend