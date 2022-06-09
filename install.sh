#!/bin/sh

set -e

yarn install
yarn build

go install -v ./cmd/ssl-remote-control
