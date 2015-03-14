module.exports = function (grunt, data) {
    'use strict';

    var _ = require('lodash');

    var config = {

        clean: {

            dist: {

                __groups: ['dist_prepare'],
                src: [
                    '<%= paths.dist %>'
                ]
            }
        },

        karma: {

            dist: {

                __groups: ['dist_test'],
                browsers: '<%= vars.dist_test.browsers %>',
                options: {
                    files: ['<%= files.karma_include %>'].concat('<%= vars.dist_test.include %>')
                }
            }
        }
    };

    // targets generated dynamically from configuration

    var key;
    var target;

    // jsglue: js distribution tasks

    for (key in data.vars.dist_js) {
        target = _.clone(data.vars.dist_js[key]);
        config.jsglue = config.jsglue || {};
        target.__groups = 'dist_js';
        config.jsglue['dist_js_' + key] = target;
    }

    // cssglue: css distribution tasks

    if (data.flags.css) {

        for (key in data.vars.dist_css) {
            target = _.clone(data.vars.dist_css[key]);
            config.cssglue = config.cssglue || {};
            target.__groups = 'dist_css';
            config.cssglue['dist_css_' + key] = target;
        }
    }

    // html2js: generate template modules

    if (data.flags.tpl) {

        for (key in data.vars.dist_templates || {}) {
            config.html2js = config.html2js || {};
            target = data.vars.dist_templates[key];
            config.html2js['dist_templates_' + key] = {
                __groups: ['dist_templates'],
                src: target.src,
                dest: target.dest,
                options: {
                    module: target.name
                }
            };
        }
    }

    // karma:dist - generate the list of files

    // appending more files
    //config.karma.dist.options.files.push(...);

    return config;
};
