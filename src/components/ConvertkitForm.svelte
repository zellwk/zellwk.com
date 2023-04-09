<script>
  import { getForm } from './ConvertkitForm'
  import Modal from './Modal.svelte'
  import ModalLoader from './ModalLoader.svelte'
  import mutationObserver from '../actions/mutation-observer'
  import SvelteMarkdown from 'svelte-markdown'

  // Variables
  export let name = ''
  export let redirectTo = '/thanks' // Default to /thanks

  // States
  let modalState = 'closed' // closed, open
  let loaderState = 'paused'
  let containerRef
  let email = '' // We use this to store the email address for the lead event

  // Get the CK Form
  const { id, uid, content } = getForm(name)

  // Event handlers
  function handleMutate(event) {
    const { node, mutation, observer } = event.detail

    // Legacy CK Forms
    if (id) {
      if (mutation.target.id === 'ck_success_msg') {
        modalState = 'open'
        const form = node.querySelector('form')
        email = form.elements.email.value.trim()
        sendLeadEvent()
        observer.disconnect()
      }
      return
    }

    // Newer CK Forms
    // CK removes the <form> element from the DOM after submission so we have to grab the email value before they do so. We do this by simply listening to the submit event.
    // We don't have to "submit" the form afterwards because CK does it with JavaScript.
    if (
      mutation.type === 'attributes' &&
      mutation.attributeName === 'min-width'
    ) {
      const form = mutation.target
      form.addEventListener(
        'submit',
        event => {
          event.preventDefault()
          email = form.elements.email_address.value.trim()
        },
        { once: true }
      )
      return
    }

    // Newer CK Forms
    const successDiv = mutation.addedNodes[0]
    if (successDiv && successDiv.dataset.element === 'success') {
      modalState = 'open'
      successDiv.style.opacity = 0
      sendLeadEvent()
      observer.disconnect()
    }
  }

  let leadEventSent = false

  function sendLeadEvent(form) {
    // We only want to send this event once
    // We need this because we're detecting old CK forms with mutation observer and it sends over 2 events in quick succession. There's no way to prevent this afaik so we're mitigating it by only sending the event once.
    if (leadEventSent) return
    leadEventSent = true

    window.dataLayer.push({ event: 'generate_lead', email })
  }

  function activateLoader() {
    loaderState = 'playing'

    // We already know the form is submitted because of handleMutate. So we can just set an arbitary amount of time for the loader to finish.
    setTimeout(() => {
      loaderState = 'complete'
    }, 3000)
  }
</script>

<div
  class="CKFormContainer"
  use:mutationObserver={{
    attributes: true,
    childList: true,
    subtree: true,
  }}
  on:mutate={handleMutate}
  bind:this={containerRef}
>
  {#if id}
    <script
      async
      id={`_ck_${id}`}
      src={`https://forms.convertkit.com/${id}?v=7`}
    >
    </script>
  {/if}

  {#if uid}
    <div class="ConvertkitForm">
      <SvelteMarkdown source={content} />
      <script
        async
        data-uid={uid}
        src={`https://zellwk-com.ck.page/${uid}/index.js`}
      ></script>
    </div>
  {/if}
</div>

{#if modalState === 'open'}
  <!-- Not letting anyone escape the loader so are not using the escape event -->
  <Modal launcher={containerRef} on:modalOpened={activateLoader}>
    <ModalLoader
      bind:state={loaderState}
      on:loadingComplete={(window.location.pathname = redirectTo)}
    /></Modal
  >
{/if}
