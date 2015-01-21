module.exports = function (grunt) {
    'use strict';

    grunt.groups.registerTask('ci', [
        'build',
        'docs',
        'dist',
    ]);
};

