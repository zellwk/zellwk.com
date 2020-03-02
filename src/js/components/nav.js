const nav = document.querySelector('.jsNavContainer')

if (nav) {
  nav.addEventListener('mouseover', e => {
    if (e.target.tagName.toLowerCase() === 'a') {
      Array.from(nav.children).forEach(node => node.classList.remove('is-active'))
    }
  })
}
