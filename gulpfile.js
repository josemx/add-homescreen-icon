/* eslint-env node */

const {
  dest,
  parallel,
  series,
  src,
  watch,
} = require('gulp');

const minHTML = require('gulp-htmlmin');
const minCSS  = require('gulp-csso');
const minJS   = require('gulp-uglify-es').default;
const rename  = require('gulp-rename');
const replace = require('gulp-replace');
const fs      = require('fs');

const renameConfig = {
  suffix: '.min',
};

const minifyHTML = () => src('src/index.html')
  .pipe(rename(renameConfig))
  .pipe(minHTML({ collapseWhitespace: true }))
  .pipe(dest('dist/min'));

const processAndMinifyCSS = () => src('src/main.css')
  .pipe(replace(/%/g, '%25')) //Needs to have % replaced with %25 in CSS, Safari issue
  .pipe(rename(renameConfig))
  .pipe(minCSS())
  .pipe(dest('dist/min'));

const minifyDependencies = parallel(
  minifyHTML,
  processAndMinifyCSS
);

const replaceAndMinifyJS = () => src('src/index.js')
  .pipe(replace('/*gulp-replace-html*/', () =>
    fs.readFileSync('dist/min/index.min.html', 'utf8')
  ))
  .pipe(replace('/*gulp-replace-css*/', () =>
    fs.readFileSync('dist/min/main.min.css', 'utf8')
  ))
  .pipe(rename(renameConfig))
  .pipe(minJS())
  .pipe(dest('dist/min'));

const defaultTask = series(
  minifyDependencies,
  replaceAndMinifyJS
);

const distStandalone = () => src('src/standalone.html')
  .pipe(rename('index.html'))
  .pipe(dest('dist'));

const buildStandalone = series(
  defaultTask,
  distStandalone
);

const watchifiedDefault = (cb) => defaultTask(cb);

const watchStandalone = () => {
  watch('src/main.css', watchifiedDefault);
  watch('src/index.html', watchifiedDefault);
  watch('src/standalone.html', distStandalone);
  watch('src/index.js', watchifiedDefault);
};

module.exports = {
  buildStandalone,
  default: defaultTask,
  distStandalone,
  minifyDependencies,
  minifyHTML,
  processAndMinifyCSS,
  replaceAndMinifyJS,
  watchStandalone,
};
