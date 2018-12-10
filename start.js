require('isomorphic-fetch')
require('dotenv').config({ path: 'secrets/variables.env' })
const app = require('./server/server')

const isProduction = process.env.NODE_ENV === 'production'
const port = (isProduction) ? 8080 : 5555

app.listen(port, '127.0.0.1', () => {
  console.log('app listening on http://' + port)
})
