FROM node:18.6.0-alpine3.16 AS build_node
WORKDIR /tmp/ssl-remote-control
COPY . .
RUN yarn install
RUN yarn build

FROM golang:1.18-alpine AS build_go
WORKDIR /go/src/github.com/RoboCup-SSL/ssl-remote-control
COPY . .
COPY --from=build_node /tmp/ssl-remote-control/internal/ui/dist internal/ui/dist
RUN go build -o release/ssl-remote-control_linux_amd64 ./cmd/ssl-remote-control

# Start fresh from a smaller image
FROM alpine:3.16
COPY --from=build_go /go/src/github.com/RoboCup-SSL/ssl-remote-control/release/ssl-remote-control_linux_amd64 /app/ssl-remote-control
EXPOSE 8083
USER 1000
ENTRYPOINT ["/app/ssl-remote-control"]
CMD []
