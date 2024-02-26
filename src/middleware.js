export function onRequest(context, next) {
  const { url } = context

  if (url.pathname === '/blog' || url.pathname === '/blog/') {
    return context.redirect('/blog/1', 301)
  }
  next()
}
