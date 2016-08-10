'use strict';

// import
import gulp from 'gulp';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import watch from 'gulp-watch';
import source from 'vinyl-source-stream';
import streamify from 'gulp-streamify';
import browserify from 'browserify';
import uglify from 'gulp-uglify';
import useref from 'gulp-useref';
import {server} from 'electron-connect';
const electron = server.create();

// const
const SRC  = './app/src';
const DEST = './app/public';

const DIST = './dist';

// css
gulp.task('sass', () => {
  // needs plubmer ?
  return gulp.src(`${SRC}/sass/**/*.sass`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(`${DEST}/css`));
});

gulp.task('browserify', () => {
  return browserify({
      entries: [`${SRC}/js/main.js`],
      detectGlobals: false,
      builtins: []
    })
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('main.js'))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest(`${DEST}/js`));
})

// electron server
gulp.task('server', () => {

  electron.start();

  // watch and compile
  gulp.watch(`${SRC}/sass/**/*.sass`, gulp.series('sass'));
  gulp.watch(`${SRC}/js/**/*.{js,jsx}`, gulp.series('browserify'));

  // watch and refresh
  gulp.watch(['./main.js'], (done) => {
    electron.stop();
    electron.restart();
    done();
  });
  gulp.watch([`${DEST}/**/*.css`, `${DEST}/**/*.js`, `app/**/*.html`], (done) => {
    electron.reload();
    done();
  });
});

// remove react minified warning
gulp.task('apply-prod-env', (done) => {
  process.env.NODE_ENV = 'production';
  done();
});

// set application original env flag
gulp.task('setup-app-env-dev', (done) => {
  process.env.APP_ENV = 'development';
  done();
});

gulp.task('prod:copy', () => {

  gulp.src('app/public/**/*')
    .pipe(gulp.dest(`${DIST}/public`));

  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest(DIST));
});

// build
gulp.task('compile', gulp.parallel('sass', 'browserify'));
gulp.task('build', gulp.series('apply-prod-env', 'compile'));

// for development
gulp.task('dev', gulp.series('setup-app-env-dev', 'build', 'server'));

// for production
gulp.task('prod', gulp.series('build', 'prod:copy'));
