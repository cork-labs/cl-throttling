module.exports = {

    browserSync: {
        dev: {
            bsFiles: {
                src: ['build/src/**/*.css', 'build/src/**/*.js', 'build/vendor/**/*.css', 'build/vendor/**/*.js', 'build/**/*.html']
            },
            options: {
                proxy: 'localhost:<%=port%>',
                watchTask: true
            }
        }
    }
};
