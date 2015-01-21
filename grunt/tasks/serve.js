module.exports = function (grunt) {
    'use strict';

    grunt.task.renameTask('connect', 'serve');

    grunt.task.registerTask('devserver', ['serve:build:keepalive']);

};

