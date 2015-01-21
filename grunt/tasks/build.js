module.exports = function (grunt) {
    'use strict';

    grunt.groups.registerTask('build', [
        'group-build_prepare',
        'group-build_start',
        'group-build_templates',
        'group-build_js',
        'group-build_test',
        'group-build_css',
        'group-build_indexes',
        'group-build_assets',
        'group-build_vendors',
        'group-build_finish',
    ]);
};

