const gulp          = require ('gulp'),
      sass          = require ('gulp-sass'),
      babel         = require('gulp-babel'),
      uglify        = require('gulp-uglify'),
      sourcemaps    = require('gulp-sourcemaps'),
      autoprefixer  = require('gulp-autoprefixer'),
      browserSync   = require('browser-sync').create();

const reload = browserSync.reload;

sass.compiler = require('node-sass');

gulp.task('sass', () => {
  gulp.src('./src/scss/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist'));
});

gulp.task('js', () => {
  gulp.src('./src/main.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['sass'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('src/scss/*.scss', ['sass']).on('change', reload);
  gulp.watch('*.html').on('change', reload);
  gulp.watch('src/main.js', ['js']).on('change', reload);
});

gulp.task('default', ['sass', 'js', 'watch']);