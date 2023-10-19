<script>
  import { onMount } from 'svelte'

  let adRef = null

  onMount(() => {
    const h2s = document.querySelectorAll('article h2')
    const length = h2s.length

    // Placement location depends on how many H2s there are in the article. If there are no H2s, we don't have an ad in that page.
    if (length <= 0) return

    // Insert the add before the first h2 element
    const firstH2 = h2s[0]
    const parent = firstH2.parentElement
    parent.insertBefore(adRef, firstH2)
  })
</script>

<div>
  <!-- Google Article Ad -->
  <ins
    bind:this={adRef}
    class="adsbygoogle"
    style="display:block; text-align:center;"
    data-ad-layout="in-article"
    data-ad-format="fluid"
    data-ad-client="ca-pub-5287671859285058"
    data-ad-slot="5140366839"
  />
  <script async>
    ;(adsbygoogle = window.adsbygoogle || []).push({})
  </script>
</div>
