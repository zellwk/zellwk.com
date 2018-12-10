require('isomorphic-fetch')
require('dotenv').config({ path: 'secrets/variables.env' })

const zlFetch = require('zl-fetch').default
const token = process.env.GH_TOKEN

const fetchMyStarred = async _ => {
  const { body: repos } = await zlFetch('https://api.github.com/user/starred', {
    token,
    headers: {
      accept: 'application/vnd.github.v3+json'
    }
  })

  return repos
    .filter(repo => repo.owner.login === 'zellwk')
    .sort((a, b) => {
      if (a.stargazers_count < b.stargazers_count) {
        return 1
      } else {
        return -1
      }
    })
}

module.exports = fetchMyStarred
