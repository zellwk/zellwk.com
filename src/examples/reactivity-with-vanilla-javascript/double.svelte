<script>
  import { Callout } from '@splendidlabz/svelte'

  let count = $state(0)
  let double = $derived(count * 2)

  function increase() {
    count += 1
  }
</script>

<Callout type="demo">
  <button onclick={increase}>Add count</button>
  <div>Doubled Count: {double}</div>
</Callout>
