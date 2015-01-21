module.exports = function (grunt) {
    'use strict';

    grunt.groups.registerTask('pre-release', [
        'git-is-clean',
        'dist',
        'bump-only:prerelease',
        'changelog',
        'bump-commit'
    ]);

};

