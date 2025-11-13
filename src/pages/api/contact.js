import { makeEmail, sendEmail } from '@/services/email'
import {
  defaultErrorHandler,
  JSONResponse,
  parseData,
} from '@splendidlabz/astro/server'

export const prerender = false
export async function POST(context) {
  const body = await parseData(context)
  const { hp, template = 'Contact', name, email, message, subject } = body

  // Fake the spammers
  if (hp?.trim())
    return JSONResponse({
      status: 'success',
      message: 'Email sent successfully',
    })

  try {
    const { html, text } = await makeEmail(template, {
      name,
      email,
      message,
      subject,
    })

    await sendEmail({
      to: 'zell@zellwk.com',
      replyTo: `${name} <${email}>`,
      subject,
      html,
      text,
    })

    return JSONResponse({
      status: 'success',
      message: 'Email sent successfully',
    })
  } catch (error) {
    return defaultErrorHandler(error)
  }
}
