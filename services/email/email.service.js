import * as postmark from './postmark.js'

import { convert } from 'html-to-text'
import createError from 'http-errors'
import { fileURLToPath } from 'url'
import juice from 'juice'
import markdown from 'nunjucks-markdown'
import { marked } from 'marked'
import nunjucks from 'nunjucks'
import path from 'path'
import pretty from 'pretty'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// We used markdown for the emails
marked.setOptions({
  gfm: true,
  smartypants: true,
  smartLists: true,
})

// Configure Nunjucks with Markdown
const env = nunjucks.configure(path.join(dirname, 'templates'))
markdown.register(env, marked)

export function createEmail({ template, context }) {
  let output = nunjucks.render(template, context)

  // Prettify the HTML output to make it easier to read
  output = output.replace(/\n/g, '')
  output = pretty(output)

  // Inline CSS for emails
  const html = juice(output)

  // Produce a text version
  const text = convert(output)

  return { html, text }
}

export function sendEmail(options) {
  const { to, subject, html, text } = options
  if (!to) {
    throw createError(400, 'Email must have a recipient')
  }

  if (!subject) {
    throw createError(400, 'Email must have a subject')
  }

  if (!html) {
    throw createError(400, 'The email must have HTML content')
  }

  if (!text) {
    throw createError(400, 'The email must include a plain-text version')
  }

  return postmark.sendEmail(options)
}
