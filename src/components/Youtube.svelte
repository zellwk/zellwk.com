<script>
  export let id, title
  const link = `https://www.youtube.com/embed/${id}`
</script>

<!-- TODO: Not sure if height and width is needed -->
<iframe
  width="560"
  height="315"
  src={link}
  {title}
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
/>
