# This makefile is used as an entrypoint for useful scripts (dev, test, etc)
PWD := ${CURDIR}
ARGS := 
dev:
	docker build --target dev -t petrci1/adaptive_learning:dev $(ARGS) .
	docker run -ti --rm -v ${PWD}:/app -w /app -p 8080:8080 petrci1/adaptive_learning:dev /bin/bash
