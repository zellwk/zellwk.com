<script>
  import zlFetch, { toObject } from 'zl-fetch'
  import delay from '@zellwk/javascript/utils/delay.js'
  import { saveCkID } from './ConvertkitForm'

  import Modal from './Modal.svelte'
  import Loader from './ModalLoader.svelte'
  import Form from './Form.svelte'
  import Input from './FormInput.svelte'

  export let redirectTo
  export let action
  export let formID

  // States
  let modal = {
    state: 'closed',
    launcher: undefined,
  }
  let loader = {
    state: 'paused',
    errorMessage: '',
  }

  // Event Listeners
  async function submit(event) {
    const { form } = event.detail
    const data = toObject(new FormData(form))
    const email = data.email

    modal.state = 'open'
    loader.state = 'playing'

    // Just to make sure we have a minimum delay of 2 seconds
    const promises = await Promise.all([
      zlFetch.post(action, { body: { ...data, formID }, returnError: true }),
      delay(2000),
    ])

    const { response, error } = promises[0]

    if (response) {
      const subscriberID = response.body.subscriber.id
      saveCkID(subscriberID)

      // Send analytics information to GTM
      window.dataLayer.push({ event: 'generate_lead', email })
      loader.state = 'success'
    }

    if (error) {
      loader.state = 'error'
      loader.errorMessage = error.body.message
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

<div class="ConvertkitForm o-words" style="max-width: 35em">
  <slot />
  <Form method="post" on:submit={submit}>
    <Input type="text" label="First Name" name="first-name" required />
    <Input type="text" label="Email address" name="email" required />
    <Input
      type="button"
      class="button"
      data-type="secondary"
      bind:elem={modal.launcher}>Send it to me</Input
    >
  </Form>
</div>

{#if modal.state === 'open'}
  <Modal launcher={modal.launcher}>
    <Loader bind:state={loader.state} on:loaded={redirect}>
      <div slot="error">{loader.errorMessage}</div></Loader
    >
  </Modal>
{/if}
