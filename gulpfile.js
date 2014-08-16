var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    //not sure if this is needed - hence commenting out.
    //embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload')
    livereloadport = 35729,
    serverport = 5000;

//We only configure the server here and start it only when running the watch task
var server = express();
var expressHbs = require('express-handlebars');
server.engine('hbs', expressHbs({extname:'hbs', defaultLayout : 'main.hbs'}));
server.set('view engine', 'hbs');

//Add livereload middleware before static-middleware
server.use(livereload({
    port: livereloadport
}));
server.use(express.static('./build'));

//TODO : move this to a new file
server.get("/", function(req, res){
    var data = {name : "arvind", layout : false};
    res.render('index', data);
});

server.get("/hello", function(req,res){
    var data = {name : "abc"};
    res.render('hello', data);
});

//TODO : complete the client side handlebar rendering
var handlebars = require('gulp-handlebars');
var defineModule = require('gulp-define-module');

//gulp.task('templates', function(){
//    gulp.src(['templates/*.hbs'])
//        .pipe(handlebars())
//        .pipe(defineModule('node'))
//        .pipe(gulp.dest('build/templates/'));
//});

//Task for sass using libsass through gulp-sass
gulp.task('sass', function(){
    gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build'))
        .pipe(refresh(lrserver));
});

//Task for processing js with browserify
gulp.task('browserify', function(){
    gulp.src('js/*.js')
        .pipe(browserify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('build'))
        .pipe(refresh(lrserver));

});

//Task for moving html-files to the build-dir
//added as a convenience to make sure this gulpfile works without much modification
//gulp.task('html', function(){
//    gulp.src('views/*.html')
//        .pipe(gulp.dest('build'))
//        .pipe(refresh(lrserver));
//});

//Convenience task for running a one-off build
gulp.task('build', function() {
    gulp.run('browserify', 'sass'/*,'templates'*/);
});

gulp.task('serve', function() {
    //Set up your static fileserver, which serves files in the build dir
    server.listen(serverport);

    //Set up your livereload server
    lrserver.listen(livereloadport);
});

gulp.task('watch', function() {
    gulp.watch('sass/*.scss', function() {
        gulp.run('sass');
    });

    gulp.watch('js/*.js', function() {
        gulp.run('browserify');
    });

    gulp.watch('views/*.html', function () {
        gulp.run('html');
    });
});

gulp.task('default', function () {
    gulp.run('build', 'serve', 'watch');
});