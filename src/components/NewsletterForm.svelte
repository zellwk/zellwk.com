<script>
  import { Form, HiddenInput, TextInput } from '@splendidlabz/svelte'
  import zlFetch from 'zl-fetch'

  /**
   * @typedef {object} Props
   * @property {string} [list] Sendy list key
   * @property {string} [redirect] Page after subscribing
   */

  /** @type {Props} */
  let { list = 'main', redirect = '/newsletter/confirm/' } = $props()

  let status = $state('info')
  let statusText = $state('')
  let isSubmitting = $state(false)

  /**
   * subscribe
   * Signs the person up, then sends them to the next page.
   *
   * @param {Record<string, string>} data Form fields
   */
  async function subscribe(data) {
    isSubmitting = true
    status = 'info'
    statusText = 'Subscribing you…'

    try {
      // Fetches a token that proves a browser sent this
      const tokenResponse = await zlFetch('/api/form-token/')

      // Sends the sign-up with its token
      const response = await zlFetch.post('/api/sendy/', {
        body: { ...data, token: tokenResponse.body.token },
      })
      window.location.href = response.body.redirect
    } catch (error) {
      // Shows the server's reason, or a notice when it never answered
      status = 'error'
      statusText =
        error.body?.message ||
        "Couldn't reach the server. Check your connection, then try again."
      isSubmitting = false
    }
  }
</script>

<Form
  class="vertical newsletter-form"
  action="/api/sendy/"
  honeypotDuration={1000}
  honeypotName="phone"
  onsubmit={subscribe}
  {status}
  {statusText}
>
  <HiddenInput name="list" value={list} />
  <HiddenInput name="redirect" value={redirect} />
  <div class="grid-simple bp8:[--cols:2]">
    <TextInput name="name" autocomplete="name" label="First Name" required />
    <TextInput
      name="email"
      autocomplete="email"
      label="Email"
      required
      type="email"
    />
  </div>
  <button
    class="button !pigment-red-filled"
    disabled={isSubmitting}
    type="submit">Subscribe</button
  >
</Form>
