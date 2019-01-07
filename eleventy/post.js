const getLink = (text, { siteURL, title, permalink }) => {
  const link = `https://twitter.com/share?text=${encodeURIComponent(title)} by @zellwk 👇 &url=${siteURL}${permalink}`
  return `<a href="${link}" target="_blank" rel="noopener">${text}</a>`
}

module.exports = {
  summary (post) {
    // Note: Eleventy runs twice. It contains the templateContent only in the second run.
    if (!post.templateContent) return
    const summary = post.templateContent
      .split(/<!--.*more.*-->/)[0]
      .trim()

    // Converts reference markdown lines to inline links
    // 1. Matches all instances of [x][y]
    // 2. Finds [y]: /link "title"
    // 3. Converts [x][y] to [x](/link "title")
    const regex = /(\[.*\])\[(.*)\]/g
    const replaced = summary.replace(regex, (match, text, anchor) => {
      const refRegexString = `\\[${anchor}\\]:\\s*(.*)[\\s"(.*)"]?`
      /* eslint-disable */
      const [m, link, title] = post.templateContent.match(refRegexString)
      /* eslint-enable */

      return title
        ? text + `(${link} "${title}")`
        : text + `(${link})`
    })

    return replaced
  },

  share (opts = {}) {
    return `Thanks for reading. Did this article help you out? If it did, I hope you consider ${getLink('sharing it', opts)}. You might help someone else out. Thanks so much!`
  }
}
