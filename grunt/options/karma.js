module.exports = function (grunt, data) {
    'use strict';

    // these arethe base options, they do not include the files loaded in the different karma targets
    // files are generated in build.js and dist.js (from base files list + append with the html2js destinations)

    // we need to export a function here in order to:
    // - process the template for options.preprocessors

    var config = {

        karma: {

            options: {

                // where to look for files, starting with the location of this file
                basePath: './',

                // unit test frameworks to use
                frameworks: [
                    'jasmine'
                ],

                // plugins to load
                plugins: [
                    'karma-jasmine',
                    'karma-coverage',
                    'karma-firefox-launcher',
                    'karma-chrome-launcher',
                    'karma-phantomjs-launcher'
                    //'karma-junit-reporter'
                ],

                // how to report, by default
                reporters: [
                    'dots',
                    'coverage'
                ],

                coverageReporter: {
                    dir: '<%= paths.build %>/coverage'
                },

                // URL path for the browser to use
                urlRoot: '/',

                // disable file watching by default
                autoWatch: false,

                // disable console log by default
                // the default seems to be FALSE and not TRUE as stated in http://karma-runner.github.io/0.12/config/configuration-file.html
                client: {
                    captureConsole: false
                },

                singleRun: true,

                logLevel: grunt.option('debug') || grunt.option('verbose') ? 'debug' : 'info',
            }
        }
    };

    // process the grunt config template for coverage reports
    var coveredFilesPattern = grunt.template.process('<%= files.karma_coverage %>', {
        data: data
    });
    config.karma.options.preprocessors = {};
    config.karma.options.preprocessors[coveredFilesPattern] = ['coverage'];

    return config;
};

