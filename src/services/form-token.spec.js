import { describe, expect, it } from 'vitest'
import {
  createFormToken,
  formTokenLifeMs,
  verifyFormToken,
} from './form-token.js'

const secret = 'test-secret'
const nonce = 'abc123'
const now = Date.UTC(2026, 10, 10)

describe('verifyFormToken', () => {
  it('accepts a live token with its cookie', () => {
    const token = createFormToken({ nonce, secret, now })
    expect(verifyFormToken({ token, cookieNonce: nonce, secret, now })).toBe(
      true,
    )
  })

  it('rejects a tampered signature', () => {
    const token = createFormToken({ nonce, secret, now })
    const last = token.at(-1) === 'A' ? 'B' : 'A'
    const tampered = token.slice(0, -1) + last
    expect(
      verifyFormToken({ token: tampered, cookieNonce: nonce, secret, now }),
    ).toBe(false)
  })

  it('rejects a tampered expiry', () => {
    const token = createFormToken({ nonce, secret, now })
    const [, , signature] = token.split('.')
    const tampered = `${nonce}.${now + formTokenLifeMs * 100}.${signature}`
    expect(
      verifyFormToken({ token: tampered, cookieNonce: nonce, secret, now }),
    ).toBe(false)
  })

  it('rejects an expired token', () => {
    const token = createFormToken({ nonce, secret, now })
    const later = now + formTokenLifeMs
    expect(
      verifyFormToken({ token, cookieNonce: nonce, secret, now: later }),
    ).toBe(false)
  })

  it("rejects a nonce that doesn't match the cookie", () => {
    const token = createFormToken({ nonce, secret, now })
    expect(verifyFormToken({ token, cookieNonce: 'other', secret, now })).toBe(
      false,
    )
  })

  it('rejects a token without its cookie', () => {
    const token = createFormToken({ nonce, secret, now })
    expect(
      verifyFormToken({ token, cookieNonce: undefined, secret, now }),
    ).toBe(false)
  })

  it('rejects a token signed with another secret', () => {
    const token = createFormToken({ nonce, secret: 'other-secret', now })
    expect(verifyFormToken({ token, cookieNonce: nonce, secret, now })).toBe(
      false,
    )
  })

  it.each([undefined, '', 'abc', 'a.b', 'a.b.c.d', 42])(
    'rejects a malformed token: %s',
    token => {
      expect(verifyFormToken({ token, cookieNonce: nonce, secret, now })).toBe(
        false,
      )
    },
  )
})
