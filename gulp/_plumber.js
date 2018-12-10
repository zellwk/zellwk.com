const gutil = require('gulp-util')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')

function customPlumber (errTitle) {
  // Determining whether plumber is ran by Travis
  if (process.env.CI) {
    return plumber({
      errorHandler: function (err) {
        throw Error(gutil.colors.red(err.message))
      }
    })
  } else {
    return plumber({
      errorHandler: notify.onError({
        // Customizing error title
        title: errTitle || 'Error running Gulp',
        message: 'Error: <%= error.stack %>'
      })
    })
  }
}

module.exports = customPlumber
