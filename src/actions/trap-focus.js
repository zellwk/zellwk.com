/* eslint-env browser */
import Focusable from '@zellwk/javascript/browser/accessibility/focusable.js'
import { tick } from 'svelte'

export default async function trapFocus(node) {
  await tick()
  node.tabIndex = -1 // Make it focusable
  node.focus() // Focus on it

  const focusables = Focusable(node)
  const { firstFocusable, lastFocusable } = focusables

  function handleKeydown(event) {
    // Dispatch Escape event to escape focus trap
    if (event.key === 'Escape') {
      node.dispatchEvent(new CustomEvent('escape'))
    }

    // Directs to first focusable
    if (
      document.activeElement === lastFocusable &&
      event.key === 'Tab' &&
      !event.shiftKey
    ) {
      event.preventDefault()
      firstFocusable.focus()
    }

    // Directs to last focusable
    if (
      document.activeElement === firstFocusable &&
      event.key === 'Tab' &&
      event.shiftKey
    ) {
      event.preventDefault()
      lastFocusable.focus()
    }
  }
  node.addEventListener('keydown', handleKeydown)

  return {
    destroy() {
      node.removeEventListener('keydown', handleKeydown)
    },
  }
}
