module.exports = function (grunt) {
    'use strict';

    grunt.groups.registerTask('release', [
        'git-is-clean',
        'bump-only:patch',
        'dist',
        'changelog',
        'bump-commit'
    ]);

};
