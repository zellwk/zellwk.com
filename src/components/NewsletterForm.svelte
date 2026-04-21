<script>
  import { Form, Status, TextInput } from '@splendidlabz/svelte'
  import { delay, omitEmpty } from '@splendidlabz/utils'
  import zlFetch from 'zl-fetch'

  /** @type {{ list: string, children?: import('svelte').Snippet }} */

  const { list, redirect = '/newsletter/confirm/', children } = $props()

  let status = {
    code: null,
    text: null,
  }

  async function submit(data) {
    const { response, error } = await zlFetch.post('/api/sendy/', {
      body: omitEmpty({ ...data, list }),
      returnError: true,
    })

    if (response) {
      status.code = response.status
      status.text = response.body.message
      await delay(500)
      window.location.href = '/newsletter/confirm/'
    }

    if (error) {
      status.code = error.status
      status.text = error.body.message
    }
  }
</script>

<Form
  class="vertical newsletter-form"
  honeypotName="last-name"
  onsubmit={submit}
>
  <div class="grid-simple bp8:[--cols:2]">
    <TextInput name="name" autocomplete="name" label="First Name" required />
    <TextInput name="email" autocomplete="email" label="Email" required />
    {@render children?.()}
  </div>
  <button class="button !pigment-red-filled" type="submit">Subscribe</button>
</Form>
<Status status={status.code}>{status.text}</Status>
