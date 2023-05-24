<script>
  import Modal from './Modal.svelte'
  // import ExitIntent from '../actions/exit-intent.js'
  import ScrollObserver from '../actions/scroll-observer.js'
  import localStore from '@zellwk/javascript/browser/localstore.js'
  import milliseconds from 'date-fns/milliseconds'
  import { onMount } from 'svelte'
  import {
    getCkIDFromQueryParams,
    saveCkID,
    isSubscriber,
  } from './Convertkit.js'

  let modal = {
    state: 'closed',
    launcherRect: {},
  }

  onMount(() => {
    const id = getCkIDFromQueryParams()
    if (id) saveCkID()
  })

  function openModal() {
    if (isSubscriber()) return false

    modal.launcherRect = {
      top: document.documentElement.clientHeight / 2,
      bottom: document.documentElement.clientHeight / 2,
      left: document.documentElement.clientWidth,
      right: document.documentElement.clientWidth,
    }

    modal.state = 'open'
  }

  // ========================
  // Event Listeners
  // ========================
  // Check whether the user has already seen the modal on scroll.
  // If displayed before, check if the expiry is still valid.
  // If expiry timestamp is still valid, don't show the modal
  function scrollCheck() {
    // LMSE = Lead Modal on Scroll Expiry Timestamp
    const expiry = localStore.get('LMSE')
    if (expiry > Date.now()) return false

    localStore.set('LMSE', Date.now() + milliseconds({ days: 7 }))
    openModal()
  }

  // Check whether the user has already seen the modal on exit intent.
  // If displayed before, check if the expiry is still valid.
  // If expiry timestamp is still valid, don't show the modal
  // function exitCheck() {
  //   // LMEE = Lead Modal on Exit Expiry Timestamp
  //   const expiry = localStore.get('LMEE')
  //   if (expiry > Date.now()) return false

  //   localStore.set('LMEE', Date.now() + milliseconds({ days: 7 }))
  //   openModal()
  // }
</script>

<svelte:document
  use:ScrollObserver={{ threshold: 0.5 }}
  on:down:threshold={scrollCheck}
/>
<!-- use:ExitIntent
  on:exit={exitCheck} -->

{#if modal.state === 'open'}
  <Modal
    launcherRect={modal.launcherRect}
    closeable={true}
    on:escape={() => (modal.state = 'closed')}
  >
    <slot />
  </Modal>
{/if}
