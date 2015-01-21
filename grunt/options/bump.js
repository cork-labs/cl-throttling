module.exports = {

    bump: {

        options: {

            files: [
                'package.json',
                'bower.json'
            ],
            updateConfigs: ['pkg'],
            commit: true,
            commitMessage: 'chore(release): v%VERSION%',
            commitFiles: [
                'package.json',
                'bower.json',
                'CHANGELOG.md'
            ],
            createTag: true,
            tagName: 'v%VERSION%',
            tagMessage: 'Version %VERSION%',
            push: true,
            pushTo: 'origin'
        }
    }

};

