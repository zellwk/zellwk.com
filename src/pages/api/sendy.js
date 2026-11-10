import { verifyFormToken } from '../../services/form-token.js'
import { lists, sendy } from '../../services/sendy.js'
import { fb } from '../../services/tracking/fb/node.js'
import { ph } from '../../services/tracking/ph/node.js'
import { JSONResponse, parseData } from '../../services/utils.js'
export const prerender = false

/**
 * @import { APIContext } from 'astro'
 */

export async function POST(context) {
  const { token, phone, name, email, list, redirect } = await parseData(context)
  const isJsonRequest = context.request.headers
    .get('content-type')
    .includes('json')

  // Only redirects within the site
  const isLocalRedirect =
    redirect?.startsWith('/') && !redirect.startsWith('//')
  const redirectURL = isLocalRedirect ? redirect : '/newsletter/confirm/'

  // Fakes success for bots and spammers
  const hasValidToken = verifyFormToken({
    token,
    cookieNonce: context.cookies.get('form_nonce')?.value,
    secret: import.meta.env.FORM_TOKEN_SECRET,
    now: Date.now(),
  })
  if (phone || !hasValidToken)
    return buildRedirect({ context, redirectURL, isJsonRequest })

  const response = await sendy.subscribe({
    context,
    email,
    name,
    listId: lists[list] || lists.main,
  })

  if (!response) {
    return JSONResponse(
      { message: "Sorry, I couldn't subscribe you. Please try again." },
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

  return buildRedirect({ context, redirectURL, isJsonRequest })
}

/**
 * buildRedirect
 * Sends the person to the page after subscribing.
 *
 * @param {object} opts
 * @param {APIContext} opts.context
 * @param {string} opts.redirectURL Page after subscribing
 * @param {boolean} opts.isJsonRequest Whether the island sent it
 * @returns {Response}
 */
function buildRedirect({ context, redirectURL, isJsonRequest }) {
  if (isJsonRequest) return JSONResponse({ redirect: redirectURL })
  return context.redirect(redirectURL, 303)
}
