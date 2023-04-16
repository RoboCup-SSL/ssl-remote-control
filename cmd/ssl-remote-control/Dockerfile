FROM node:18-alpine AS build_node
COPY frontend frontend
WORKDIR frontend
RUN npm install
RUN npm run build

FROM golang:1.20-alpine AS build_go
WORKDIR backend
COPY . .
COPY --from=build_node frontend/dist frontend/dist
RUN go install -v ./cmd/ssl-remote-control

# Start fresh from a smaller image
FROM alpine:3
COPY --from=build_go /go/bin/ssl-remote-control /app/ssl-remote-control
USER 1000
ENTRYPOINT ["/app/ssl-remote-control"]
CMD []
