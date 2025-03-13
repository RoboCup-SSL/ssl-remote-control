#!/usr/bin/env bash
wget -qO- https://github.com/RoboCup-SSL/ssl-remote-control/releases/latest/download/bootstrap.tar.gz | tar xvz
cd ssl-remote-control || exit 1
./bootstrap.sh
