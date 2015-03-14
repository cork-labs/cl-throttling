module.exports = {

    html2js: {

        options: {

            useStrict: true,
            singleModule: true,
            indentString: '',
            htmlmin: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        }
    }

};
