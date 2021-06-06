# This makefile is used as an entrypoint for useful scripts (dev, test, etc)
PWD := ${CURDIR}
ARGS := 
DOCKER_IID_FILE := /tmp/docker.iid
DOCKER_CID_FILE := /tmp/docker.cid
DOCKER_BUILD_DEFAULT_ARGS := --iidfile ${DOCKER_IID_FILE}
DOCKER_CI_RUN_DEFAULT_ARGS := --cidfile ${DOCKER_CID_FILE}
DOCKER_BUILD_TARGET := base

.PHONY: build dev clean

clean:
	echo "Remove BID and CID files" && rm -f ${DOCKER_IID_FILE} ${DOCKER_CID_FILE}
	echo "Pruning images.." && docker rmi -f $$(docker images -f "dangling=true" -q) || true

build:
	docker build ${DOCKER_BUILD_DEFAULT_ARGS} --target ${DOCKER_BUILD_TARGET} $(ARGS) .

dev: DOCKER_BUILD_TARGET:=dev
dev: clean build
	docker run -ti --rm -v ${PWD}:/app -w /app -p 8080:8080 $$(cat ${DOCKER_IID_FILE}) bash

unit: DOCKER_BUILD_TARGET:=test
unit: clean build
	docker run -e CI --rm $$(cat ${DOCKER_IID_FILE}) ./docker/test/unit.sh
	
ci: DOCKER_BUILD_TARGET:=test
ci: clean build
	docker run -e CI -t -d --rm ${DOCKER_CI_RUN_DEFAULT_ARGS} $$(cat ${DOCKER_IID_FILE})
	docker exec $$(cat ${DOCKER_CID_FILE}) quasar build

unit-ci:
	docker exec $$(cat ${DOCKER_CID_FILE}) ./docker/test/unit.sh

e2e-ci:
	docker-compose -f "docker-compose.test.yml" up -d --force-recreate --remove-orphans --build -V
	timeout 60 bash -c 'while [[ "$$(curl -s -o /dev/null -w ''%{http_code}'' localhost/graphql/)" != "000" ]]; do sleep 5; done'
	docker exec $$(cat ${DOCKER_CID_FILE}) ./docker/test/e2e.sh