import { ph } from './web'

// Delegated listener: any element with [data-checkout-cta] fires checkout_started
// on click. posthog-js flushes queued events via sendBeacon on pagehide, so the
// event survives the full-page nav to the ThriveCart checkout.
export function initCheckoutTracking() {
  document.addEventListener('click', (event) => {
    const cta = event.target.closest('[data-checkout-cta]')
    if (!cta) return
    const { product } = cta.dataset
    const value = Number(cta.dataset.value) || undefined
    ph.capture('checkout_started', { product, value })
  })
}
