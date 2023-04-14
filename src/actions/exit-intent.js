/* eslint-env browser */
export default function exitIntent(node) {
  document.addEventListener('pointerout', exiting)

  function exiting(event) {
    const { toElement, relatedTarget } = event
    if (toElement === null && relatedTarget === null) {
      node.dispatchEvent(new CustomEvent('exit'))
    }
  }

  return {
    destroy() {
      document.removeEventListener('pointerout', exiting)
    },
  }
}
