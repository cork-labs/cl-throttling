module.exports = function (grunt) {
    'use strict';

    grunt.groups.registerTask('develop', [
        'build',
        'docs',
        'serve:build',
        'watch'
    ]);

};

