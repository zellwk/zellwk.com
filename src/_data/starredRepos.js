require('isomorphic-fetch')
require('dotenv').config({ path: 'secrets/variables.env' })

const zlFetch = require('zl-fetch')
const token = process.env.GH_TOKEN

// TODO: Somehow zlFetch doesn't work here. I don't know why!
const fetchMyStarred = async _ => {
  const response = await fetch('https://api.github.com/users/zellwk/starred', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  const repos = await response.json()

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

module.exports = function () {
  return fetchMyStarred()
}
