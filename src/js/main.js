import 'gsap'

import './objects/text-tab'
import './components/nav'
import './components/offsite'
import './components/emailForm'
import './components/ckForm'
import './lib/prism'

// Showing / Hiding content depending whether they are CK Subscriber
const search = new URLSearchParams(window.location.search)
const ckSubscriber = search.get('ck_subscriber_id')

// Default state: Show content for unsubscribed users
// We do this to hide content for CK Subscribers and show them something else
if (ckSubscriber) {
  const defaultContent = document.querySelectorAll('.ck-unsubcribed-content')
  const subscriberContent = document.querySelectorAll('.ck-subscriber-content')

  console.log(defaultContent)
  console.log(subscriberContent)

  defaultContent.forEach(el => {
    console.log(el)
    el.setAttribute('hidden', true)
  })
  subscriberContent.forEach(el => {
    console.log(el)
    el.removeAttribute('hidden')
  })
}
