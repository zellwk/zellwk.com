const gulp = require('gulp')
const rsync = require('gulp-rsync')
const { sync } = require('./_config')

// Cannot set gulp.src to a glob.
// https://github.com/jerrysu/gulp-rsync/issues/23
const syncSecrets = cb => {
  return gulp.src('secrets')
    .pipe(rsync({
      root: 'secrets',
      hostname: `${process.env.SSH_USER}@${process.env.SSH_HOST}`,
      destination: sync.secretsDest,
      clean: true,
      recursive: true
    }))
}

const syncFiles = cb => {
  console.log(`user: ${process.env.SSH_USER}`)
  console.log(`host: ${process.env.SSH_HOST}`)
  console.log('happy birthday to you')

  return gulp.src('dist')
    .pipe(rsync({
      root: 'dist',
      hostname: `${process.env.SSH_USER}@${process.env.SSH_HOST}`,
      destination: sync.staticDest,
      clean: true,
      recursive: true
    }))
}

exports.syncSecrets = syncSecrets
exports.syncFiles = syncFiles
