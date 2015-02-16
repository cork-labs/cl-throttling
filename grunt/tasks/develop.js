module.exports = function (grunt) {
    'use strict';

    grunt.groups.registerTask('develop', [
        'build',
        'docs',
        'openport',
        'connect:build',
        'browserSync',
        'watch'
    ]);

};

