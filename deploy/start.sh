#!/usr/bin/env bash
cd /opt/YOUR_APP_NAME

if [ "$DEPLOYMENT_GROUP_NAME" == "stage" ]
then
  export ENV=stage && pm2 start ./pm2.config.js
fi

if [ "$DEPLOYMENT_GROUP_NAME" == "production" ]
then
  export env=production && pm2 start ./pm2.config.js
fi

pm2 save
pm2 dump
