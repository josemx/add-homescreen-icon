/*eslint-disable*/

var gulp = require('gulp');

var minHTML = require('gulp-minify-html');
var minCSS  = require('gulp-minify-css');
var minJS   = require('gulp-uglify');
var rename  = require('gulp-rename');
var replace = require('gulp-replace');
var fs      = require('fs');

const renameConfig = {
  suffix: '.min',
};

gulp.task('minifyHTML', function () {
  return gulp.src('src/index.html')
    .pipe(rename(renameConfig))
    .pipe(minHTML())
    .pipe(gulp.dest('dist/min'));
});

gulp.task('processAndMinifyCSS', function () {
  return gulp.src('src/main.css')
    .pipe(replace(/%/g, '%25'))
    .pipe(rename(renameConfig))
    .pipe(minCSS())
    .pipe(gulp.dest('dist/min'))
});

gulp.task('replaceAndMinifyBookmarklet', ['minifyHTML', 'processAndMinifyCSS'], function () {
  return gulp.src('src/index.js')
    .pipe(replace(/\/\*gulp-replace-html\*\//, function (s) {
      return fs.readFileSync('dist/min/index.min.html', 'utf8');
    }))
    .pipe(replace(/\/\*gulp-replace-css\*\//, function (s) {
      return fs.readFileSync('dist/min/main.min.css', 'utf8');
    }))
    .pipe(rename(renameConfig))
    .pipe(minJS())
    .pipe(gulp.dest('dist/min'));
})


gulp.task('default', ['minifyHTML', 'processAndMinifyCSS', 'replaceAndMinifyBookmarklet']);
