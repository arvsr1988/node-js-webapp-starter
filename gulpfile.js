var gulp = require('gulp');
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");

var buildDir = 'dist';
var publicDir = buildDir + '/public';
global._publicDir = publicDir;
var gulp = require('gulp');
gulp.task("revision", function(){
    return gulp.src([publicDir + "/**/*.css", publicDir +  "/**/*.js"])
        .pipe(rev())
        .pipe(gulp.dest(publicDir))
        .pipe(rev.manifest())
        .pipe(gulp.dest(publicDir))
});

gulp.task("revreplace", gulp.series('revision', () => {
    var manifest = gulp.src(publicDir + "/rev-manifest.json");
    return gulp.src(buildDir + "/views/**/*")
        .pipe(revReplace({ manifest : manifest}))
        .pipe(gulp.dest(buildDir + "/views/"));
}));
