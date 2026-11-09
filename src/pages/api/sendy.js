import { lists, sendy } from '../../services/sendy.js'
import { fb } from '../../services/tracking/fb/node.js'
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

  // The form's page, not this endpoint, is where the signup happened.
  const { error } = await fb.track('Lead', {
    context,
    email,
    content_name: list || 'main',
    event_source_url:
      context.request.headers.get('referer') || context.url.href,
  })
  if (error) console.error('Meta CAPI Lead failed', error)

  return context.redirect(redirectURL, 303)
}
