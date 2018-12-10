/* globals Stripe */
const STRIPE_TEST_PUBLISHABLE_KEY = 'pk_test_Ruj9IxHz6zaSUtdrlgPibKXJ'
const STRIPE_LIVE_PUBLISHABLE_KEY = 'pk_live_90KMgLTL7U9JjkS6L6wkQ1lz'

// Automatically switching keys.
// Ideally should use Webpack to inject variables, but it doesn't seem
// to work when using webpack stream. Temp solution till I switch to another
// static site gen.
const isDev = window.location.host.includes('localhost')
const stripePublishableKey = (isDev) ? STRIPE_TEST_PUBLISHABLE_KEY : STRIPE_LIVE_PUBLISHABLE_KEY

export const stripe = Stripe(stripePublishableKey)

export function initStripeCard (form, cardId) {
  const elements = stripe.elements()
  let ctrlInputElem = form.querySelector('input')
  let style = getStyle(ctrlInputElem)

  let card = elements.create('card', { style })
  card.mount(cardId)
  return card
}

function getStyle (elem) {
  let {
    fontSize,
    lineHeight,
    fontFamily
  } = window.getComputedStyle(elem)
  let style = {
    base: {
      fontFamily,
      fontSize,
      lineHeight
    }
  }
  return style
}
