#!/bin/bash

cd /home/ubuntu/my-node-app

pkill node || true

nohup node app.js > app.log 2>&1 &
