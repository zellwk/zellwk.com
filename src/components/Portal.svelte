<!-- TODO: Figure out how to document Svelte components -->
<script>
  import { onMount } from 'svelte'
  let klass
  export { klass as class } // Allows you to specify portal class
  export let target = '' // CSS Selector

  let ref
  klass = klass ? klass + ' portal' : 'portal'

  onMount(() => {
    const portalParent = target ? document.querySelector(target) : document.body
    portalParent.append(ref)
  })
</script>

<div class={klass} bind:this={ref}>
  <slot />
</div>
