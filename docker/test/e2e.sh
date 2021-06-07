#!/bin/bash -e

env
timeout 60 bash -c 'while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' http://host.docker.internal:9000/graphql/)" == "000" ]]; do sleep 5; done'
if ! [[ -z ${CI+x} ]]; then
    yarn test:e2e:ci
else
    yarn test:e2e
fi