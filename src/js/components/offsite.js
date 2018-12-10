import { delay } from '../utils'

// ======================================
// # Offsite Factory
// ======================================

const Offsite = () => {
  return {
    body: document.body,
    container: document.querySelector('.jsOffsiteContainer'),
    listeners: {
      // The following listeners will be added here in this.launch
      // close: this.close.bind(this),
    },

    launch () {
      // Open offsite
      this.body.classList.add('has-opened-offsite')
      this.container.classList.add('is-open')

      // Adds close event listeners
      this.listeners.close = this.close.bind(this)

      this.container.addEventListener('click', this.listeners.close)
      document.addEventListener('keyup', this.listeners.close)
    },

    close (e) {
      let shouldClose = this.shouldClose(e)

      if (!shouldClose) return false

      // Remove event listeners
      this.removeEventListeners(e)

      // Close offsite
      this.body.classList.remove('has-opened-offsite')
      this.container.classList.remove('is-open')
      this.container.classList.add('is-closing')

      delay(300).then(r => this.container.classList.remove('is-closing'))
    },

    shouldClose (e) {
      let { type, code: key } = e

      if (type === 'click') return true
      if (key === 'Escape') return true

      return false
    },

    removeEventListeners (e) {
      this.container.removeEventListener('click', this.listeners.close)
      document.removeEventListener('keyup', this.listeners.close)
    }
  }
}

// === End Offsite Factory

const offsite = Offsite()
let offsiteLauncher = document.querySelector('.jsOffsiteLauncher')

if (offsiteLauncher) offsiteLauncher.addEventListener('click', e => offsite.launch(e))
