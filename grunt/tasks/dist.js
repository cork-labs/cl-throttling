module.exports = function (grunt) {
    'use strict';

    grunt.groups.registerTask('dist', [
        'group-dist_prepare',
        'group-dist_start',
        'group-dist_templates',
        'group-dist_js',
        'group-dist_test',
        'group-dist_css',
        'group-dist_indexes',
        'group-dist_assets',
        'group-dist_vendors',
        'group-dist_finish',
    ]);

};

