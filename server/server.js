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
// # Redirects
// ======================================
app.get('/learnjs', (req, res) => (res.redirect('https://learnjavascript.today')))

// Affiliate links
// DO A GETTING STARTED PAGE
// DO A RESOURCE PAGE
// DEMO VIDEO WOULD HELP!
// 1-3 things that help users for this video. Use screenflow and record what's on your screen.
// Why convertkit better than others. Use the #convertkit tag and "email marketing" if you put it up on Youtube
// If you want to check how easy Convertkit is easy to use, check out this link here! Keep linking to this page if possible.
// Pains, problems, needs for your target audience. (Give a bonus for them or something...)
app.get('/convertkit', (req, res) => {
  res.redirect('https://convertkit.com?lmref=yfs9CA')
})

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
