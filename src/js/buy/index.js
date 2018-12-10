import { initStripeCard } from './stripe'
import { initDiscount } from './discounts'
import initPaymentForm from './submit'
let stripeForm = document.querySelector('.jsStripeForm')

// Initializes Form with discount
if (stripeForm) {
  let card = initStripeCard(stripeForm, '#card')
  initPaymentForm(stripeForm, card)
  initDiscount({
    form: stripeForm,
    originalAmount: stripeForm.dataset.price
  })
}
