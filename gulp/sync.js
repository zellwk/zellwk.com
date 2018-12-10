const gulp = require('gulp')
const rsync = require('gulp-rsync')

// Cannot set gulp.src to a glob.
// https://github.com/jerrysu/gulp-rsync/issues/23
const syncSecrets = cb => {
  return gulp.src('secrets')
    .pipe(rsync({
      root: 'secrets',
      hostname: `${process.env.SSH_USER}@${process.env.SSH_HOST}`, // Set this to your ssh login
      destination: '/home/zellwk/zellwk.com/secrets', // Set this to your destination path
      clean: true,
      recursive: true
    }))
}

const syncFiles = cb => {
  return gulp.src('dist')
    .pipe(rsync({
      root: 'dist',
      hostname: `${process.env.SSH_USER}@${process.env.SSH_HOST}`, // Set this to your ssh login
      destination: '/home/zellwk/zellwk.com/dist', // Set this to your destination path
      recursive: true
    }))
}

exports.syncSecrets = syncSecrets
exports.syncFiles = syncFiles
