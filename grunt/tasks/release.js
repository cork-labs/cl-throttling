module.exports = function (grunt) {
    'use strict';

    grunt.groups.registerTask('release', [
        'git-is-clean',
        'dist',
        'bump-only:patch',
        'changelog',
        'bump-commit'
    ]);

};

