<script>
  import { delay, toSlug } from '@splendidlabz/utils'
  import zlFetch from 'zl-fetch'
  import config from '@/services/tracking/config'
  import { fb } from '@/services/tracking/fb/web'
  import { ph } from '@/services/tracking/ph/web'

  let {
    product,
    value,
    label,
    href,
    class: klass = 'button button-large pigment-cyan-filled',
  } = $props()

  // Store URLs follow the slugified product name, e.g.
  // "Practical Astro" -> store.zellwk.com/practical-astro/. Pass `href` to override.
  const url = $derived(href ?? `https://store.zellwk.com/${toSlug(product)}/`)

  async function startCheckout(event) {
    // posthog-js flushes queued events via sendBeacon on pagehide, so this
    // capture survives the full-page nav to the ThriveCart checkout.
    ph.capture('checkout_started', { product, value })

    // Lets a modified click open its new tab as usual
    const isPlainClick =
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    if (!isPlainClick) {
      trackInitiateCheckout()
      return
    }

    // Navigates once the Meta events leave, or after the cap
    const maxDelayMs = 300
    event.preventDefault()
    try {
      await Promise.race([trackInitiateCheckout(), delay(maxDelayMs)])
    } finally {
      window.location.href = url
    }
  }

  async function trackInitiateCheckout() {
    // Builds the pixel and CAPI events under one event id
    const { pixelData, capiData } = await fb.createEvent('InitiateCheckout', {
      value,
      currency: 'USD',
      content_name: product,
    })

    // Sends both events, CAPI with keepalive to outlive the page
    zlFetch.post(config.fb.capiEndpoint, { body: capiData, keepalive: true })
    fb.sendPixelEvent(pixelData, {})
  }
</script>

<a class={klass} href={url} onclick={startCheckout}>{label}</a>
