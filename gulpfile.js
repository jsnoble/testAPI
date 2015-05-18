var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

function compile(watch) {
    var bundler = browserify('./client/app/index.jsx', { debug: true }).transform(babel);

  if (watch) {
     bundler = watchify(browserify('./client/app/index.jsx', { debug: true }).transform(babel));
     bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./client/public/bundle.js'));
    }



    rebundle();
}

function watch() {
    return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['build']);
