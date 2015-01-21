module.exports = function (grunt, data) {
    'use strict';

    var config = {

        ngindex: {

            options: {

                stripDir: '<%= paths.build %>/',
                vars: {
                    pkg: data.pkg,
                    env: data.env,
                    vars: data.vars
                }
            }
        }
    };

    return config;

};

