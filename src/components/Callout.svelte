<script>
  export let type = 'note'
  let klass = ''
  export { klass as class }

  klass = `${type} ${klass}`
</script>

<div class={klass}>
  <slot />
</div>
