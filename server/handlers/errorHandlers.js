const chalk = require('chalk')

exports.catchErrors = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next)
  }
}

exports.notFound = (req, res, next) => {
  console.log(`Accessing: ${req.originalUrl}`)
  const err = new Error('Not Found')
  err.status = 404
  return res.redirect('/not-found/')
}

exports.devErrors = (err, req, res, next) => {
  err.stack = err.stack || ''
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  }
  res.status(err.status || 500)
  console.log(chalk.red(err))
  return res.json(errorDetails)
}

// TODO: Format frod errors properly
exports.prodErrors = (err, req, res, next) => {
  res.status(err.status || 500)
  console.log(chalk.red(err))
  res.render('error', {
    message: err.message,
    error: {}
  })
}
