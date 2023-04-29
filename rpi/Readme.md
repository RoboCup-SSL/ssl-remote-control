# Run remote control on a Raspberry Pi

This folder contains scripts to configure a Pi to run the remote control.
You can install a [Raspberry Pi OS Lite](https://www.raspberrypi.com/software/operating-systems/)
and use the [bootstrap.sh](bootstrap.sh) script to set it up:

```shell
# Install Raspberry Pi OS Lite (32bit) (https://www.raspberrypi.com/software/operating-systems/)
# Setup username, password, hostname and ssh during image creation with rpi-imager or on first start with
sudo raspi-config
# Download and extract latest bootstrap archive
wget -qO- https://github.com/RoboCup-SSL/ssl-remote-control/releases/latest/download/bootstrap.tar.gz | tar xvz
# Run bootstrap script
./ssl-remote-control/bootstrap.sh
# Optionally change the team color to BLUE in ~/.local/share/systemd/user/ssl-remote-control.service
```

Note: Chromium has a minimum window size of 500px, but the currently used Raspberry PI display is only 480x800px.
In portrait mode, 20px on the right are cut-off.

As an alternativ, [nw.js](https://docs.nwjs.io/en/latest/) is used. They do not provide arm builds, though, so the nw.js binary is taken from https://github.com/LeonardLaszlo/nw.js-armv7-binaries, specifically from an APT repository: https://github.com/LeonardLaszlo/nw.js-armv7-binaries/issues/47.
