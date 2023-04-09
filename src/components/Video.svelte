<script>
  export let src, alt, gifReplacement, caption, otherProps

  let props = {
    playsinline: true,
    controls: true,
    ...otherProps,
  }

  // This will be a Gif replacement instead of an actual video
  // so we change video properties to match its use case.
  if (gifReplacement) {
    props = {
      ...props,
      autoplay: true,
      loop: true,
      muted: true,
      controls: false,
    }
  }
</script>

{#if caption}
  <figure aria-label={caption}>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video {...props}>
      <source {src} type="video/mp4" />
      {alt}. Your browser doesn't support the HTML video element. Click
      <a href={src}>this link</a>
      to watch the video.
    </video>
    <figcaption aria-hidden>{caption}</figcaption>
  </figure>
{/if}

{#if !caption}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video {...props}>
    <source {src} type="video/mp4" />
    {alt}. Your browser doesn't support the HTML video element. Click
    <a href={src}>this link</a>
    to watch the video.
  </video>
{/if}
