module.exports = function (grunt) {
    'use strict';

    grunt.groups.registerTask('pre-release', [
        'git-is-clean',
        'bump-only:prerelease',
        'dist',
        'changelog',
        'bump-commit'
    ]);

};
