#!/usr/bin/env node

/**
 * setup directories, git hooks
 */
var fs = require('fs');
var sh = require('execSync');
var colors = require('colors');

var PARAM_HELP_EXP = /^--?h(?:elp)?$/gm;
var PARAM_LIB_EXP = /^--lib?$/gm;
var PARAM_SITE_EXP = /^--site?$/gm;
var NGINX_CONF_LISTEN_EXP = /listen\s+([^:]+):\d+[^;]*;/g;

// -- utility functions

/**
 * executes shell
 * @param {string} command
 */
function execCommand(command) {
    console.log(util.format('Executing "%s"', command).underline);
    exec = sh.exec(command);
    console.log(exec.stdout);
    if (exec.code) {
        console.error(('Failed executing "' + command + '".').red);
        process.exit(exec.code);
    } else {
        console.log('OK'.green);
    }
}

/**
 * creates a directory in the repo root
 * @param {string} dirname
 */
function createLocalDirectory(dirname) {
    console.log('');
    console.log(('Creating directory: ./' + dirname).underline);

    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname);
        console.log('OK'.green);
    } else {
        console.log(('./' + dirname + ' already present. moving on.').grey);
    }
}

/**
 * writes a files
 * @param {string} filename
 * @param {string} contents
 * @param {string} description (for log purposes only)
 */
function writeFile(filename, contents, description) {
    console.log('');
    console.log(('Creating ' + description + ' file').underline);
    console.log(('Writing ' + filename).grey);
    fs.writeFileSync(filename, contents);
    console.log('OK'.green);
}

/**
 * creates a symlink
 * @param {string} sourceFilePath
 * @param {string} linkPath
 * @param {string} description (for log purposes only)
 */
function writeSymlink(sourceFilePath, linkPath, description) {
    console.log('');
    console.log(('Setting up ' + description + ' symlink').underline);
    console.log((linkPath + ' >> ' + sourceFilePath).grey);

    var linkExists = false;
    try {
        if (fs.readlinkSync(linkPath) === sourceFilePath) {
            linkExists = true;
            console.log('Symlink already set up. moving on.'.grey);
        }
    }
    catch (err) {}

    if (!linkExists) {
        fs.symlinkSync(sourceFilePath, linkPath);
        console.log('OK'.green);
    }
}

/**
 * colects ngnix conf files
 * @returns {array) nginx conf files
 */
function findNginxHostFiles() {

    var files = fs.readdirSync('.');
    files = files.filter(function (file) {
      if (file.match(/nginx\.[\d\w\-]+\.conf/)) {
        return file;
      }
    });
    return files;
}

/**
 * colects hosts referenced in the ngnix conf file(s)
 * @returns {array) of host names
 */
function getNginxListeners() {

    var nginxHostFiles = findNginxHostFiles();
    if (!nginxHostFiles.length) {
        return [];
    }

    var listeners = [];
    nginxHostFiles.map(function (file) {

        var nginxConf = fs.readFileSync(file).toString();
        var match     = NGINX_CONF_LISTEN_EXP.exec(nginxConf);

        while (match != null) {
            if (listeners.indexOf(match[1]) === -1) {
                listeners.push(match[1]);
            }

            match = NGINX_CONF_LISTEN_EXP.exec(nginxConf);
        }
    });
    return listeners;
}

/**
 * prints reminder messages about further steps needed
 * - collects hosts referenced in nginx
 */
function printManualBootstrapSteps() {
    var hostsEntries = getNginxListeners();

    if (hostsEntries.length > 0) {
        console.log('');
        console.warn('Don\'t forget to run through the following manual steps:'.underline.yellow);
    }

    if (hostsEntries.length > 0) {
        console.log('');
        console.log('Add this line to /etc/hosts:'.underline);
        console.log('127.0.0.1\t' + hostsEntries.join(' '));
    }
}


// -- main

function run() {

    // create directories
    createLocalDirectory('var');
    createLocalDirectory('var/log');
    createLocalDirectory('tmp');

    // create symbolic links
    writeSymlink('../../bin/validate-commit-msg.js', '.git/hooks/commit-msg', 'pre-commit hook');

    // done!
    console.log('');
    console.log('Bootstrap complete without errors.'.green);

    // manual steps
    printManualBootstrapSteps();

    console.log('');
}

try {
    run();
}
catch (err) {
    console.error(('ERROR: ' + err.message).red);
    process.exit(err.errno ? err.errno : 8);
}
