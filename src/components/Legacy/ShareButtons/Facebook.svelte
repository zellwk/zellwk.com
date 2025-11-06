<script>
  import './share-buttons.scss'
  import { onMount } from 'svelte'

  export let appId = '1812034912446656'
  export let version = 'v13.0'
  export let buttonText = 'Share on Facebook'

  // `href` defaults to current page unless specified
  // Note: Facebook will throw an error on localhost because Facebook doesn't recognize localhost as a valid URL.
  export let shareURL = ''

  onMount(async _ => {
    await loadScript(`https://connect.facebook.net/en_US/sdk.js`)
    FB.init({ appId, version })
  })

  function share() {
    shareURL = shareURL || window.location.href
    shareURL = 'https://zellwk.com'

    FB.ui({ method: 'share', href: shareURL }, function (response) {})
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src
      document.body.appendChild(script)
      script.addEventListener('load', () => resolve(script))
      script.addEventListener('error', () => reject(script))
    })
  }
</script>

<button class="ShareButton mFacebook" on:click={share}>
  <svg viewBox="0 0 40 40">
    <path
      d="M20 0c11 0 20 9 20 20 0 9.9-7.2 18.1-16.7 19.8l-.085-.067c.062-.01.123-.022.185-.033V25.6h4.4l.9-5.6h-5.3v-3.9c0-1.6.6-2.8 3-2.8H29V8.2c-1.4-.2-3-.4-4.4-.4-4.6 0-7.8 2.8-7.8 7.8V20h-5v5.6h5v14.1l.018.003-.118.097C7.2 38.1 0 29.9 0 20 0 9 9 0 20 0z"
      fill="currentColor"
    />
    <path
      d="m27.8 25.6.9-5.6h-5.3v-3.9c0-1.6.6-2.8 3-2.8H29V8.2c-1.4-.2-3-.4-4.4-.4-4.6 0-7.8 2.8-7.8 7.8V20h-5v5.6h5v14.1c1.1.2 2.2.3 3.3.3 1.1 0 2.2-.1 3.3-.3V25.6h4.4z"
      fill="transparent"
    />
  </svg>
  <span>{buttonText}</span>
</button>

<style>
  .mFacebook {
    background: linear-gradient(to bottom, #0062e0, #1877f2);
    color: white;
  }

  .mFacebook:hover,
  .mFacebook:focus {
    background: #0062e0;
    color: white;
  }
</style>
