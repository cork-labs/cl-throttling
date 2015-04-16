#!/bin/bash

# install global dependencies
npm install -g grunt-cli bower

# build tasks
npm install && bower update && grunt build && grunt docs
