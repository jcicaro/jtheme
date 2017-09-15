var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

var livereload = require('gulp-livereload');

gulp.task('sass', function() {

  gulp.src('./css/src/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(livereload());

});

gulp.task('js', function() {

  gulp.src('js/src/*.js')
    // .pipe(jshint())
    // .pipe(jshint.reporter('fail'))
    // .pipe(concat('theme.js'))
    .pipe(gulp.dest('js'))
    .pipe(livereload());

});

gulp.task('img', function() {

  gulp.src('img/src/*.{png,jpg,gif}')
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true
    }))
    .pipe(gulp.dest('img'))
    .pipe(livereload());

});

gulp.task('watch', function() {

  livereload.listen();

  gulp.watch('css/src/*.scss', ['sass']);
  gulp.watch('js/src/*.js', ['js']);
  gulp.watch('img/src/*.{png,jpg,gif}', ['img']);

});

gulp.task('default', ['sass', 'js', 'img', 'watch']);