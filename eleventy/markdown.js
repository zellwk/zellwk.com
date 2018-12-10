const markdownIt = require('markdown-it')
const markdownItContainer = require('markdown-it-container')
const lib = markdownIt({
  html: true,
  typographer: true
})
  .use(markdownItContainer)

// Trims whitespace from front and back of every line.
// Allows markdown tag to be used with any indentation.
// Note: Not useable with triple backticks that produce
//   <pre><code></code></pre> blocks because the front of all lines are
//   trimmed. Can write a better regex to prevent this from happening
//   though. But maybe a later time.
const pairedMarkdown = content => {
  const formatted = content.split(/\n/)
    .map(c => c.trim())
    .join('\n')
  return lib.render(formatted)
}

const inline = content => lib.renderInline(content)

module.exports = {
  lib: lib,
  pairedMarkdown,
  inline
}
