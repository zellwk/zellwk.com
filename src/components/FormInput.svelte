<script>
  export let type
  export let name = '' // Submit button don't need name
  export let label = '' // Hidden inputs don't need labels
  export let elem = ''
</script>

<!-- Text-based form item -->
{#if ['text', 'email', 'password'].includes(type)}
  <div class="FormItem">
    <label>
      <div class="label">{label}</div>
      <input {type} {name} {...$$restProps} bind:this={elem} />
    </label>
  </div>
{/if}

<!-- Textarea -->
{#if type === 'textarea'}
  <div class="FormItem">
    <label>
      <div class="label">{label}</div>
      <textarea {name} {...$$restProps} bind:this={elem} />
    </label>
  </div>
{/if}

<!-- Hidden  -->
{#if type === 'hidden'}
  <input type="hidden" {name} {...$$restProps} bind:this={elem} />
{/if}

{#if type === 'button'}
  <div class="FormItem">
    <button type="submit" {...$$restProps} bind:this={elem}><slot /></button>
  </div>
{/if}
