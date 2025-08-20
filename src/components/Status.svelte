<script>
  let klass = ''

  export { klass as class }
  export let status

  if (typeof status === 'number') {
    switch (true) {
      case status >= 200 && status < 300:
        status = 'success'
        break
      case status >= 300 && status < 400:
        status = 'redirect'
        break
      case status >= 400:
        status = 'error'
        break
      default:
        status = 'info'
    }
  }
</script>

<div
  {...$$restProps}
  class="status {status && `status-${status}`} prose {klass}"
>
  <slot />
</div>
