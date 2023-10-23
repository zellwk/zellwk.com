<script>
  import { onMount } from 'svelte'

  let adRef = null

  onMount(() => {
    const h2s = document.querySelectorAll('article h2')
    const length = h2s.length

    // Placement location depends on how many H2s there are in the article. If there are no H2s, we don't have an ad in that page.
    if (length <= 0) return

    // Insert the add before the first h2 element
    const secondH2 = h2s[1]
    const parent = secondH2.parentElement
    parent.insertBefore(adRef, secondH2)
  })
</script>

<!-- Horizontal Display Ad -->
<div bind:this={adRef}>
  <ins
    class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-5287671859285058"
    data-ad-slot="2534384790"
    data-ad-format="auto"
    data-full-width-responsive="true"
  />
  <script>
    ;(adsbygoogle = window.adsbygoogle || []).push({})
  </script>
</div>

<style>
  div {
    /* background-color: red; */
    /* min-height: 90px; */
  }
</style>
