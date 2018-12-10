// TODO: Figure out what this file is for...
const zlFetch = require('zl-fetch').default
const isProduction = process.env.NODE_ENV === 'production'
const jwt = require('jsonwebtoken')
// TODO: Add URLs utils somewhere
let host = isProduction ? `https://api-course.herokuapp.com` : `http://localhost:4000`

const transferCtrl = (req, res) => {
  const pathname = req.originalUrl.replace('/transfer', '')
  const token = jwt.sign({}, process.env.COURSE_SECRET)

  zlFetch(`${host}${pathname}`, {
    method: req.method,
    token,
    body: req.body
  })
    .then(r => res.send(r))
    .catch((e) => {
      if (e.code === 'ECONNREFUSED') {
        return res.status(503).send(e)
      } else {
        return res.status(e.status).send(e)
      }
    })
}

module.exports = transferCtrl
