module.exports = function (grunt, data) {
    'use strict';

    var config = {

        ngdocs: {

            options: {

                dest: '<%= paths.build %>/<%= paths.docs_dest %>',
                scripts: '<%= vars.docs.scripts %>',
                styles: '<%= vars.docs.styles %>',
                html5Mode: false,
                startPage: '/<%= vars.docs.startPage %>',
                titleLink: '#/<%= vars.docs.startPage %>',
                image: '<%= vars.docs.image %>',
                imageLink: '<%= vars.docs.imageLink %>',
                versionsEndpoint: '<%= vars.docs.versionsEndpoint %>',
                examplesBaseUrl: '<%= vars.docs.examplesBaseUrl %>',
                examplesScripts: '<%= vars.docs.examplesScripts %>',
                examplesStyles: '<%= vars.docs.examplesStyles %>',
                analytics: '<%= vars.docs.analytics %>',
                sections: '<%= vars.docs.sections %>',
            }
        }
    };

    return config;
};

