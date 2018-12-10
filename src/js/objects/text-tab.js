/* globals TweenLite Power1 location */
const activateTab = (e) => {
  if (e.target.tagName.toLowerCase() !== 'a') return false
  let a = e.target
  let tabContainer = a.parentNode.parentNode
  let siblings = tabContainer.querySelectorAll('a')
  let href = a.getAttribute('href')
  let target = document.querySelector(href)

  e.preventDefault()
  setAriaSelected(siblings, a)
  selectTab(target)
  indicateSelected(tabContainer)
}

const setAriaSelected = (siblings, node) => {
  siblings.forEach(el => el.removeAttribute('aria-selected'))
  node.setAttribute('aria-selected', true)
}

const selectTab = tab => {
  hideOtherTabs()

  tab.removeAttribute('aria-hidden')
  tab.removeAttribute('hidden')
  scrollToTab(tab)
}

const hideOtherTabs = () => {
  Array.from(document.querySelectorAll('.jsTextTabTarget'))
    .forEach(target => {
      target.setAttribute('aria-hidden', true)
      target.setAttribute('hidden', true)
    })
}

const scrollToTab = tab => {
  TweenLite.to(window, 1, {
    scrollTo: tab,
    ease: Power1.easeInOut,
    onComplete () { location.hash = `#${tab.getAttribute('id')}` }
  })
}

const indicateSelected = tabContainer => {
  tabContainer.classList.add('has-selected-tab')
}

let textTabs = Array.from(document.querySelectorAll('.jsTextTab'))
textTabs.forEach(tab => tab.addEventListener('click', activateTab))
