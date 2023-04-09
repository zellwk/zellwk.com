/* eslint-env browser */
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe
export default function mutationObserver(node, options) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      // Emit a custom event for each mutation
      node.dispatchEvent(
        new CustomEvent('mutate', {
          detail: { node, mutation, observer },
        })
      )
    })
  })

  observer.observe(node, options)

  return {
    destroy() {
      observer.disconnect()
    },
  }
}
