.PHONY: all docker frontend test install proto

all: install docker

docker:
	docker build -f ./cmd/ssl-remote-control/Dockerfile -t ssl-remote-control:latest .

.frontend: $(shell find frontend/ -type f)
	cd frontend && \
	npm install && \
	npm run build && \
	touch ../.frontend

frontend: .frontend

test: frontend
	go test ./...

install: frontend
	go install -v ./...

proto:
	tools/generateProto.sh
