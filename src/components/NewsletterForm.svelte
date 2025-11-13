<script>
  import { Form, Status, TextInput } from '@splendidlabz/svelte'
  import { delay } from '@splendidlabz/utils'
  import zlFetch from 'zl-fetch'

  let status = {
    code: null,
    text: null,
  }

  async function submit(data) {
    const { response, error } = await zlFetch.post('/api/sendy/', {
      body: data,
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
  </div>
  <button class="button !pigment-red-filled" type="submit">Subscribe</button>
</Form>
<Status status={status.code}>{status.text}</Status>
