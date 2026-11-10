import { randomBytes } from 'node:crypto'
import { createFormToken, formTokenLifeMs } from '../../services/form-token.js'
import { JSONResponse } from '../../services/utils.js'
export const prerender = false

export function GET(context) {
  const nonce = randomBytes(16).toString('base64url')
  const token = createFormToken({
    nonce,
    secret: import.meta.env.FORM_TOKEN_SECRET,
    now: Date.now(),
  })

  // Pairs the token with this browser
  context.cookies.set('form_nonce', nonce, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/api/sendy/',
    maxAge: formTokenLifeMs / 1000,
  })

  return JSONResponse({ token }, { headers: { 'Cache-Control': 'no-store' } })
}
