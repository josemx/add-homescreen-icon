/*eslint-disable*/

var gulp = require('gulp');

var minHTML = require('gulp-minify-html');
var minCSS  = require('gulp-minify-css');
var minJS   = require('gulp-uglify');
var rename  = require('gulp-rename');
var replace = require('gulp-replace');
var fs      = require('fs');

gulp.task('minifyHTML', function () {
  return gulp.src('src/*.html')
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(minHTML())
    .pipe(gulp.dest('dist'));
});

gulp.task('processAndMinCSS', function () {
  return gulp.src('src/*.css')
    .pipe(replace(/%/g, '%25'))
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(minCSS())
    .pipe(gulp.dest('dist'))
});

gulp.task('replaceAndMinBKMT', function () {
  return gulp.src('src/*.js')
  .pipe(replace(/\/\*gulp-replace-html\*\//, function (s) {
    return fs.readFileSync('dist/index.min.html', 'utf8');
  }))
  .pipe(replace(/\/\*gulp-replace-css\*\//, function (s) {
    return fs.readFileSync('dist/main.min.css', 'utf8');
  }))
  .pipe(rename(function (path) {
    path.basename += '.bkmt.min';
  }))
  .pipe(minJS())
  .pipe(gulp.dest('dist'));
})

gulp.task('minifyJS', function () {
  return gulp.src('src/*.js')
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(minJS())
    .pipe(gulp.dest('dist'));
});

gulp.task('htmlFriendly', function () {
  return gulp.src('dist/*.bkmt.min.js')
  .pipe(replace(/</, '&lt;'))
  .pipe(replace(/>/, '&gt;'))
  .pipe(rename(function (path) {
    path.basename += '.ht.min';
  }))
  .pipe(gulp.dest('dist'));
});


gulp.task('default', ['minifyHTML', 'processAndMinCSS', 'replaceAndMinBKMT']);
