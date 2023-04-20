<script>
  import delay from '@zellwk/javascript/utils/delay.js'
  import { createEventDispatcher } from 'svelte'
  import Input from './FormInput.svelte'
  import Modal from './Modal.svelte'
  import ModalLoader from './ModalLoader.svelte'
  const dispatch = createEventDispatcher()

  export let method = 'post'
  export let buttonText = 'Send message'
  export let redirectTo

  // States
  export let modal = {}
  export let loader = {}

  const modalDefaults = {
    state: 'closed',
    launcherRef: undefined,
  }

  const loaderDefaults = {
    state: 'paused',
    title: 'Sending your message...',
    errorMessage: '',
  }

  modal = Object.assign({}, modal, modalDefaults)
  loader = Object.assign({}, loader, loaderDefaults)

  // ========================
  // Event Handlers
  // ========================
  function submit(event) {
    const form = event.target

    // Prevent spam
    // If spam is filled, don't submit
    const spamField = form.elements.spam
    if (spamField.value.trim()) return

    // Opens the modal and starts the loader
    modal.state = 'open'

    dispatch('submit', { event, form })
  }

  // Redirecting or closing the modal due to a change in the loader state
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

<!-- Form -->
<form class="Form o-words" {method} on:submit|preventDefault={submit}>
  <Input type="hidden" name="spam" />

  <div style="display: contents;">
    <slot />
  </div>

  <Input type="button" data-type="secondary" bind:elem={modal.launcherRef}
    >{buttonText}
  </Input>
</form>

<!-- Modal and Loader -->
{#if modal.state === 'open'}
  <Modal
    launcher={modal.launcherRef}
    on:escape={() => (modal.state = 'closed')}
    on:modal:opened={() => (loader.state = 'playing')}
  >
    <ModalLoader bind:state={loader.state} on:load:complete={redirect}>
      <div slot="title">{loader.title}</div>
      <div slot="error">{loader.errorMessage}</div>
    </ModalLoader>
  </Modal>
{/if}
