import postmark from 'postmark'

const postmarkAPIKey = process.env.POSTMARK_API_KEY

const defaultOptions = {
  from: 'zell@zellwk.com',
  MessageStream: 'outbound',
}

export function sendEmail(options) {
  const client = new postmark.ServerClient(postmarkAPIKey)
  const opts = Object.assign({}, defaultOptions, options)

  return client.sendEmail({
    From: opts.from,
    To: opts.to,
    Subject: opts.subject,
    HTMLBody: opts.html,
    TextBody: opts.text,
  })
}
