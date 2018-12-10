const camelcaseKeys = require('camelcase-keys')

exports.camelKeys = (req, res, next) => {
  req.body = camelcaseKeys(req.body, { deep: true })
  req.params = camelcaseKeys(req.params)
  next()
}
