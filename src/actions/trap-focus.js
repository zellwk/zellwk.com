/* eslint-env browser */
import Focusable from '@zellwk/javascript/browser/accessibility/focusable.js'
import { tick } from 'svelte'

export default async function trapFocus(node, options) {
  await tick()
  node.tabIndex = -1 // Make it focusable
  node.focus() // Focus on it

  const focusables = Focusable(node)
  const { firstFocusable, lastFocusable } = focusables

  function handleKeydown(event) {
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

    // Dispatch Escape event to escape focus trap
    if (event.key === 'Escape') {
      node.dispatchEvent(new CustomEvent('escape'))
    }
  }

  // Dispatch Escape event to escape focus trap
  function clickOnModalContainer(event) {
    if (event.target === node) {
      node.dispatchEvent(new CustomEvent('escape'))
    }
  }

  node.addEventListener('click', clickOnModalContainer)
  node.addEventListener('keydown', handleKeydown)

  return {
    destroy() {
      node.removeEventListener('click', clickOnModalContainer)
      node.removeEventListener('keydown', handleKeydown)
    },
  }
}
