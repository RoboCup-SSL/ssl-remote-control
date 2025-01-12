CMDS = ssl-remote-control
DOCKER_TARGETS = $(addprefix docker-, $(CMDS))
.PHONY: all docker frontend install test run proto $(DOCKER_TARGETS)

all: install docker

docker: $(DOCKER_TARGETS)

$(DOCKER_TARGETS): docker-%:
	docker build --build-arg cmd=$* -t $*:latest .

.frontend: $(shell find frontend/ -type f -not -path "frontend/node_modules/*")
	cd frontend && \
	npm install && \
	npm run build && \
	touch ../.frontend

frontend: .frontend

install: frontend
	go install -v ./...

test: frontend
	go test ./...

run: frontend
	go run ./cmd/$(word 1,$(CMDS))

dev:
	cd frontend && npm run dev

proto:
	tools/generateProto.sh

update-backend:
	go get -v -u all

update-frontend:
	cd frontend && \
	npm update --save

update: update-backend update-frontend proto
