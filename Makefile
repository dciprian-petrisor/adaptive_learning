# This makefile is used as an entrypoint for useful scripts (dev, test, etc)
PWD := ${CURDIR}
ARGS := 
DOCKER_BID_FILE := /tmp/docker.bid
DOCKER_BUILD_DEFAULT_ARGS := --iidfile ${DOCKER_BID_FILE}
DOCKER_BUILD_TARGET := base

.PHONY: build dev clean

clean:
	echo "Pruning images.." && docker rmi -f $$(docker images -f "dangling=true" -q) || true

build:
	docker build ${DOCKER_BUILD_DEFAULT_ARGS} --target ${DOCKER_BUILD_TARGET} $(ARGS) .

dev: DOCKER_BUILD_TARGET:=dev
dev: clean build
	docker run -ti --rm -v ${PWD}:/app -w /app -p 8080:8080 $$(cat ${DOCKER_BID_FILE}) /bin/bash

unit: DOCKER_BUILD_TARGET:=test
unit: clean build
	docker run -e CI --rm $$(cat ${DOCKER_BID_FILE}) ./docker/test/unit.sh

e2e:
	docker-compose -f "docker-compose.test.yml" up --force-recreate --remove-orphans --build -V --abort-on-container-exit --exit-code-from frontend