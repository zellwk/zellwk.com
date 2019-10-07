// Overrides existing env with variables from config
// Require this because:
//  1. pm2 cluster mode stores previous env variables
//  2. dotenv doesn't overwrite env variables automatically
//     https://www.npmjs.com/package/dotenv
const updateEnv = pathToConfig => {
  const envConfig = dotenv.parse(fs.readFileSync(pathToConfig))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

const fs = require('fs')
const dotenv = require('dotenv')
updateEnv('./secrets/variables.env')

const app = require('./server/server')
const isProduction = process.env.NODE_ENV === 'production'
const port = (isProduction) ? 8080 : 5555

app.listen(port, '127.0.0.1', () => {
  console.log('app listening on http://' + port)
})
