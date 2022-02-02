#!/bin/sh

set -e

yarn install
yarn build

go get -v -d ./...
cd cmd/ssl-remote-control
packr install
