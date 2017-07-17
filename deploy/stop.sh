
#!/usr/bin/env bash
cd /opt/YOUR_APP_HERE

if [ "$DEPLOYMENT_GROUP_NAME" == "stage" ]
then
  pm2 delete ./pm2.config.js
fi

if [ "$DEPLOYMENT_GROUP_NAME" == "production" ]
then
  pm2 delete ./pm2.config.js
fi
