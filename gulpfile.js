'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var jade = require('gulp-jade');

var paths = {
    js: 'src/js/**/*.js',
    jade: 'src/**/*.jade',
    sass: 'src/style/**/*.sass',
    cssOutput: './dist/style/',
    htmlOutput: './dist/'
};

gulp.task('default', ['watch']);

gulp.task('watch', ['dev-server'], function () {

    // Errors that occur while parsing jade are currently not handled and will kill the watch. :(
    // The last attempt derailed browser sync.
    gulp.src(paths.jade)
        .pipe(watch(paths.jade, {verbose: true}))
        .pipe(jade())
        .pipe(gulp.dest(paths.htmlOutput))
        .pipe(browserSync.reload({stream: true}));

    gulp.src(paths.sass)
        .pipe(watch(paths.sass, {verbose: true}))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(paths.cssOutput))
        .pipe(browserSync.reload({stream: true}));

    gulp.src(paths.js)
        .pipe(watch(paths.js, {verbose: true}))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('dev-server', function (done) {
    browserSync({

        open: false,
        port: 9000,
        server: {
            baseDir: ['./dist/'],
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    }, done);
});