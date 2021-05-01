const markdownIt = require('markdown-it')
const containerPlugin = require('markdown-it-container')
const anchorPlugin = require('markdown-it-anchor')

const lib = markdownIt({
  html: true,
  typographer: true
})
  .use(anchorPlugin)
  .use(containerPlugin, 'note', {
    render: function (tokens, idx) {
      const tag = tokens[idx]

      // Opening tag
      if (tag.info) {
        return `
          <div class="note">
            <div class="note__content">
        `
      }

      // Closing tag
      return `
          </div>
          <div class="note__deco" aria-hidden="true">
            <div class="top"></div>
            <div class="left"></div>
            <div class="right"></div>
            <div class="bottom"></div>
            <div class="top-left"></div>
            <div class="top-right"></div>
            <div class="bottom-left"></div>
            <div class="bottom-right"></div>
          </div>
        </div>
      `
    }
  })

// Renders Markdown within pair.
// Trims each line so markdown pair can be used with any indentiation.
// *Does not work with code blocks*.
const pairedMarkdown = content => {
  const formatted = content
    .split(/\n/)
    .map(c => c.trim())
    .join('\n')
  return lib.render(formatted)
}

// Renders markdown file
// Must include path to markdown file within pair.
// Works with code blocks
const includeMarkdownFile = content => {
  const array = content.split(/\n/)
  // Trims the first line (so users don't have ensure they strip new lines in Nunjucks)
  array[1] = array[1].trim()

  const formatted = array.join('\n')
  return lib.render(formatted)
}

const inline = content => {
  return content ? lib.renderInline(content) : content
}

module.exports = {
  lib,
  includeMarkdownFile,
  pairedMarkdown,
  inline
}
