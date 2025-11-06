window.twttr = (function (d, s, id) {
  let js
  const fjs = d.getElementsByTagName(s)[0]
  const t = window.twttr || {}
  if (d.getElementById(id)) return t
  js = d.createElement(s)
  js.id = id
  js.src = 'https://platform.twitter.com/widgets.js'
  fjs.parentNode.insertBefore(js, fjs)

  t._e = []
  t.ready = function (f) {
    t._e.push(f)
  }

  return t
})(document, 'script', 'twitter-wjs')
