const getLink = (text, { siteURL, title, permalink }) => {
  const link = `https://twitter.com/share?text=${encodeURIComponent(title)} by @zellwk 👇 &url=${siteURL}${permalink}`
  return `<a href="${link}" target="_blank" rel="noopener">${text}</a>`
}

module.exports = {
  summary (post) {
    // Note: Eleventy runs twice. It contains the templateContent only in the second run.
    if (!post.templateContent) return
    const t = post.templateContent
      .split(/<!--.*more.*-->/)[0]
      .trim()
    return t
  },

  share (opts = {}) {
    return `Thanks for reading. Did this article help you out? If it did, I hope you consider ${getLink('sharing it', opts)}. You might help someone else out. Thanks so much!`
  }
}
