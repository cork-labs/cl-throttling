module.exports = function (grunt) {
    'use strict';

    grunt.task.registerTask('server', ['openport', 'connect:build:keepalive']);

};
