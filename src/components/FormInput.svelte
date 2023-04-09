<script>
  export let type, name
  export let label = '' // Hidden inputs don't need labels
</script>

<!-- Text-based form item -->
{#if ['text', 'email', 'password'].includes(type)}
  <div class="FormItem">
    <label>
      <div class="label">{label}</div>
      <input {type} {name} {...$$restProps} />
    </label>
  </div>
{/if}

<!-- Textarea -->
{#if type === 'textarea'}
  <div class="FormItem">
    <label>
      <div class="label">{label}</div>
      <textarea {name} {...$$restProps} />
    </label>
  </div>
{/if}

<!-- Hidden  -->
{#if type === 'hidden'}
  <input type="hidden" {name} {...$$restProps} />
{/if}
