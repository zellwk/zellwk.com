const nodemailer = require('nodemailer')
const mailgunTransport = require('nodemailer-mailgun-transport')
const denodeify = require('denodeify')
const juice = require('juice')
const nunjucks = require('nunjucks')
const markdown = require('nunjucks-markdown')
const marked = require('marked')
const isProduction = process.env.NODE_ENV === 'production'
const htmlToText = require('html-to-text')

const transporter = nodemailer.createTransport(
  mailgunTransport({
    auth: {
      api_key: process.env.MAILGUN,
      domain: 'email.zellwk.com'
    }
  })
)

const getEntry = (entries, item) =>
  entries.find(entry => entry.name === item).answer
const getName = entries => getEntry(entries, 'name')
const getEmail = entries => getEntry(entries, 'email')
const getSubject = entries => getEntry(entries, 'subject')

const markdownFilter = (str, stripPara = true) => {
  let text = marked(str).trim()
  if (stripPara) text = text.replace(/^<p>|<\/p>$/g, '')
  return text
}

const generateHTML = ({ filename, entries } = {}) => {
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'), {
    watch: !isProduction,
    noCache: !isProduction,
    autoescape: false
  })

  marked.setOptions({ smartypants: true })
  markdown.register(env, marked)
  env.addFilter('markdown', markdownFilter)

  const name = getName(entries)
  const html = env.render(`email/${filename}.njk`, { name, entries })
  return juice(html)
}

exports.send = async options => {
  const html = generateHTML(options)
  const { entries } = options
  const email = getEmail(entries)
  const subject = getSubject(entries)

  const mailOptions = {
    from: 'zell@zellwk.com',
    to: ['zell@zellwk.com', email],
    subject: subject,
    html,
    text: htmlToText.fromString(html)
  }

  const sendMail = denodeify(transporter.sendMail).bind(transporter)

  return sendMail(mailOptions)
    .then(console.log)
    .catch(e => {
      console.log(e)
      console.log('---')
    })
}
