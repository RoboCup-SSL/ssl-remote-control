FROM node:15.7.0-alpine3.11 AS build_node
WORKDIR /tmp/ssl-remote-control
COPY . .
RUN yarn install
RUN yarn build

FROM golang:1.18-alpine AS build_go
WORKDIR /go/src/github.com/RoboCup-SSL/ssl-remote-control
COPY . .
COPY --from=build_node /tmp/ssl-remote-control/dist dist
RUN go get -v -t -d ./...
RUN go get -v github.com/gobuffalo/packr/packr
WORKDIR cmd/ssl-remote-control
RUN GOOS=linux GOARCH=amd64 packr build -o ../../release/ssl-remote-control_linux_amd64

# Start fresh from a smaller image
FROM alpine:3.9
COPY --from=build_go /go/src/github.com/RoboCup-SSL/ssl-remote-control/release/ssl-remote-control_linux_amd64 /app/ssl-remote-control
EXPOSE 8082
USER 1000
ENTRYPOINT ["/app/ssl-remote-control"]
CMD []
