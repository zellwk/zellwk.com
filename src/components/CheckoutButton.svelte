<script>
  import { toSlug } from '@splendidlabz/utils'
  import { ph } from '@/services/tracking/web'

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

  function trackCheckout() {
    // posthog-js flushes queued events via sendBeacon on pagehide, so this
    // capture survives the full-page nav to the ThriveCart checkout.
    ph.capture('checkout_started', { product, value })
  }
</script>

<a href={url} class={klass} onclick={trackCheckout}>{label}</a>
