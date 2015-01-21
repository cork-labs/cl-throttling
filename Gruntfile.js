module.exports = function (grunt) {
    'use strict';

    var util = require('util');

    /**
     * reads the dependencies/devDependencies/peerDependencies in your package.json and loads all grunt tasks
     * https://github.com/sindresorhus/load-grunt-tasks
     */
    require('load-grunt-tasks')(grunt);

    /**
     * load task configurations from separate files, providing current configuration to eventual fn()s in config files
     * https://github.com/andrezero/load-grunt-config-data
     */
    var loader = require('load-grunt-config-data')(grunt);

    /**
     * generate group tasks from tagged tasks/targets
     * ex: tasks/targets annotated with __groups:['tag1'] can be invoked by 'grunt group-tag1'
     * https://github.com/andrezero/group-grunt-tasks
     */
    var groups = require('group-grunt-tasks')(grunt);

    /**
     * generate grunt config
     */
    grunt.verbose.subhead('Loading pkg configuration.');

    // start with `package.json`, some tasks require "pkg.name", "pkg.version" or other package data
    var config = {
        pkg: loader.load('./package.json'),
        env: process.env
    };

    // load main configuration file (paths, files, vars)
    grunt.verbose.subhead('Loading main config file...');
    loader.merge('./grunt/build.conf.js', config, config);
    grunt.verbose.ok();

    // freeze configuration so we can pass the same `data` to all eventual fn()s in loaded files
    var data = grunt.util._.clone(config);

    // load task options
    loader.merge('./grunt/options/**/*.js', config, data);

    // load tasks/targets
    loader.merge('./grunt/config/**/*.js', config, data);

    // register group tasks from tagged targets
    groups.collect(config);

    /**
     * initialize the grunt configuration object which can be accessed via grunt.config()
     * NOTE: any <% %> template strings are processed whenever config data is retrieved via grunt.config()
     * http://gruntjs.com/api/grunt.config#grunt.config.init
     */
    grunt.verbose.subhead('Initializing config.');
    grunt.initConfig(config);

    /**
     * the directory 'grunt/tasks' contains custom tasks or aliases
     * http://gruntjs.com/api/grunt.task#grunt.task.loadtasks
     */
    grunt.loadTasks('./grunt/tasks');

    // all set
    grunt.verbose.subhead('Run.');
};

