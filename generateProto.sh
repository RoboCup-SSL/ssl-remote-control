#!/bin/bash

# Fail on errors
set -e
# Print commands
set -x

# Update to latest protobuf compiler
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest

# Generate all protobuf code
protoc -I"./proto" -I"$GOPATH/src" --go_out="$GOPATH/src" proto/*.proto

# generate javascript code
mkdir -p src/proto
protoc -I"./proto" \
    --plugin=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_out=./src/proto \
    --ts_proto_opt=esModuleInterop=true \
    --ts_proto_opt=useOptionals=messages \
    --ts_proto_opt=oneof=unions \
    ./proto/*.proto
