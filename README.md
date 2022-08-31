[![CircleCI](https://circleci.com/gh/RoboCup-SSL/ssl-remote-control/tree/master.svg?style=svg)](https://circleci.com/gh/RoboCup-SSL/ssl-remote-control/tree/master)
[![Release](https://img.shields.io/github/release/RoboCup-SSL/ssl-remote-control.svg?style=flat-square)](https://github.com/RoboCup-SSL/ssl-remote-control/releases/latest)

# ssl-remote-control

A remote control web app that can be used by each SSL team to send certain commands to the ssl-game-controller.

![Screenshot of Interface](./doc/screenshot.png)

## Hardware
### Install on a Raspberry Pi
See [rpi/Readme.md](rpi/Readme.md)

### Additional hardware and housing
The remote-control is designed to run on a Raspberry Pi 3 or 4 with the following additional components:

 * Display: https://www.waveshare.com/product/4.3inch-dsi-lcd-with-case.htm
 * PoE HAT: https://www.rasppishop.de/RPi-PoE-HAT?shop=GH
 * Custom 3d-printed housing, see [housing](./housing)

## Usage
If you just want to use this app, simply download the latest [release binary](https://github.com/RoboCup-SSL/ssl-remote-control/releases/latest).
The binary is self-contained. No dependencies are required.

You can also use pre-build docker images:
```shell script
docker pull robocupssl/ssl-remote-control
docker run -p 8083:8083 robocupssl/ssl-remote-control
```

By default, the UI is available at http://localhost:8083

## Development

### Requirements
You need to install following dependencies first: 
 * Go >= 1.17
 * Node >= 10
 * Yarn

### Prepare
Download and install to [GOPATH](https://github.com/golang/go/wiki/GOPATH):
```bash
go get -u github.com/RoboCup-SSL/ssl-remote-control/...
```
Switch to project root directory
```bash
cd $GOPATH/src/github.com/RoboCup-SSL/ssl-remote-control/
```
Download dependencies for frontend
```bash
yarn install
```

### Run
Run the backend:
```bash
go run cmd/ssl-remote-control/main.go
```

Run the UI:
```bash
# compile and hot-reload
yarn dev
```
Or use the provided IntelliJ run configurations.

### Build self-contained release binary
First, build the UI resources
```bash
# compile and minify UI
yarn build
```
Then build the backend with `packr`
```bash
# get packr
go get github.com/gobuffalo/packr/packr
# install the binary
cd cmd/ssl-remote-control
packr install
```
