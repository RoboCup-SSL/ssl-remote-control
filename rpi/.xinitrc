#!/usr/bin/env sh
xset -dpms
# Disable screensaver
xset s off
xset s noblank

# Hide mouse pointer
unclutter -idle 0 &

# Disable composite output
xrandr --output Composite-1 --off
# Turn monitor to portrait mode
xrandr --output DSI-1 --rotate right
# Also turn touch input
xinput set-prop "raspberrypi-ts" --type=float "Coordinate Transformation Matrix" 0 1 0 -1 0 1 0 0 1

# Start browser in kiosk mode
#chromium-browser http://localhost:8084 --start-fullscreen --kiosk --incognito --noerrdialogs --no-first-run --disk-cache-dir=/dev/null

# Start nw.js
nwjs ~/nwjs
