import app from './server.js'
import config from './site-config.js'

app.listen(config.port, '127.0.0.1', () => {
  console.log('app listening on http://' + config.port)
})
