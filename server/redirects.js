const express = require('express')
const router = express.Router()

/**
 * 301 redirect from old url to new url
 * @param {String} oldUrl
 * @param {String} newUrl
 */
function redirect (oldUrl, newUrl) {
  router.get(oldUrl, (req, res) => res.redirect(301, newUrl))
}

// ========================
// Redirects
// ========================
redirect('/blog/crud-express-and-mongodb-2', '/blog/crud-express-mongodb')
redirect('/learnjs', 'https://learnjavascript.today')

// Affiliate Links
redirect('/convertkit', 'https://convertkit.com?lmref=yfs9CA')

module.exports = router
