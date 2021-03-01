var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

// Define paths for sass, js and where to export
// Sass
var sassPath = './src/scss/**/*.scss';
var sassExport = './dist/css/';

// Require JS
var jsPath = './src/main.js';
var jsExport = './dist/js/';

// Gulp tasks
gulp.task('sass', function () {
    gulp.src(sassPath)
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }))
    .pipe(plumber.stop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(sassExport))
    .pipe(browserSync.stream())
    .pipe(notify('Sass compiled'));
});

browserify().transform("babelify", {presets: ["es2015"]});

function compile(watch) {

  var bundler = watchify(browserify(jsPath, { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(gulp.dest(jsExport))
      .pipe(notify('Javascript compiled'));
  }

  if (watch) {
    bundler.on('update', function() {
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('buildAppJS', function() {

    var bundler = browserify(jsPath, { debug: true }).transform(babel);

    function rebundle() {
      bundler.bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest(jsExport));
    }

    rebundle();
});

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
    gulp.watch(sassPath, ['sass']);
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
    return watch();
});

gulp.task('default', ['sass', 'buildAppJS', 'watch']);
