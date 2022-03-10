#!/usr/bin/env bash

set -eu

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

function installRemoteControl() {
    sudo apt-get update
    sudo apt-get install wget
    wget https://github.com/RoboCup-SSL/ssl-remote-control/releases/download/v0.2.1/ssl-remote-control_v0.2.1_linux_arm -O ~/.local/bin/ssl-remote-control
}

function installService() {
    if [[ ! -f ~/.local/share/systemd/user/ssl-remote-control.service ]]; then
        mkdir -p ~/.local/share/systemd/user/
        cp "$SCRIPT_DIR/ssl-remote-control.service" ~/.local/share/systemd/user/ssl-remote-control.service
        systemctl --user enable ssl-remote-control.service
        systemctl --user start ssl-remote-control.service
    fi
}

function installFirefox() {
    sudo apt-get update

    # https://blog.r0b.io/post/minimal-rpi-kiosk/
    sudo apt-get install --no-install-recommends -y \
        xserver-xorg-video-all xserver-xorg-input-all xserver-xorg-core xinit x11-xserver-utils \
        unclutter \
        firefox-esr

    # Enable Auto-Login on console
    mkdir -p /etc/systemd/system/getty@tty1.service.d
    sudo cp "${SCRIPT_DIR}/autologin.conf" /etc/systemd/system/getty@tty1.service.d/autologin.conf

    # Configure to run browser when X starts
    cp "${SCRIPT_DIR}/.xinitrc" ~/.xinitrc

    # Configure to run X on tty1
    cp "${SCRIPT_DIR}/.bash_profile" ~/.bash_profile
}

installRemoteControl
installService
installFirefox
