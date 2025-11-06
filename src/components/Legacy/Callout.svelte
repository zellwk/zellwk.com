<script>
  export let type = 'note'
  let klass = ''
  export { klass as class }
</script>

<div class="Callout o-words {klass}" {type}>
  <slot />
</div>
