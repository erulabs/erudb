'use strict'
require('babel-core/register')
import gulp from 'gulp'
import del from 'del'
import sourcemaps from 'gulp-sourcemaps'
import eslint from 'gulp-eslint'
import babel from 'gulp-babel'
import server from 'gulp-develop-server'
import prepend from 'prepend-file'
import mocha from 'gulp-mocha'
import fs from 'fs'

const DEST = '_build'
const SRC = 'src'

gulp.task('clean', function () {
  del(DEST)
})

gulp.task('main', function () {
  return gulp.src(`${SRC}/*.js`)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(sourcemaps.init())
		.pipe(babel({ presets: [ 'es2015' ] }))
    .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(DEST))
})

gulp.task('watch', ['default'], function () {
  server.listen({ path: DEST })
  gulp.watch(`${SRC}/*.js`, ['main', server.restart])
})

gulp.task('finalize', ['default'], function () {
  prepend('./_build/cli.js', '#!/usr/bin/env node\n')
  fs.chmodSync('./_build/cli.js', '0770')
})

gulp.task('test', function () {
  return gulp.src(`test/*.js`, { read: false })
    .pipe(mocha({ reporter: 'spec' }))
})

gulp.task('default', ['clean', 'main', 'test'])
