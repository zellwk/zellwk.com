const chalk = require('chalk')
const path = require('path')

exports.catchErrors = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next)
  }
}

exports.notFound = (req, res, next) => {
  console.log(`Accessing: ${req.originalUrl}`)
  return res.status(404).sendFile(
    path.join(process.cwd(), '/dist/not-found/')
  )
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
  res.json({
    message: err.message,
    error: err
  })
}
