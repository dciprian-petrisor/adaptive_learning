#!/bin/bash -e

quasar build
if ! [[ -z ${CI+x} ]]; then
    yarn test:unit:ci
else
    yarn test:unit
fi