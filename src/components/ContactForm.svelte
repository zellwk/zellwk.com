<script>
  import delay from '@zellwk/javascript/utils/delay.js'
  import zlFetch from 'zl-fetch'
  import FormInput from './FormInput.svelte'

  import Modal from './Modal.svelte'
  import ModalLoader from './ModalLoader.svelte'

  // export let action = 'https://api.zellwk.com/email'
  export let action = 'http://localhost:4000/api/v1/email'
  export let method = 'post'
  export let template = 'contact-form'
  export let redirectTo

  let launcher
  let modalState = 'closed'
  let loaderState = 'paused'
  let errorMessage

  async function submit(event) {
    launcher = event.submitter
    modalState = 'open'
    const form = event.target

    // Only submit if the spam field is empty
    // This is to prevent bots from submitting the form
    const spamField = form.elements.spam
    if (spamField.value.trim()) {
      return
    }

    // Form Data in JSON
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    // Minimum loading duration = 3 seconds
    const [fetchResponse] = await Promise.all([
      zlFetch.post(action, { body: data, returnError: true }),
      delay(3000),
    ])

    const { response, error } = fetchResponse

    if (response) {
      loaderState = 'complete'
    }

    if (error) {
      loaderState = 'error'
      if (error.status === 422) {
        errorMessage = `Please make sure your email is filled in correctly! We tried sending you an email but it bounced.`
        return
      }
      errorMessage = error.body?.message || error.message
    }
  }
</script>

<form class="Form o-content" {method} on:submit|preventDefault={submit}>
  <FormInput type="hidden" name="spam" value="" />
  <FormInput type="hidden" name="template" value={template} />

  <slot />
</form>

{#if modalState === 'open'}
  <Modal
    {launcher}
    on:escape={() => {
      modalState = 'closed'
    }}
    on:modalOpened={() => (loaderState = 'playing')}
  >
    <ModalLoader
      bind:state={loaderState}
      on:loadingComplete={(window.location.pathname = redirectTo)}
    >
      <div slot="title">Hold on while I send your message...</div>
      <div slot="error">{errorMessage}</div>
    </ModalLoader>
  </Modal>
{/if}
