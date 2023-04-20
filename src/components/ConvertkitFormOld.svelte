<script>
  import Modal from './Modal.svelte'
  import ModalLoader from './ModalLoader.svelte'
  import mutationObserver from '../actions/mutation-observer'
  import SvelteMarkdown from 'svelte-markdown'

  // Variables
  export let name
  export let redirectTo = '/thanks' // Default to /thanks. Redirection feature not integrated into posts yet.

  // States
  let modalState = 'closed' // closed, open
  let loaderState = 'paused'
  let containerRef
  let email = '' // We use this to store the email address for the lead event

  // Get the CK Form
  // const {uid, content } = getForm(name)

  // Event handlers
  function handleMutate(event) {
    const { mutation, observer } = event.detail

    // CK removes the <form> element from the DOM after submission so we have to grab the email value before they do so.
    // We do this by simply listening to the submit event.
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

    const successDiv = mutation.addedNodes[0]
    if (successDiv && successDiv.dataset.element === 'success') {
      modalState = 'open'
      successDiv.style.opacity = 0
      window.dataLayer.push({ event: 'generate_lead', email })
      observer.disconnect()
    }
  }

  function activateLoader() {
    loaderState = 'playing'

    // We already know the form is submitted because of handleMutate. So we can just set an arbitary amount of time for the loader to finish.
    setTimeout(() => {
      loaderState = 'success'
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
  {#if uid}
    <div class="ConvertkitForm o-content">
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
  <Modal launcher={containerRef} on:modal:opened={activateLoader}>
    <ModalLoader
      bind:state={loaderState}
      on:load:complete={(window.location.pathname = redirectTo)}
    /></Modal
  >
{/if}
