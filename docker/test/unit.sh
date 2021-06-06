#!/bin/bash -e

if ! [[ -z ${CI+x} ]]; then
    yarn test:unit:ci
else
    yarn test:unit
fi