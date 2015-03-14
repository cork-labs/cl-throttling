module.exports = function (grunt, data) {
    'use strict';

    var config = {

        clean: {

            build: {

                __groups: ['build_prepare'],
                src: [
                    '<%= paths.build %>'
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

            build_vendor_js: {

                __groups: ['build_vendors'],
                files: [{
                    cwd: '.',
                    src: [
                        '<%= files.vendor_js %>'
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

        connect: {

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
            }
        }
    };

    // targets generated dynamically from configuration

    var key;
    var target;

    // -- css: watch, build, copy sources

    if (data.flags.css) {

        if (data.files.src_less || data.files.src_sass) {

            // watch: less/sass sources (> build css)

            config.watch.src_less = {
                files: [],
                tasks: [
                    'group-build_css'
                ]
            };
        }

        if (data.files.src_less) {

            // watch: less sources (> build css)

            config.watch.src_less.push('<%= files.src_less %>');

            // copy: less/sass sources (used with sourcemaps)

            config.copy.build_css = {
                __groups: ['build_css'],
                files: [{
                    cwd: '.',
                    src: [
                        '<%= files.src_less %>'
                    ],
                    dest: '<%= paths.build %>/'
                }]
            };
        }

        if (data.files.src_sass) {

            // watch: sass sources (> build css)

            config.watch.src_less.push('<%= files.src_less %>');

            // copy: sass sources used with sourcemaps (build css)

            config.copy.build_css = {
                __groups: ['build_css'],
                files: [{
                    cwd: '.',
                    src: [
                        '<%= files.src_sass %>'
                    ],
                    dest: '<%= paths.build %>/'
                }]
            };
        }

        // copy: css vendors

        if (data.files.vendor_css) {

            config.copy.build_vendor_css = {
                __groups: ['build_vendors'],
                files: [{
                    cwd: '.',
                    src: [
                        '<%= files.vendor_css %>'
                    ],
                    dest: '<%= paths.build %>/'
                }]
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
    }

    // -- tpl: watch and build, add to tests

    if (data.flags.tpl && data.files.src_tpl) {

        // watch: tpls (build modules)

        config.watch.src_tpl = {

            files: [
                '<%= files.src_tpl %>',
            ],
            tasks: [
                'group-build_templates',
                'group-build_test'
            ]
        };

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

        // karma:build - append the template modules to sources loaded during tests
        // NOTE: needs grunt template pre-processed, because karma will not process it

        var module;
        for (key in data.vars.build_templates || {}) {
            module = data.vars.build_templates[key];
            config.karma.build.options.files.push(grunt.template.process(module.dest, {
                data: data
            }));
        }
    }

    // docs: clean, build and watch

    if (data.flags.docs) {

        config.clean.docs = {

            __groups: ['docs_prepare'],
            src: [
                '<%= paths.build %>/<%= paths.docs_dest %>'
            ]
        };

        config.ngdocs = {

            build: {
                __groups: ['docs_build'],
            }
        };

        config.watch.build_docs = {

            files: [
                '<%= files.docs %>'
            ],
            tasks: [
                'group-docs_build'
            ]
        };
    }

    return config;
};
