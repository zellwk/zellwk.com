<script>
  import Callout from '../../components/Callout.svelte'
  let count = 0

  $: double = count * 2

  function increase() {
    count += 1
  }
</script>

<Callout type="demo">
  <button on:click={increase}>Add count</button>
  <div>Doubled Count: {double}</div>
</Callout>
