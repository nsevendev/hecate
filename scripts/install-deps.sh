#!/bin/sh
set -e

# Check if node_modules is empty
if [ -z "$(ls -A 'node_modules' 2>/dev/null)" ]; then
    echo "node_modules est vide, lancement npm install..."
    npm ci
else
    echo "node_modules est déjà installé..."
fi

exec "$@"
