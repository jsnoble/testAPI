var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

function compile(watch) {
    var bundler = watchify(browserify('./client/app/index.jsx', { debug: true }).transform(babel));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./client/public/bundle.js'));
    }

    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['build']);

/*
var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

gulp.task('dev', function() {
    gulp.src('./client/app/index.jsx')
        .pipe(browserify({
            insertGlobals : true,
            debug : true
        }))
        .pipe(babel())
        .pipe(gulp.dest('./client/public/bundle.js'))
});

gulp.task('build', function() {
    gulp.src('./client/app/index.jsx')
        .pipe(browserify({
            insertGlobals : true,
            debug : false
        }))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./client/public/bundle.js'))
});

gulp.task('watch', function() {
    gulp.watch('client/app/!**!/!**.jsx', ['dev']);
});

gulp.task('default', ['build']);
*/
