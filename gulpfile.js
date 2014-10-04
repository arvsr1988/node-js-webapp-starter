var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat');
var rimraf = require('gulp-rimraf');
var buildDir = 'dist';
var publicDir = buildDir + '/public';

var handlebars = require('gulp-handlebars');
var defineModule = require('gulp-define-module');

gulp.task('templates', function(){
    gulp.src(['templates/*.hbs'])
        .pipe(handlebars({handlebars: require('handlebars')}))
        .pipe(defineModule('node'))
        .pipe(gulp.dest('dist/templates/'));
});

//Task for sass using libsass through gulp-sass
gulp.task('sass', function(){
    gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(publicDir));
});

//Task for processing js with browserify
gulp.task('browserify', function(){
    gulp.src('js/*.js')
        .pipe(browserify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(publicDir));
});

gulp.task('clean', function() {
    return gulp.src('./' + buildDir, { read: false })
        .pipe(rimraf());
});

//Convenience task for running a one-off build
gulp.task('build', ['clean'],  function() {
    gulp.run('copy','templates','browserify', 'sass');
});

var appDependencies = require('./package.json').dependencies;
gulp.task('copy', function(){
    gulp.src('app.js')
        .pipe(gulp.dest(buildDir));
    gulp.src('package.json')
        .pipe(gulp.dest(buildDir));
    for(var dependency in appDependencies){
        gulp.src('node_modules/'+dependency + '/**/*')
            .pipe(gulp.dest(buildDir+'/node_modules/' + dependency));
    }
    gulp.src('views/**/*')
        .pipe(gulp.dest(buildDir+'/views'));
});

gulp.task('watch', function() {
    gulp.watch('sass/*.scss', function() {
        gulp.run('sass');
    });

    gulp.watch('js/**/*.js', function() {
        gulp.run('browserify');
    });

    gulp.watch('views/*.html', function () {
        gulp.run('html');
    });
});

gulp.task('default', function () {
    gulp.run('build','watch');
});