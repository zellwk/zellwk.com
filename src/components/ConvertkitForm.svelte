<script>
  import zlFetch, { toObject } from 'zl-fetch'
  import delay from '@zellwk/javascript/utils/delay.js'
  import Form from './Form.svelte'
  import Input from './FormInput.svelte'

  import { saveCkID } from './Convertkit'

  export let formID
  export let action
  export let redirectTo

  // States
  let loader = {
    tile: 'Hold on while I sign up you...',
  }

  // Event Listeners
  async function submit(event) {
    const { form } = event.detail
    const data = toObject(new FormData(form))
    const email = data.email

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
</script>

<div class="ConvertkitForm o-words" style="max-width: 35em">
  <slot />
  <Form
    method="post"
    on:submit={submit}
    {loader}
    {redirectTo}
    buttonText={'Send it to me'}
  >
    <Input type="text" label="First Name" name="first-name" required />
    <Input type="text" label="Email address" name="email" required />
  </Form>
</div>
