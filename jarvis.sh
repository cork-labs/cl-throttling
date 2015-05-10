#!/bin/bash

# build tasks
export HOME='/tmp'
export NODE_ENV='development'
npm install && bower --allow-root update && grunt build && grunt docs
