#!/bin/bash

# checks node, npm, bower & grunt-cli versions
./bin/systemcheck.sh
check=$?
if [[ $check > 0 ]]
then
    exit $check;
fi

# setup directories, git commit prehook
./bin/bootstrap.js
