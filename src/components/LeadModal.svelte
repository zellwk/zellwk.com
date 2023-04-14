<script>
  import Modal from './Modal.svelte'
  import ExitIntent from '../actions/exit-intent.js'
  import ScrollObserver from '../actions/scroll-observer.js'
  import localStore from '@zellwk/javascript/browser/localstore.js'
  import milliseconds from 'date-fns/milliseconds'
  import { onMount } from 'svelte'

  let modalState = 'closed'
  let launcherRect = {}

  onMount(() => {
    saveCkID()
  })

  // ========================
  // Event Listeners
  // ========================
  function shouldOpen() {
    const ckSubscriber = isCkSubscriber()
    // if (ckSubscriber) return false

    // // Check whether the user has already seen the modal
    // // If LeadModalDisplayed is true, check if LeadModalExpiry is still valid
    // // If LeadModalExpiry is still valid, don't show the modal
    // const LeadModalDisplayed = localStore.get('LeadModalDisplayed')
    // const LeadModalExpiry = localStore.get('LeadModalExpiryTimestamp')
    // if (LeadModalDisplayed && LeadModalExpiry > Date.now()) return false

    // // Show the Modal and set new values
    // localStore.set('LeadModalDisplayed', true)
    // localStore.set(
    //   'LeadModalExpiryTimestamp',
    //   Date.now() + milliseconds({ days: 7 })
    // )

    launcherRect = {
      top: document.documentElement.clientHeight / 2,
      bottom: document.documentElement.clientHeight / 2,
      left: document.documentElement.clientWidth,
      right: document.documentElement.clientWidth,
    }

    modalState = 'open'
  }

  // ========================
  // Helper Functions
  // ========================
  function saveCkID() {
    const searchParams = new URLSearchParams(window.location.search)
    const ckID = searchParams.get('ck_subscriber_id')

    if (ckID) {
      localStore.set('ckSubscriberID', ckID)
    }
  }

  // TODO: Need an option to check whether the user is still an active subscriber.
  function isCkSubscriber() {
    return localStore.get('ckSubscriberID')
  }
</script>

<svelte:document
  use:ScrollObserver={{ threshold: 0.5 }}
  on:down:threshold={shouldOpen}
  use:ExitIntent
  on:exit={shouldOpen}
/>

<!-- TODO: Need to handle LauncherRef -->
{#if modalState === 'open'}
  <Modal {launcherRect} on:escape={() => (modalState = 'closed')}
    ><slot /></Modal
  >
{/if}
