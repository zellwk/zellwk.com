<script>
  import zlFetch, { toObject } from 'zl-fetch'

  import delay from '@zellwk/javascript/utils/delay.js'
  import { saveCkID } from './Convertkit'

  import Form from './Form.svelte'
  import Input from './FormInput.svelte'

  export let action
  export let redirectTo
  export let numFree

  console.log(redirectTo)

  let loader = {
    state: 'paused',
    title: `Sending you ${numFree} chapters...`,
  }

  // Event Listeners
  async function submit(event) {
    const { form } = event.detail
    const data = toObject(new FormData(form))
    const email = data.email

    // Just to make sure we have a minimum delay of 2 seconds
    const promises = await Promise.all([
      zlFetch.post(action, {
        body: { ...data },
        returnError: true,
      }),
      delay(2000),
    ])

    const { response, error } = promises[0]

    // Check what happened here too
    if (response) {
      const { subscription } = response.body
      const subscriberID = subscription.subscriber.id
      saveCkID(subscriberID)

      // Send analytics information to GTM
      window.dataLayer.push({
        event: 'generate_lead',
        email,
      })
      loader.state = 'success'
    }

    if (error) {
      loader.state = 'error'
      loader.errorMessage = error.body.message
    }
  }
</script>

<div class="ConvertkitForm o-words" style="max-width: 35em">
  <Form
    method="post"
    buttonText={`Send me the ${numFree} free chapters`}
    {redirectTo}
    on:submit={submit}
    {loader}
  >
    <slot />
    <Input type="text" label="First Name" name="first-name" required />
    <Input type="email" label="Email address" name="email" required />
  </Form>
</div>
