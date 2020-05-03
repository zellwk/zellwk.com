const express = require('express')
const router = express.Router()

/**
 * 301 redirect from old url to new url
 * @param {String} oldUrl
 * @param {String} newUrl
 */
function redirect (oldUrl, newUrl, statusCode = 301) {
  router.get(oldUrl, (req, res) => res.redirect(statusCode, newUrl))
}

// ========================
// Redirects
// ========================
redirect('/blog/crud-express-and-mongodb-2', '/blog/crud-express-mongodb')
redirect('/blog/think', '/blog/think-like-a-programmer/')
redirect('/learnjs', 'https://learnjavascript.today')
redirect('/bydb-guided', 'https://gum.co/bydb-guided')
redirect('/bydb-guided-3', 'https://gum.co/bydb-guided-3')
redirect('/bydb-group', 'https://gum.co/bydb-group')
redirect('/bydb-group-3', 'https://gum.co/bydb-group-3')

// Affiliate Links
redirect('/convertkit', 'https://convertkit.com?lmref=yfs9CA', 302) // Convertkit
redirect('/ctcc', 'https://gumroad.com/a/862221427', 302) // Crack the coding career by Shawn Wang
redirect('/dracula', 'https://gumroad.com/l/dracula-pro') // Dracula Pro (Not shared yet)
redirect('/waim', 'https://wanderingaimfully.com/join/ref/26/') //

module.exports = router
