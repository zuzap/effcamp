var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({ advanced: true }),
    autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
var path = require('path');

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
  .pipe(less({
    plugins: [autoprefix, cleancss]
  }))
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./public/css'))
});

gulp.watch('./less/**/*.less', ['less'])

gulp.task('default', ['less'], function() {
  // place code for your default task here
});


