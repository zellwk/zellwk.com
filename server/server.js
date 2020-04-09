require('isomorphic-fetch')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const routes = require('./routes')
const { camelKeys } = require('./middlewares')
const errorHandlers = require('./handlers/errorHandlers')
const isProduction = process.env.NODE_ENV === 'production'
const app = express()

// ======================================
// # Redirects
// ======================================
app.use('/', require('./redirects'))

// ======================================
// # Statics
// ======================================
app.use(express.static('dist'))

if (isProduction) {
  app.use(favicon(path.join(__dirname, '../', '/dist/favicons/favicon.ico')))
}

// ======================================
// # Middlewares
// ======================================
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(camelKeys)

// ======================================
// # Routes
// ======================================
app.use('/', routes)

// ======================================
// # Error handlers
// ======================================
app.use(errorHandlers.notFound)

if (isProduction) {
  app.use(errorHandlers.prodErrors)
} else {
  app.use(errorHandlers.devErrors)
}

module.exports = app
