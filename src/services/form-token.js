/** @file Signs and checks newsletter form tokens. */
import { createHmac, timingSafeEqual } from 'node:crypto'

export const formTokenLifeMs = 10 * 60 * 1000

/**
 * createFormToken
 * Signs a nonce so a later submit can prove it fetched one.
 *
 * @param {object} opts
 * @param {string} opts.nonce Random value for the cookie
 * @param {string} opts.secret Signing key
 * @param {number} opts.now Current time in ms
 * @returns {string} `nonce.expiry.signature`
 */
export function createFormToken({ nonce, secret, now }) {
  const payload = `${nonce}.${now + formTokenLifeMs}`
  return `${payload}.${sign({ payload, secret })}`
}

/**
 * verifyFormToken
 * Decides whether a submit carries a live token for its cookie.
 *
 * @param {object} opts
 * @param {unknown} opts.token Token from the submit
 * @param {string} [opts.cookieNonce] Nonce from the cookie
 * @param {string} opts.secret Signing key
 * @param {number} opts.now Current time in ms
 * @returns {boolean}
 */
export function verifyFormToken(opts) {
  const { token, cookieNonce, secret, now } = opts
  if (typeof token !== 'string') return false

  const parts = token.split('.')
  if (parts.length !== 3) return false
  const [nonce, expiry, signature] = parts

  // Checks the signature before trusting the nonce or expiry
  const expected = Buffer.from(sign({ payload: `${nonce}.${expiry}`, secret }))
  const given = Buffer.from(signature)
  if (given.length !== expected.length) return false
  if (!timingSafeEqual(given, expected)) return false

  const isLive = Number(expiry) > now
  const matchesCookie = nonce === cookieNonce
  return isLive && matchesCookie
}

/**
 * sign
 * Signs a payload with HMAC-SHA256.
 *
 * @param {object} opts
 * @param {string} opts.payload Text to sign
 * @param {string} opts.secret Signing key
 * @returns {string} base64url signature
 */
function sign({ payload, secret }) {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}
