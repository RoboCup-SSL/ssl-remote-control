#!/usr/bin/env bash

set -eu

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

function installService() {
    if [[ ! -f ~/.local/share/systemd/user/ssl-remote-control.service ]]; then
        cp "$SCRIPT_DIR/ssl-remote-control.service" ~/.local/share/systemd/user/ssl-remote-control.service
        systemctl --user enable ssl-remote-control.service
        systemctl --user start ssl-remote-control.service
    fi
}

function installLcdDisplay() {
    if [[ ! -d ~/LCD-show ]]; then
        # http://www.lcdwiki.com/MHS-3.5inch_RPi_Display
        git clone https://github.com/goodtft/LCD-show.git ~/LCD-show
        cd ~/LCD-show
        sudo ./MHS35-show # this will reboot the pi !
        # Note: To turn display, run: sudo ./rotate 180 (will also reboot pi)
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
    cp "${SCRIPT_DIR}/autologin.conf" /etc/systemd/system/getty@tty1.service.d/autologin.conf

    # Configure to run browser when X starts
    cp "${SCRIPT_DIR}/.xinitrc" ~/.xinitrc

    # Configure to run X on tty1
    cp "${SCRIPT_DIR}/.bash_profile" ~/.bash_profile
}

installService
installFirefox
# Uncomment to install LCD-Show (performs a reboot)
#installLcdDisplay
