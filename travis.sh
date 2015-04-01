#!/bin/bash

# install global dependencies
npm install -g grunt-cli bower

# ci tasks
bower update && grunt ci
