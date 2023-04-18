<script>
  import zlFetch, { toObject } from 'zl-fetch'
  import delay from '@zellwk/javascript/utils/delay.js'
  import Form from './Form.svelte'
  import Input from './FormInput.svelte'

  import Modal from './Modal.svelte'
  import ModalLoader from './ModalLoader.svelte'

  export let action
  export let template
  export let redirectTo

  // State
  let modal = {
    state: 'closed',
    launcher: undefined,
  }

  let loader = {
    state: 'paused',
    errorMessage: '',
  }

  // Event handlers
  async function submit(event) {
    const { form, submitter } = event.detail
    modal.launcher = submitter
    modal.state = 'open'
    loader.state = 'playing'

    // Collect data from Form
    const data = toObject(new FormData(form))
    data.template = template

    // Just to make sure we have a minimum delay of 2 seconds
    const promises = await Promise.all([
      zlFetch.post(action, { body: data, returnError: true }),
      delay(2000),
    ])

    const { response, error } = promises[0]

    if (response) {
      loader.state = 'success'
    }

    if (error) {
      loader.state = 'error'
      if (error.status === 422) {
        loader.errorMessage = `Please make sure your email is filled in correctly! We tried sending you an email but it bounced.`
        return
      }
      loader.errorMessage = error.body?.message || error.message
    }
  }

  async function redirect() {
    if (loader.state === 'success') {
      await delay(1000)
      window.location.pathname = redirectTo
    }

    if (loader.state === 'error') {
      await delay(2000)
      modal.state = 'closed'
    }
  }
</script>

<Form method="post" on:submit={submit}>
  <Input type="hidden" name="template" value={template} />

  <slot />
</Form>

{#if modal.state === 'open'}
  <Modal
    launcher={modal.launcher}
    on:escape={() => {
      modal.state = 'closed'
    }}
    on:modal:opened={() => (loader.state = 'playing')}
  >
    <ModalLoader bind:state={loader.state} on:loaded={redirect}>
      <div slot="title">Hold on while I send your message...</div>
      <div slot="error">{loader.errorMessage}</div>
    </ModalLoader>
  </Modal>
{/if}
