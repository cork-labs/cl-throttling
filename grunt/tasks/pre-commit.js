module.exports = function (grunt) {
    'use strict';

    grunt.groups.registerTask('pre-commit', [
        'jsbeautifier:verify',
        'jshint',
        'group-build_css',
        'karma:build'
    ]);

};

