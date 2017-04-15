import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import babelRegister from 'babel-core/register';
import clean from 'gulp-clean';
import mocha from 'gulp-mocha';
import runSequence from 'run-sequence';
import path from 'path';

const paths = {
  JS: ['./**/*.js', '!dist/**', '!node_modules/**'],
  CONFIG: './config/**/*',
  DIST: 'dist'
};

gulp.task('lint', () => {
  gulp.src(paths.JS)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('clean', () => {
  gulp.src(paths.DIST)
    .pipe(clean());
});

gulp.task('test', () => {
  gulp.src('./test/**/*.js', { read: false })
    .pipe(mocha({
      compilers: { js: babelRegister }
    }));
});

gulp.task('pack', () => {
  gulp.src([...paths.JS, '!gulpfile.babel.js','!public/**/*.js', '!test/**/*.js'], { base: '.' })
    .pipe(babel())
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('copy', function () {
     gulp
      .src('public/**')
      .pipe(gulp.dest('dist/public'));
});

gulp.task('copy-index', function () {
     gulp
      .src('index.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean'], () => {
  runSequence(
    ['lint', 'test', 'pack']
  );
});

gulp.task('config', () => {
  gulp.src(paths.CONFIG)
    .pipe(gulp.dest(path.join(paths.DIST, 'config')));
});

gulp.task('default', ['pack', 'config']);