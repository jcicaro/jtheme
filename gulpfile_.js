var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

var livereload = require('gulp-livereload');
browserSync = require('browser-sync'); /* global browserSync */

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

gulp.task('browser-sync', function() {

  browserSync({
  
  // You can use wildcards in here.
  
  files: 'index.php, ./css/*.css',
  
  // We can pick port 8081 or 8082, if you are more of a 2's kind of guy, go for the 8082. Highly recommended.
  
  port: 8081
  
  });

});

gulp.task('watch', function() {

  livereload.listen();

  gulp.watch('css/src/*.scss', ['sass']);
  gulp.watch('js/src/*.js', ['js']);
  gulp.watch('img/src/*.{png,jpg,gif}', ['img']);

});

gulp.task('default', ['sass', 'js', 'img',  'watch', 'browser-sync']);