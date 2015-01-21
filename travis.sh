#!/bin/bash

# install global dependencies
npm install -g grunt-cli bower

# checks node, npm, bower & grunt-cli version
./bin/systemcheck.sh
check=$?
if [[ $check > 0 ]]
then
    exit $check;
fi

# ci tasks
bower update && grunt ci