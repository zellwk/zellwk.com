/* eslint-env browser */

/**
 * Scroll Observer
 * @param {Number} threshold Float between 0 to 1. When to fire a threshold event.
 * @param {Number} tolerance Float between 0 to 1. Tolerance for event firing.
 */
export default function scrollObserver(
  node,
  {
    threshold = 0, // Float between 0 to 1.
    tolerance = 0.1, // Float between 0 to 1. Tolerance for event firing
  } = {}
) {
  let prevScrollTop = 0

  function observe(event) {
    const { documentElement } = document
    const scrollTop = documentElement.scrollTop
    const scrollDirection = scrollTop > prevScrollTop ? 'down' : 'up'
    const scrollPercent =
      scrollTop / (documentElement.scrollHeight - documentElement.clientHeight)

    if (scrollDirection === 'down') {
      node.dispatchEvent(new CustomEvent('scrolldown'))
    }

    if (scrollDirection === 'up') {
      node.dispatchEvent(new CustomEvent('scrollUp'))
    }

    if (scrollPercent > threshold && scrollPercent < threshold + tolerance) {
      node.dispatchEvent(new CustomEvent(`${scrollDirection}:threshold`))
    }

    prevScrollTop = scrollTop
  }

  node.addEventListener('scroll', observe)

  return {
    destroy() {
      node.removeEventListener('scroll', observe)
    },
  }
}
