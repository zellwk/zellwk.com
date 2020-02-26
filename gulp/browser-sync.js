const browserSync = require('browser-sync')
const server = browserSync.create()

async function reload () {
  return server.reload()
}

const serve = done => {
  server.init({
    open: false,
    proxy: {
      target: 'localhost:5555'
    }
  })

  done()
}

exports.reload = reload
exports.browserSync = serve
