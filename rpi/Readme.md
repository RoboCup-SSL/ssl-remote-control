# Run remote control on a Raspberry Pi

This folder contains scripts to configure a Pi to run the remote control.
You can install a Raspberry Pi OS Lite and use the [bootstrap.sh](bootstrap.sh) script to set it up:

```shell
# 1. Install Raspberry Pi OS Lite (32 or 64bit)
# 2. Setup username, password, hostname and ssh with
sudo raspi-config
# 3. Install GIT
sudo apt install git
# 4. Clone this repository
git clone https://github.com/RoboCup-SSL/ssl-remote-control.git
cd ssl-remote-control
# 5. Run bootstrap script
./rpi/bootstrap.sh
```
