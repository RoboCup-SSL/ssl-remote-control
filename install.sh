#!/bin/sh

set -e

yarn install
yarn build

go get -v -d ./...
cd cmd/ssl-remote-control
go get -v github.com/gobuffalo/packr/packr
packr install
