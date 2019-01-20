const fs = require('fs')
const dotenv = require('dotenv')
const envConfig = dotenv.parse(fs.readFileSync('./secrets/variables.env'))
for (let k in envConfig) {
  process.env[k] = envConfig[k]
}

require('isomorphic-fetch')
// require('dotenv').config({ path: 'secrets/variables.env' })
const app = require('./server/server')

const isProduction = process.env.NODE_ENV === 'production'
const port = (isProduction) ? 8080 : 5555

app.listen(port, '127.0.0.1', () => {
  console.log('app listening on http://' + port)
})
