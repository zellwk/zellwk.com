/* global TimelineMax Power3 */
import { startLoader, stopLoader } from '../objects/loader'
import { event, eventWithDetail, bubblingEventWithDetail } from '../utils/events'

// Modal Factory
const Modal = () => {
  let body = document.body
  let modalContainer = document.querySelector('.jsModalContainer')
  let modal = modalContainer.querySelector('.jsModal')

  return {
    body: body,
    modal: modal,
    modalContainer: modalContainer,
    titleText: modal.querySelector('.jsModalTitle'),
    successText: modal.querySelector('.jsModalSuccessText'),

    // The following listeners will be added upon launch:
    // 1. redirect
    // 2. close
    listeners: {},

    ready () {
      this.modal.style.willChange = 'top, left, width, height'
    },

    setText ({ titleText, successText }) {
      if (titleText) this.titleText.innerHTML = titleText
      if (successText) this.successText.innerHTML = successText
    },

    // =========================
    // Methods for showing modal
    // =========================
    launch (launcher) {
      this.launcher = launcher

      // Show content
      this.show()

      // Add event listeners
      this.addEventListeners()
    },

    show () {
      // prework
      this.setContentOpenedPos()
      this.setLauncherPos()
      this.prepCSS()

      this.animateIn()
    },

    setContentOpenedPos () {
      this.openedPos = this.modal.getBoundingClientRect()
    },

    setLauncherPos () {
      this.launcherPos = this.launcher.getBoundingClientRect()
    },

    prepCSS () {
      let { launcherPos, modal } = this
      modal.style.position = 'absolute'
      modal.style.top = `${launcherPos.top}px`
      modal.style.left = `${launcherPos.left}px`
      modal.style.width = `${launcherPos.width}px`
      modal.style.height = `${launcherPos.height}px`
    },

    animateIn () {
      let { modal, openedPos } = this

      this.modal.classList.add('is-animating')
      this.modalContainer.classList.add('is-open')
      body.classList.add('has-opened-modal')

      let tl = new TimelineMax({
        onComplete: () => {
          this.modal.classList.remove('is-animating')
          this.startLoader()
        }
      })

      tl.to(modal, 0.5, {
        left: openedPos.left,
        width: openedPos.width,
        ease: Power3.easeInOut
      })
      tl.to(modal, 0.5, {
        top: openedPos.top,
        height: openedPos.height,
        ease: Power3.easeOut
      })
    },

    startLoader () {
      document.dispatchEvent(startLoader)
    },

    addEventListeners (e) {
      this.listeners.redirect = this.redirect.bind(this)
      this.listeners.close = this.close.bind(this)

      document.addEventListener('modalRedirect', this.listeners.redirect)
      document.addEventListener('closeModal', this.listeners.close)
    },

    // =========================
    // Methods for closing modal
    // =========================

    close (e) {
      let { modal, launcherPos, modalContainer, revertCSS } = this
      document.removeEventListener('closeModal', this.listeners.close)

      modal.classList.add('is-animating')

      let tl = new TimelineMax({})
      tl.to(modal, 0.5, {
        top: launcherPos.top,
        height: launcherPos.height,
        ease: Power3.easeInOut
      }, 0.25)
      tl.to(modal, 0.5, {
        left: launcherPos.left,
        width: launcherPos.width,
        ease: Power3.easeInOut
      })
      tl.add(() => {
        modalContainer.classList.remove('is-open')
        modalContainer.classList.add('is-closing')
        body.classList.remove('has-opened-modal')
      })
      tl.add(() => {
        modal.classList.remove('is-animating')
        modalContainer.classList.remove('is-closing')
        revertCSS()
      }, '+=1')
    },

    revertCSS () {
      let { modal } = this

      this.modal.style.position = 'relative'
      modal.style.top = 0
      modal.style.left = 0
      modal.style.width = 'auto'
      modal.style.height = 'auto'
      modal.style.willChange = 'auto'
    },

    // redirect
    // ==========
    redirect (e) {
      const { url } = e.detail
      document.removeEventListener('modalRedirect', this.listeners.redirect)

      window.location.href = url.includes('http')
        ? url
        : `${window.location.origin}${url}`
    }
  }
}

// ======================================
// # Initiate Modal
// ======================================

let modal = Modal()

// === End Initiate Modal

// ======================================
// # Create Modal Events
// ======================================

export const readyModal = event('readyModal')
export const LaunchModal = (detail = {}) => bubblingEventWithDetail('launchModal')(detail)
export const ModalRedirect = detail => eventWithDetail('modalRedirect')(detail)
export const CloseModal = detail => eventWithDetail('closeModal')(detail)

// === End Create Modal Events

// ======================================
// # Permanent Modal Events
// ======================================
document.addEventListener('readyModal', e => modal.ready())

document.addEventListener('launchModal', e => {
  let { titleText = '', successText = '' } = e.detail
  modal.setText({ titleText, successText })
  modal.launch(e.target)
})
// === Permanent Modal Events

// ======================================
// # Exposed Modal functions
// ======================================

export const redirect = (url) => {
  let modalRedirect = ModalRedirect({ url })

  const dispatchRedirect = _ => {
    document.removeEventListener('loaderStopped', dispatchRedirect)
    document.dispatchEvent(modalRedirect)
  }

  document.addEventListener('loaderStopped', dispatchRedirect)
  setTimeout(() => document.dispatchEvent(stopLoader), 2000)
}

// === End Exposed Modal functions
