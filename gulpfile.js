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
var rimraf = require('gulp-rimraf');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//We only configure the server here and start it only when running the watch task
var server = express();
var expressHbs = require('express-handlebars');
server.engine('hbs', expressHbs({extname:'hbs', defaultLayout : 'main.hbs'}));
server.set('view engine', 'hbs');
server.use(favicon());
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

//Add livereload middleware before static-middleware
server.use(livereload({
    port: livereloadport
}));
server.use(express.static('./dist/public'));

//TODO : move this to a new file
server.get("/", function(req, res){
    var data = {name : "arvind", layout : false};
    res.render('home', data);
});

//using the main layout
server.get("/hello", function(req,res){
    var data = {name : "abc"};
    res.render('hello', data);
});

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
        .pipe(gulp.dest(publicDir))
        .pipe(refresh(lrserver));
});

//Task for processing js with browserify
gulp.task('browserify', function(){
    gulp.src('js/*.js')
        .pipe(browserify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(publicDir))
        .pipe(refresh(lrserver));
});

gulp.task('clean', function() {
    return gulp.src('./' + buildDir, { read: false })
        .pipe(rimraf());
});

//Convenience task for running a one-off build
gulp.task('build', ['clean'],  function() {
    gulp.run('templates','browserify', 'sass');
});

gulp.task('serve', function() {
    server.listen(serverport);
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
    gulp.run('build', 'serve','watch');
});