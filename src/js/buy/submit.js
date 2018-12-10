import zlFetch from 'zl-fetch'
import { stripe } from './stripe'
import errorMessages from './error-messages'

export default function initPaymentForm (form, card) {
  pf.form = form
  pf.card = card
  pf.discountedAmount = form.dataset.price
  pf.cardField = form.querySelector('.jsCardField')
  pf.fields = form.querySelectorAll('input[name]')
  pf.errorNode = form.querySelector('.jsErrorMessage')
  pf.button = form.querySelector('.jsFormButton')

  form.addEventListener('submit', pf.handleSubmit)
  form.addEventListener('discountApplied', pf.handleDiscounts)

  // pf.showWaitingList()
}

let pf = {
  handleSubmit (e) {
    e.preventDefault()
    pf.clearErrors()
    pf.showLoadingIndicator()
    pf.submitToServer()
      .then(d => {
        console.log(d)
        window.location.href = `/thanks-for-enrolling`
      })
      .catch(e => {
        console.log(e)
        renderError(e)
        if (e.err === 'package is full') { pf.showWaitingList() }
      })
  },

  clearErrors () {
    pf.errorNode.setAttribute('hidden', true)
    pf.errorNode.setAttribute('aria-hidden', true)
    pf.errorNode.innerHTML = ''
  },

  showLoadingIndicator () {
    let origText = pf.button.innerHTML
    pf.button.dataset.origText = origText
    pf.button.innerHTML = pf.button.dataset.loadingText
    pf.button.classList.add('is-loading')
  },

  hideLoadingIndicator () {
    pf.button.innerHTML = pf.button.dataset.origText
    pf.button.classList.remove('is-loading')
  },

  async submitToServer () {
    let token = await pf.createToken()

    // Submits to server
    return zlFetch(pf.form.getAttribute('action'), {
      method: 'post',
      body: pf.createPayload(token)
    })
  },

  async createToken () {
    if (pf.discountedAmount === 0) return false
    let { token, error } = await stripe.createToken(pf.card)
    if (error) return Promise.reject(error)
    return token
  },

  createPayload (token) {
    let detailsPayload = pf.form.dataset

    let fields = Array.from(pf.fields)
    let fieldsPayload = fields.reduce((acc, el) => {
      let value = el.value.trim()
      let name = el.getAttribute('name')
      acc[name] = encodeURIComponent(value)
      return acc
    }, {})
    let tokenPayload = token ? { stripeToken: token.id } : {}

    return Object.assign(
      {},
      detailsPayload,
      fieldsPayload,
      tokenPayload
    )
  },

  handleDiscounts (e) {
    let { discountedAmount } = e.detail
    pf.discountedAmount = discountedAmount
    if (discountedAmount === 0) {
      pf.hideCardField()
    } else {
      pf.showCardField()
    }
  },

  hideCardField () {
    pf.cardField.setAttribute('hidden', true)
    pf.cardField.setAttribute('aria-hidden', true)
  },

  showCardField () {
    pf.cardField.removeAttribute('hidden')
    pf.cardField.removeAttribute('aria-hidden')
  },

  hideElement (el) {
    el.setAttribute('hidden', true)
    el.setAttribute('aria-hidden', true)
  },

  showWaitingList () {
    // Repurpose form to waiting list
    pf.form.dataset.tagName = 'waiting list – css grid'
    pf.form.setAttribute('action', 'transfer/v3/waiting-list')
    pf.button.innerHTML = 'Add me to the waiting list'
    pf.button.dataset.loadingText = 'Adding to waiting list…'

    pf.form.removeEventListener('submit', pf.handleSubmit)
    pf.form.addEventListener('submit', pf.submitWaitingList)

    // hides other fields
    Array.from(pf.form.children).forEach(el => {
      if (el.tagName.toLowerCase() !== 'button' && !el.classList.contains('jsPaymentFormMessages')) {
        pf.hideElement(el)
      }
    })

    // Hides last words
    this.hideElement(pf.form.nextElementSibling)

    // Renders Error message
    renderError({ code: 'package is full' })
  },

  submitWaitingList (e) {
    e.preventDefault()

    zlFetch('transfer/v3/waiting-list', {
      method: 'post',
      body: pf.createPayload()
    })
      .then(r => {
        console.log(r)
        window.location.href = `/thanks/waiting-list`
      })
      .catch(e => {
        console.log(e)
        renderError(e)
      })
  }
}

function renderError (error) {
  let { code, err } = error
  let message = errorMessages[code] || errorMessages[err] || errorMessages['default']

  pf.hideLoadingIndicator()
  pf.errorNode.innerHTML = message
  pf.errorNode.removeAttribute('hidden')
  pf.errorNode.removeAttribute('aria-hidden')
}
