import { lists, sendy } from '../../services/sendy.js'
import { ph } from '../../services/tracking/ph/node.js'
import { parseData } from '../../services/utils.js'
export const prerender = false

export async function POST(context) {
  const { phone, name, email, list, redirect } = await parseData(context)

  // Only redirects within the site
  const isLocalRedirect =
    redirect?.startsWith('/') && !redirect.startsWith('//')
  const redirectURL = isLocalRedirect ? redirect : '/newsletter/confirm/'

  // Fakes success for spammers
  if (phone) return context.redirect(redirectURL, 303)

  const response = await sendy.subscribe({
    context,
    email,
    name,
    listId: lists[list] || lists.main,
  })

  if (!response) {
    return new Response(
      "Sorry, I couldn't subscribe you. Please go back and try again.",
      { status: 400 },
    )
  }

  ph.capture('newsletter_signup', {
    email,
    context,
    properties: { list, $set: { name } },
  })

  return context.redirect(redirectURL, 303)
}
