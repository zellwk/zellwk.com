<script>
  import { Form, Status, TextInput } from '@splendidlabz/svelte'
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
      // Send analytics information to GTM
      status.code = response.code
      status.text = response.body.message
    }

    if (error) {
      status.code = error.code
      status.text = error.body.message
    }
  }
</script>

<Form onsubmit={submit}>
  <div class="grid-simple [--cols:2]">
    <TextInput
      name="first-name"
      autocomplete="first-name"
      label="First Name"
      required
    />
    <TextInput name="email" autocomplete="email" label="Email" required />
  </div>
  <button class="button pigment-red-filled" type="submit">Subscribe</button>
</Form>

<Status status={status.code}>{status.text}</Status>
