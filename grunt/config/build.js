module.exports = function (grunt, data) {
    'use strict';

    var config = {

        clean: {

            build: {

                __groups: ['build_prepare'],
                src: [
                    '<%= paths.build %>'
                ]
            },

            docs: {

                __groups: ['docs_prepare'],
                src: [
                    '<%= paths.build %>/<%= paths.docs_dest %>'
                ]
            }
        },

        copy: {

            build_src_js: {

                __groups: ['build_js'],
                files: [{
                    cwd: '.',
                    src: [
                        '<%= files.src_js %>'
                    ],
                    dest: '<%= paths.build %>/'
                }]
            },

            build_less_srcs: {

                __groups: ['build_css'],
                files: [{
                    cwd: '.',
                    src: [
                        '<%= files.src_less %>'
                    ],
                    dest: '<%= paths.build %>/'
                }]
            },

            build_vendor_js: {

                __groups: ['build_vendors'],
                files: [{
                    cwd: '.',
                    src: [
                        '<%= files.vendor_js %>'
                    ],
                    dest: '<%= paths.build %>/'
                }]
            },

            build_vendor_css: {

                __groups: ['build_vendors'],
                files: [{
                    cwd: '.',
                    src: [
                        '<%= files.vendor_css %>'
                    ],
                    dest: '<%= paths.build %>/'
                }]
            }
        },

        karma: {

            build: {

                __groups: ['build_test'],
                // overriding this value for development unit testing.
                client: {
                    captureConsole: true
                },
                browsers: '<%= vars.build_test.browsers %>',
                options: {
                    files: ['<%= files.karma_include %>'].concat('<%= vars.build_test.include %>')
                }
            },
        },

        ngdocs: {

            build: {
                __groups: ['docs_build'],
            }
        },

        serve: {

            build: {

                options: {
                    base: '<%= paths.build %>/'
                }
            }
        },

        watch: {

            // -- sources

            src_js: {

                files: [
                    '<%= files.src_js %>'
                ],
                tasks: [
                    'jsbeautifier:beautify_src_js',
                    'jshint:src_js',
                    'group-build_js',
                    'group-build_test'
                ]
            },

            src_tpl: {

                files: [
                    '<%= files.src_tpl %>',
                ],
                tasks: [
                    'group-build_templates',
                    'group-build_test'
                ]
            },

            src_spec: {

                files: [
                    '<%= files.src_spec %>'
                ],
                tasks: [
                    'jsbeautifier:beautify_src_spec',
                    'jshint:src_spec',
                    'group-build_test'
                ]
            },

            src_less: {

                files: [
                    '<%= files.src_less %>'
                ],
                tasks: [
                    'group-build_css'
                ]
            },

            // -- vendor

            vendor_js: {

                files: [
                    '<%= files.vendor_js %>'
                ],
                tasks: [
                    'group-build_test',
                    'group-build_vendors'
                ]
            },

            vendor_test_js: {

                files: [
                    '<%= files.vendor_test_js %>'
                ],
                tasks: [
                    'group-build_test'
                ]
            },

            // -- docs

            build_docs: {

                files: [
                    '<%= files.docs %>'
                ],
                tasks: [
                    'group-docs_build'
                ]
            }
        }
    };

    // targets generated dynamically from configuration

    var key;
    var target;

    // html2js: generate template modules

    for (key in data.vars.build_templates || {}) {
        config.html2js = config.html2js || {};
        target = data.vars.build_templates[key];
        config.html2js['build_templates_' + key] = {
            __groups: ['build_templates'],
            src: target.src,
            dest: target.dest,
            options: {
                module: target.name
            }
        };
    }

    // less: compile less files

    for (key in data.vars.build_less || {}) {
        config.less = config.less || {};
        target = data.vars.build_less[key];
        config.less['build_css_' + key] = {
            __groups: ['build_css'],
            src: target.src,
            dest: target.dest,
            options: {
                sourceMap: true,
                dumpLineNumbers: 'all'
            }
        };
    }

    // sass: compile sass files

    for (key in data.vars.build_sass || {}) {
        config.sass = config.sass || {};
        target = data.vars.build_sass[key];
        config.sass['build_css_' + key] = {
            __groups: ['build_css'],
            src: target.src,
            dest: target.dest,
            options: {
                sourcemap: 'auto',
                dumpLineNumbers: 'all'
            }
        };
    }

    // ngindex: index files to generate

    for (key in data.vars.build_indexes || {}) {
        config.ngindex = config.ngindex || {};
        target = data.vars.build_indexes[key];
        config.ngindex['build_indexes_' + key] = {
            __groups: ['build_indexes'],
            src: target.src,
            dest: target.dest,
            options: {
                template: target.template
            }
        };
    }

    // karma:build - append the template modules

    // and appending all the template modules
    var module;
    for (key in data.vars.build_templates || {}) {
        module = data.vars.build_templates[key];
        config.karma.build.options.files.push(grunt.template.process(module.dest, {
            data: data
        }));
    }

    return config;
};

