<script>
  export let src, alt, loading, caption
  import SvelteMarkdown from 'svelte-markdown'

  if (loading !== 'eager') loading = 'lazy'
</script>

{#if caption}
  <figure aria-label={caption} {...$$restProps}>
    <img {src} alt={caption} {loading} aria-hidden />
    <figcaption aria-hidden>
      <SvelteMarkdown source={caption} />
    </figcaption>
  </figure>
{/if}

{#if !caption}
  <figure {...$$restProps}>
    <img {src} {alt} {loading} />
  </figure>
{/if}
