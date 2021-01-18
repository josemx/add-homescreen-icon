/* eslint-env node */

const gulp = require('gulp');

const minHTML = require('gulp-htmlmin');
const minCSS  = require('gulp-csso');
const minJS   = require('gulp-uglify-es').default;
const rename  = require('gulp-rename');
const replace = require('gulp-replace');
const fs      = require('fs');

const renameConfig = {
  suffix: '.min',
};

gulp.task('minifyHTML', () =>
  gulp.src('src/index.html')
    .pipe(rename(renameConfig))
    .pipe(minHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/min'))
);

gulp.task('processAndMinifyCSS', () =>
  gulp.src('src/main.css')
    .pipe(replace(/%/g, '%25'))             //Needs to have % replaced with %25 in CSS, Safari issue
    .pipe(rename(renameConfig))
    .pipe(minCSS())
    .pipe(gulp.dest('dist/min'))
);

gulp.task('replaceAndMinifyJS', gulp.series('minifyHTML', 'processAndMinifyCSS', () =>
  gulp.src('src/index.js')
    .pipe(replace(/\/\*gulp-replace-html\*\//, () =>
      fs.readFileSync('dist/min/index.min.html', 'utf8')
    ))
    .pipe(replace(/\/\*gulp-replace-css\*\//, () =>
      fs.readFileSync('dist/min/main.min.css', 'utf8')
    ))
    .pipe(rename(renameConfig))
    .pipe(minJS())
    .pipe(gulp.dest('dist/min'))
));


gulp.task('default', gulp.parallel('minifyHTML', 'processAndMinifyCSS', 'replaceAndMinifyJS'));
