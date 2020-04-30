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

  twitterLink (title, url) {
    const link = `https://twitter.com/share?text=${encodeURIComponent(title)} by @zellwk 👇 &url=${url}`
    return `<a href="${link}" target="_blank" rel="noopener">Twitter</a>`
  },

  youtube (hash) {
    return `<div class="media">
  <iframe class="youtube" src="https://www.youtube.com/embed/{{hash}}?rel=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
</div>`
  }
}
