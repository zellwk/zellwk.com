const fs = require('fs')
const frontMatter = require('front-matter')

const HtmlEntities = require('html-entities').AllHtmlEntities
const entities = new HtmlEntities()

module.exports = {
  youtube (hash) {
    if (!hash) return ''
    return `<div class="media">
      <iframe class="youtube" src="https://www.youtube.com/embed/${hash}" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
    </div>
    `
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
