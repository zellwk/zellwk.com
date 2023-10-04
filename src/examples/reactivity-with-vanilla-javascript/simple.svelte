<script>
  import Callout from '../../components/Callout.svelte'

  let show = false
  function toggle() {
    show = !show
  }
</script>

<Callout type="demo">
  <button on:click={toggle}>Toggle hidden content</button>

  {#if show}
    <div style="margin-top: 1rem">Hello World!</div>
  {/if}
</Callout>
