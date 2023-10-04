import dirname from '@zellwk/javascript/node/dirname.js'
import express from 'express'
import path from 'path'
import { handler as ssrHandler } from './dist/server/entry.mjs'
const app = express()

// Redirects
app.use((req, res, next) => {
  const { url } = req
  if (url.startsWith('feed.xml')) return res.redirect(301, '/rss.xml')
  if (url.startsWith('/blog/looping-through-js-objects'))
    return res.redirect(301, '/blog/iterating-through-js-objects/')

  return next()
})

// ========================
// Static Pages
// ========================
app.use(express.static('dist/client/'))
app.use(ssrHandler)

// ========================
// Routes
// ========================

// ========================
// Error Handlers
// ========================
// Not Found
app.use((req, res, next) => {
  console.log(`Not Found: ${req.originalUrl}`)
  return res
    .status(404)
    .sendFile(
      path.resolve(dirname(import.meta.url), 'dist', 'client', '404.html')
    )
})

// This works only for JSON errors for now.
// Need to modify for Text/HTML access errors using the accept header.
// Handle another time.
if (process.env.NODE_ENV === 'production') {
  app.use((err, req, res, next) => {
    console.log(err)

    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err,
    })
  })
} else {
  app.use((err, req, res, next) => {
    console.log(err)
    err.stack = err.stack || ''
    const errorDetails = {
      message: err.message,
      status: err.status,
      stackHighlighted: err.stack.replace(
        /[a-z_-\d]+.js:\d+:\d+/gi,
        '<mark>$&</mark>'
      ),
    }
    res.status(err.status || 500)
    return res.json(errorDetails)
  })
}

export default app
