/* globals TweenLite Power1 location */
const activateTab = (e) => {
  if (e.target.tagName.toLowerCase() !== 'a') return false
  const a = e.target
  const tabContainer = a.parentNode.parentNode
  const siblings = tabContainer.querySelectorAll('a')
  const href = a.getAttribute('href')
  const target = document.querySelector(href)

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
  // TweenLite.to(window, 1, {
  //   scrollTo: tab,
  //   ease: Power1.easeInOut,
  //   onComplete () { location.hash = `#${tab.getAttribute('id')}` }
  // })
}

const indicateSelected = tabContainer => {
  tabContainer.classList.add('has-selected-tab')
}

const textTabs = Array.from(document.querySelectorAll('.jsTextTab'))
textTabs.forEach(tab => tab.addEventListener('click', activateTab))
