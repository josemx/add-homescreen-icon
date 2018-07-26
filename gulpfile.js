/*eslint-disable*/

var gulp = require('gulp');

var minHTML = require('gulp-minify-html');
var minCSS  = require('gulp-minify-css');
var minJS   = require('gulp-uglify');
var rename  = require('gulp-rename');
var replace = require('gulp-replace');
var fs      = require('fs');

gulp.task('minifyHTML', function () {
  return gulp.src('components/*.html')
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(minHTML())
    .pipe(gulp.dest('components/min'));
});

gulp.task('processAndMinCSS', function () {
  return gulp.src('components/*.css')
    .pipe(replace(/%/g, '%25'))
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(minCSS())
    .pipe(gulp.dest('components/min'))
});

gulp.task('replaceAndMinBKMT', function () {
  return gulp.src('components/*.js')
  .pipe(replace(/\/\*gulp-replace-html\*\//, function (s) {
    return fs.readFileSync('components/min/ahi.min.html', 'utf8');
  }))
  .pipe(replace(/\/\*gulp-replace-css\*\//, function (s) {
    return fs.readFileSync('components/min/ahi.min.css', 'utf8');
  }))
  .pipe(rename(function (path) {
    path.basename += '.bkmt.min';
  }))
  .pipe(minJS())
  .pipe(gulp.dest('components/min'));
})

gulp.task('minifyJS', function () {
  return gulp.src('components/*.js')
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(minJS())
    .pipe(gulp.dest('components/min'));
});

gulp.task('htmlFriendly', function () {
  return gulp.src('components/min/*.bkmt.min.js')
  .pipe(replace(/</, '&lt;'))
  .pipe(replace(/>/, '&gt;'))
  .pipe(rename(function (path) {
    path.basename += '.ht.min';
  }))
  .pipe(gulp.dest('components/min'));
});


gulp.task('default', ['minifyHTML', 'processAndMinCSS', 'replaceAndMinBKMT']);
