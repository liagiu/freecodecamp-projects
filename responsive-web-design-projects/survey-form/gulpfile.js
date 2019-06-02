const gulp = require('gulp'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

sass.compiler = require('node-sass');

function css() {
  return gulp
    .src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function js() {
  return gulp
    .src('./src/main.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
}

function watchFiles() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('src/scss/*.scss', css);
  gulp.watch('src/main.js', js);
  gulp
    .watch(['*.html', 'dist/main.css', 'dist/main.js'])
    .on('change', browserSync.reload);
}

exports.watchFiles = watchFiles;
exports.css = css;
exports.js = js;
exports.default = watchFiles;
