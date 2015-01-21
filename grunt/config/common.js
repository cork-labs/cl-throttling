module.exports = function (grunt) {
    'use strict';

    var config = {

        clean: {

            coverage: {

                __groups: ['build_prepare'],
                src: [
                    '<%= paths.coverage %>'
                ]
            }
        },

        jsbeautifier: {

            beautify_src_js: {

                __groups: ['build_prepare'],
                src: [
                    '<%= files.src_js %>',
                ]
            },

            beautify_src_spec: {

                __groups: ['build_prepare'],
                src: [
                    '<%= files.src_spec %>',
                ]
            },

            beautify_grunt: {

                __groups: ['build_prepare'],
                src: [
                    '<%= files.grunt %>'
                ]
            },

            verify_all: {

                __groups: ['build_start', 'dist_start'],
                src: [
                    '<%= files.src_js %>',
                    '<%= files.src_spec %>',
                    '<%= files.grunt %>'
                ],
                options: {
                    mode: 'VERIFY_ONLY'
                }
            }
        },

        jshint: {

            pkg: {
                __groups: ['build_start', 'dist_start'],
                src: [
                    '<%= files.pkg %>'
                ],
            },

            src_js: {
                __groups: ['build_start', 'dist_start'],
                src: [
                    '<%= files.src_js %>'
                ],
            },

            src_spec: {

                __groups: ['build_start', 'dist_start'],
                src: [
                    '<%= files.src_spec %>'
                ]
            },

            grunt: {

                __groups: ['build_start', 'dist_start'],
                src: [
                    '<%= files.grunt %>'
                ]
            }
        },

        watch: {

            pkg: {

                files: [
                    '<%= files.pkg %>'
                ],
                tasks: [
                    'jshint:pkg'
                ],
                options: {
                    reload: true
                }
            },

            grunt: {

                files: [
                    '<%= files.grunt %>'
                ],
                tasks: [
                    'jsbeautifier:beautify_grunt',
                    'jshint:grunt'
                ],
                options: {
                    reload: true
                }
            }
        }
    };

    return config;
};

