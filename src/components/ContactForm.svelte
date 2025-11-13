<script>
  import {
    Form,
    Select,
    Status,
    TextInput,
    Textarea,
  } from '@splendidlabz/svelte'
  import { wait } from '@splendidlabz/utils'
  import { createZlFetch } from 'zl-fetch'

  const f = createZlFetch('/api/contact/', { returnError: true })

  let status = $state({})
  let about = $state('')

  async function onsubmit(data) {
    const { name, email, message } = data
    let { subject = 'Contact Zell' } = data

    if (data.hp.trim()) return

    status = {
      status: 'info',
      message: 'Sending your message',
    }

    // Update Email Subject
    switch (about) {
      case 'Question':
        subject = 'Question for Zell'
        break
      case 'Feedback':
        subject = 'Feedback for Zell'
        break
      case 'Report a bug':
        subject = 'Report a bug to Zell'
        break
    }

    const { response, error } = await f.post({
      body: {
        template: 'Contact',
        name,
        email,
        message,
        subject,
      },
    })

    if (response) {
      status.status = 'success'
      status.message = response.body.message

      // Ensures people have sufficient time to read the status message before they are redirected.
      await wait(2000)
      window.location.href = '/contact/thanks/'
    }

    if (error) {
      status.status = 'error'
      status.message = error.body.message
    }
  }
</script>

<Form class="vertical" {onsubmit}>
  <div class="grid-simple bp5:[--cols:2]">
    <TextInput name="name" label="Your Name" required />
    <TextInput name="email" label="Your Email Address" required type="email" />
  </div>

  <Select
    name="about"
    items={['Question', 'Feedback', 'Report a bug', 'Others']}
    label="What's your message about?"
    bind:selected={about}
  />

  {#if about.toLowerCase() === 'others'}
    <TextInput name="subject" label="Subject" />
  {/if}

  <Textarea
    name="message"
    hint="Feel free to write your message in markdown"
    label="Your Message "
    required
    type="textarea"
  />
  <button class="button pigment-purple-filled"> Send message </button>
</Form>

<Status status={status?.status}>{status?.message || ''}</Status>
