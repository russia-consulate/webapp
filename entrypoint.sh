#!/usr/bin/env sh

echo "Current environment:"
printenv

echo "Generating env"
node /scripts/generate-env.mjs

echo "Updated index.html:"
cat /final/index.html

nginx -g "daemon off;"