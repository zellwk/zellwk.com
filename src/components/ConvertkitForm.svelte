<script>
  import zlFetch, { toObject } from 'zl-fetch'
  import Input from './FormInput.svelte'
  import Form from './Form.svelte'
  import {delay} from '@splendidlabz/utils'

  const loader = {
    tile: 'Hold on while I sign up you...',
  }

  // Event Listeners
  async function submit(event) {
    const { form } = event.detail
    const data = toObject(new FormData(form))
    const email = data.email

    await delay(2000)

    // Just to make sure we have a minimum delay of 2 seconds
    const { response, error } = await zlFetch.post('/api/sendy', {
      body: data,
      returnError: true,
    })

    if (response) {
      loader.state = 'success'
      // Send analytics information to GTM
      window.dataLayer.push({ event: 'generate_lead', email })
    }

    if (error) {
      loader.state = 'error'
      loader.errorMessage = error.body.message
    }
  }
</script>

<div class="ConvertkitForm o-words" style="max-width: 35em">
  <!-- <h2>Learn To Up Your Development Game</h2> -->
  <p>
    I build web products, and share what I'm learning — about code, building
    businesses, and living well.
  </p>
  <p>
    Follow along in my journey and get technical content, product updates,
    thoughts about living well, and more.
  </p>

  <Form
    class="ConvertkitForm o-words"
    on:submit={submit}
    {loader}
    redirectTo="/newsletter/confirm"
    buttonText="Join the journey"
  >
    <Input type="text" label="First Name" name="name" required />
    <Input type="text" label="Email address" name="email" required />
  </Form>
</div>
