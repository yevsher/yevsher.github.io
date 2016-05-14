// Generated on 2016-03-19 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');


var paths = {
  scripts: ['app/scripts/**/*.js','node_modules/angular/**/*.js','node_modules/angular-ui-router/**/*.js','node_modules/angular-resource/**/*.js','app/bootstrap/**/*.js'],
  styles: ['app/styles/**/*.css', 'app/bootstrap/**/*.css'],
  test: ['test/spec/**/*.js'],
  karma: 'karma.conf.js'
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, '.tmp/styles');

///////////
// Tasks //
///////////

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(styles());
});

gulp.task('lint:scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(lintScripts());
});

gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb);
});


gulp.task('watch', ['browser-sync'], function () {
    
 $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles());


  $.watch(paths.views.files)
    .pipe($.plumber());


  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts());

  gulp.watch('bower.json', ['bower']);
});

gulp.task('browser-sync', function(){
	var files = [
      'app/**/*.html',
	  'app/views/*.html',
      'app/styles/**/*.css',
      'app/images/**/*.png',
      'app/scripts/**/*.js', 
      'node_modules/angular/**/*.js',
      'node_modules/angular-ui-router/**/*.js',
      'node_modules/angular-resource/**/*.js',
      'app/bootstrap/**/*.js',
      'app/bootstrap/**/*.css'    
   ];
   
   browserSync.init(files, {
	   server: {
		   baseDir: "app",
		   index: "index.html"
	   },	   
   });
    
    gulp.watch(['app/**']);
});
