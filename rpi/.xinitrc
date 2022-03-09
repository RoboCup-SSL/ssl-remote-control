#!/usr/bin/env sh
xset -dpms
# Disable screensaver
xset s off
xset s noblank

# Hide mouse pointer
unclutter -idle 0 &
firefox --kiosk http://localhost:8083
