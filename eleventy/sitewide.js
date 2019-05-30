const fs = require('fs')
const frontMatter = require('front-matter')

const HtmlEntities = require('html-entities').AllHtmlEntities
const entities = new HtmlEntities()

module.exports = {
  youtube (hash) {
    if (!hash) return ''
    return `<iframe class="youtube" src="https://www.youtube.com/embed/${hash}" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>`
  },

  audio (hash) {
    if (!hash) return ''
    return `<iframe frameborder='0' height='200px' scrolling='no' seamless src=https://embed.simplecast.com/${hash}?color=f5f5f5' width="100%"></iframe>`
  },

  audio2 (hash) {
    if (!hash) return ''
    return `<iframe height="200px" width="100%" frameborder="no" scrolling="no" seamless src="https://player.simplecast.com/${hash}?dark=false"></iframe>`
  },

  decode (content) {
    return entities.decode(content)
  },

  getDescription (page, desc, siteDesc) {
    const { inputPath } = page
    const isPost = inputPath.includes('/posts/')
    if (!isPost) return desc || siteDesc

    const file = fs.readFileSync(inputPath)
    const contents = file.toString()
    const fm = frontMatter(contents)

    if (fm.attributes.description) return fm.attributes.description

    const moreIndicator = /<!--.*more.*-->/
    const generated = fm.body.split(moreIndicator)[0]
      .replace(/\n\n/g, ' ')
      .trim()
      .substring(0, 300)

    return generated.substr(0, Math.min(generated.length, generated.lastIndexOf(' ')))
  }
}
