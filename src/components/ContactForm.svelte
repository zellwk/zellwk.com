<script>
  import zlFetch, { toObject } from 'zl-fetch'
  import delay from '@zellwk/javascript/utils/delay.js'
  import Form from './Form.svelte'
  import Input from './FormInput.svelte'

  export let action
  export let redirectTo

  const loader = {
    title: 'Sending your message...',
  }

  // Event handlers
  async function submit(event) {
    const { form } = event.detail
    const data = toObject(new FormData(form))

    // Just to make sure we have a minimum delay of 2 seconds
    const promises = await Promise.all([
      zlFetch.post(action, { body: data, returnError: true }),
      delay(2000),
    ])

    const { response, error } = promises[0]

    if (response) {
      loader.state = 'playing'
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
</script>

<Form method="post" {redirectTo} on:submit={submit} {loader}>
  <Input type="hidden" name="subject" value="Hey Zell!" />
  <Input type="hidden" name="template" value="contact-form" />
  <Input type="hidden" name="send-to-self" value="true" />
  <Input type="text" name="first-name" label="First Name" required="true" />
  <Input type="email" name="email" label="Email address" required="true" />
  <Input
    type="textarea"
    name="message"
    label="Message"
    description="Let me know how I can help you :)"
    required="true"
  />
  <slot />
</Form>
