<script>
  export let href = ''
</script>

{#if href}
  <a {href} class="button" data-type="secondary" {...$$restProps}><slot /></a>
{:else}
  <button class="button" data-type="secondary" {...$$restProps}><slot /></button
  >
{/if}
