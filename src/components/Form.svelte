<script>
  import Input from './FormInput.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let method = 'post'

  // Prevent spam
  function submit(event) {
    const form = event.target
    const submitter = event.submitter
    // If spam is filled, don't submit
    const spamField = form.elements.spam
    if (spamField.value.trim()) return

    dispatch('submit', { event, form, submitter })
  }
</script>

<form class="Form o-content" {method} on:submit|preventDefault={submit}>
  <Input type="hidden" name="spam" />
  <slot />
</form>
