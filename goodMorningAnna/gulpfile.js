var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var paths = {
    app: ['./src/app.jsx'],
    js: ['./src/**/*.*'],
};

gulp.task('browserify', function() {
    // Browserify/bundle the JS.
    browserify({
        entries: paths.app,
        extensions: ['.jsx'],
        debug: true,
        fullPaths: true
    })
    .transform(reactify)
    .bundle()
.pipe(source('bundle.js'))
.pipe(gulp.dest('./build/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.js, ['browserify']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'browserify']);
