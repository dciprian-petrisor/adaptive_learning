#!/bin/bash -e

quasar build
if ! [[ -z ${CI+x} ]]; then
    yarn test:e2e:ci
else
    yarn test:e2e
fi