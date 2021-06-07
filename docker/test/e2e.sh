#!/bin/bash -e

if ! [[ -z ${CI+x} ]]; then
    yarn test:e2e:ci
else
    yarn test:e2e
fi