import templates from '@/emails/template'
import { createEmail } from '@splendidlabz/astro/email'
import Postmark from '@splendidlabz/third-party/postmark'

// Postmark options
const PM_OPTIONS = {
  from: 'Zell Liew <zell@zellwk.com>',
}

// Initialize Postmark
const postmark = Postmark(import.meta.env.POSTMARK_KEY, PM_OPTIONS)

// Export the Postmark functions
export const constructEmailAddress = postmark.constructEmailAddress
export const sendEmail = postmark.sendEmail

export async function makeEmail(template = 'default', data) {
  const tmp = templates[template]
  return createEmail(tmp, data)
}
