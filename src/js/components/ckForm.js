import { redirect, readyModal, LaunchModal } from './modal'

// ======================================
// # Clone CK Form for articles
// ======================================
// Default position:
//   1. .jsCkClone
//   2. Before second h2
// const getCloneLocation = element => selector => {
//   const cloneLocation = element.querySelector(selector)
//   return cloneLocation || Array.from(postContent.querySelectorAll('h2'))[2]
// }

// const beforeCloneText = (cloneLocation) => {
//   const p = document.createElement('p')
//   const text = '(Before we move on, here’s a quick signup form if you\'d like to read similar articles from me every Wednesday).'
//   p.innerHTML = cloneLocation.dataset.text || text
//   return p
// }

// const shouldClone = cloneLocation => !cloneLocation.hasAttribute('data-should-not-clone')

// const createCkClone = (ckForm, postContent) => {
//   const cloneLocation = getCloneLocation(postContent)('.jsCkClone')
//   if (!shouldClone(cloneLocation)) return false

//   const clone = ckForm.cloneNode(true)
//   postContent.insertBefore(beforeCloneText(cloneLocation), cloneLocation)
//   postContent.insertBefore(clone, cloneLocation)
// }

// const postContent = document.querySelector('.jsPostContent')
// const ckForm = document.querySelector('.jsCkForm')
// if (postContent && ckForm) createCkClone(ckForm, postContent)
// === End Clone CK Form for articles

// ======================================
// # Integrate CK Form with Modal
// ======================================
const handleCkSubmit = (e) => {
  document.dispatchEvent(readyModal)

  const form = e.target
  const button = form.querySelector('button')
  const successDiv = form.parentNode.querySelector('#ck_success_msg')

  button.dispatchEvent(LaunchModal())
  listenForSuccess(successDiv)
}

const listenForSuccess = target => {
  const observer = new window.MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName !== 'style') return
      target.setAttribute('hidden', true)
      target.setAttribute('aria-hidden', true)

      const ckForm = target.closest('.jsCkForm')
      if (ckForm.dataset.redirect) {
        redirect(ckForm.dataset.redirect)
      } else {
        redirect('/bonus')
      }
    })
  })
  observer.observe(target, { attributes: true })
}

const ckForms = Array.from(document.querySelectorAll('.jsCkForm'))
if (ckForms.length) {
  window.addEventListener('load', e => {
    ckForms.forEach(formContainer => {
      const form = formContainer.querySelector('.ck_subscribe_form')
      form.addEventListener('submit', handleCkSubmit)
    })
  })
}
// === End Integrate CK Form with Modal
