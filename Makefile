# This makefile is used as an entrypoint for useful scripts (dev, test, etc)
PWD := ${CURDIR}

dev:
ifndef NO_CACHE
	docker build --target dev -t petrci1/adaptive_learning:dev .
else
	docker build --target dev -t petrci1/adaptive_learning:dev --no-cache .
endif
	
	docker run -ti --rm -v ${PWD}:/app -w /app -p 8080:8080 petrci1/adaptive_learning:dev /bin/bash
