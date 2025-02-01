FROM node:22-alpine@sha256:f2dc6eea95f787e25f173ba9904c9d0647ab2506178c7b5b7c5a3d02bc4af145 AS build_node
COPY frontend frontend
WORKDIR frontend
RUN npm install
RUN npm run build

FROM golang:1.23-alpine@sha256:47d337594bd9e667d35514b241569f95fb6d95727c24b19468813d596d5ae596 AS build_go
ARG cmd=ssl-remote-control
WORKDIR work
COPY . .
COPY --from=build_node frontend/dist frontend/dist
RUN go install ./cmd/${cmd}

# Start fresh from a smaller image
FROM alpine:3@sha256:56fa17d2a7e7f168a043a2712e63aed1f8543aeafdcee47c58dcffe38ed51099
ARG cmd=ssl-remote-control
COPY --from=build_go /go/bin/${cmd} /app
USER 1000
ENTRYPOINT ["/app"]
CMD []
