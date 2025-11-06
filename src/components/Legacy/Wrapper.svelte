<script>
  export let condition = false
  export let tag = ''
  export let component = ''
</script>

<!-- Wraps with a component -->
{#if condition && component}
  <svelte:component this={component} {...$$restProps} />
{/if}

<!-- Wraps with a tag -->
{#if condition && tag}
  <svelte:element this={tag} {...$$restProps}>
    <slot />
  </svelte:element>
{/if}

<!-- No wrap -->
{#if !condition}
  <slot />
{/if}
