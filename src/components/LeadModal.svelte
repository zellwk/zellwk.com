<script>
  import Modal from './Modal.svelte'
  import ExitIntent from '../actions/exit-intent.js'
  import ScrollObserver from '../actions/scroll-observer.js'
  import localStore from '@zellwk/javascript/browser/localstore.js'
  import milliseconds from 'date-fns/milliseconds'
  import { onMount } from 'svelte'
  import {
    getCkIDFromQueryParams,
    saveCkID,
    isSubscriber,
  } from './ConvertkitForm'

  let modal = {
    state: 'closed',
    launcherRect: {},
  }

  onMount(() => {
    const id = getCkIDFromQueryParams()
    if (id) saveCkID()
  })

  // ========================
  // Event Listeners
  // ========================
  function openModal() {
    if (!shouldOpen()) return

    modal.launcherRect = {
      top: document.documentElement.clientHeight / 2,
      bottom: document.documentElement.clientHeight / 2,
      left: document.documentElement.clientWidth,
      right: document.documentElement.clientWidth,
    }

    modal.state = 'open'
  }

  function shouldOpen() {
    const ckSubscriber = isSubscriber()
    if (ckSubscriber) return false

    // Check whether the user has already seen the modal
    // If LeadModalDisplayed is true, check if LeadModalExpiry is still valid
    // If LeadModalExpiry is still valid, don't show the modal
    const LeadModalDisplayed = localStore.get('LeadModalDisplayed')
    const LeadModalExpiry = localStore.get('LeadModalExpiryTimestamp')
    if (LeadModalDisplayed && LeadModalExpiry > Date.now()) return false

    // Show the Modal and set new values
    localStore.set('LeadModalDisplayed', true)
    localStore.set(
      'LeadModalExpiryTimestamp',
      Date.now() + milliseconds({ days: 7 })
    )

    return true
  }
</script>

<svelte:document
  use:ScrollObserver={{ threshold: 0.5 }}
  on:down:threshold={openModal}
  use:ExitIntent
  on:exit={openModal}
/>

{#if modal.state === 'open'}
  <Modal
    launcherRect={modal.launcherRect}
    on:escape={() => (modal.state = 'closed')}
  >
    <slot />
  </Modal>
{/if}
