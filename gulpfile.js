var gulp = require('gulp');
var watch = require('gulp-watch');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var twig = require('gulp-twig');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();

//----------------------------------------------------------------
function taskTemplate() {
    return gulp.src('./src/tpl/*.twig', { since: gulp.lastRun('templates') })
        .pipe(twig({
            base: './src/'
        }))
        .pipe(gulp.dest('./dist'));
}
gulp.task('templates', taskTemplate);

// Static Server
gulp.task('serve', function() {

    browserSync.init({
        server: "./dist",
        files: ["./dist"],
        reloadDebounce: 300,
        reloadDelay: 300,
        reloadThrottle: 300
    });

    //gulp.watch("src/tpl/**/*.twig", ['templates']).on('change', browserSync.reload);
    //gulp.watch("dist/js/**/*.js").on('change', browserSync.reload);
});

//----------------------------------------------------------------
gulp.task('clean', function () {
    return gulp.src('./dist', {read: false, allowEmpty: true})
        .pipe(clean());
});

//----------------------------------------------------------------
gulp.task('copy', function () {
    var sourceFiles = [ './src/images/**/*', './src/data/**/*' ];

    return gulp.src(sourceFiles, {base: './src'})
        .pipe(gulp.dest('dist/'))
});

//----------------------------------------------------------------
gulp.task('webpack-task', function() {
    return gulp.src('src/scripts/index.js')
        .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
        .pipe(gulp.dest('dist/'));
});

//----------------------------------------------------------------
gulp.task('watch', function () {
    var sourceFiles = [ './src/images/**/*.*', './src/data/*.*' ];

    watch(sourceFiles, function () {
        gulp.src(sourceFiles, {base: './src'})
            .pipe(gulp.dest('./dist/'))
    });

    watch("src/tpl/**/*.twig", taskTemplate);
});

//----------------------------------------------------------------
gulp.task('default', gulp.series('clean', 'copy', 'templates', gulp.parallel('watch','webpack-task', 'serve')));
gulp.task('build', gulp.series('clean','copy', 'webpack-task', 'templates'));
