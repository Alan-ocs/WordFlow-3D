#!/bin/sh

echo "Running database seed..."
node seed.js

echo "Starting application..."
node app.js
