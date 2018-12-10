import zlFetch from 'zl-fetch'
import * as zlDiscount from 'zl-discount'

export async function initDiscount ({ form, originalAmount }) {
  dc.originalAmount = originalAmount
  try {
    dc.discountCodes = await fetchDiscountCodes()
    form.addEventListener('keyup', handleDiscount)
    form.addEventListener('change', handleDiscount)
  } catch (err) {
    console.log(err)
  }
}

export function handleDiscount (evt) {
  if (evt.target.name !== 'discount') return false

  dc.form = evt.currentTarget
  dc.appliedCode = evt.target.value
  dc.messagesNode = dc.form.querySelector('.jsPaymentFormMessages')
  dc.discountMessageNode = dc.form.querySelector('.jsDiscountMessage')

  discountHandler()
    .then()
    .catch((e) => {
      console.log(e)
    })
}

function fetchDiscountCodes () {
  return zlFetch('/transfer/v3/discounts')
}

// function fetchDiscountCodes () {
//   return zlFetch('http://localhost:4000/v3/discounts')
// }

async function discountHandler () {
  if (dc.isCodeValid()) {
    dc.discount = dc.discountCodes[dc.appliedCode]
    dc.applyDiscount()
    dc.showDiscountMessage()
  } else {
    dc.clearDiscount()
    dc.hideDiscountMessage()
  }
  dc.dispatchDiscountEvent()
}

let dc = {
  isCodeValid () {
    return zlDiscount.isCodeValid(dc.discountCodes, dc.appliedCode)
  },

  applyDiscount () {
    let { discount, originalAmount } = this

    this.discountAmount = zlDiscount.getDiscountAmount(discount, originalAmount)
    this.discountedAmount = zlDiscount.getDiscountedAmount(discount, originalAmount)
  },

  // Optionally use Mutation Observer...
  // Cleaner code, no side effects,
  // but Opera mini doesn't support it
  dispatchDiscountEvent () {
    let event = new window.CustomEvent('discountApplied', {
      bubbles: false,
      detail: {
        discountedAmount: this.discountedAmount
      }
    })
    this.form.dispatchEvent(event)
  },

  clearDiscount () {
    this.discountAmount = 0
    this.discountedAmount = dc.originalAmount
  },

  showDiscountMessage () {
    this.clearMessages()

    let div = document.createElement('div')
    div.innerHTML = this.discountMessage()
    this.discountMessageNode.append(div)
    this.discountMessageNode.removeAttribute('hidden')
    this.discountMessageNode.removeAttribute('aria-hidden')
  },

  discountMessage () {
    let {
      discountAmount,
      discountedAmount
    } = this
    let m = `<p> ROCK ON! You got $${zlDiscount.renderNum(discountAmount)} off! 🤗.</p>`
    m += `<p>`
    m += `So, you're going to pay <em>$${zlDiscount.renderNum(discountedAmount)} today</em>`
    // TODO: For multiple payment type rendering
    // m += ` and <em>${zlDiscount.renderNum(discountedAmount)}/month for the next three months</em> `
    m += `! WOOHOOOO! 🎉🎉🎉.`
    m += `</p>`
    return m
  },

  hideDiscountMessage () {
    this.clearMessages()
    this.discountMessageNode.setAttribute('hidden', true)
    this.discountMessageNode.setAttribute('aria-hidden', true)
  },

  clearMessages () {
    let messages = Array.from(this.messagesNode.children)
    messages.forEach(el => {
      el.innerHTML = ''
    })
  }
}
