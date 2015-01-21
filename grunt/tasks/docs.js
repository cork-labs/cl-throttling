module.exports = function (grunt) {
    'use strict';

    grunt.groups.registerTask('docs', [
        'group-docs_prepare',
        'group-docs_build',
        'group-docs_finish',
    ]);

};

