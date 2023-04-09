export default {
  appName: 'zellwk.com',
  siteTitle: 'Zell Liew',
  siteDescription: `Hi, I'm Zell. I write about web development and design on this blog.`,
  siteUrl: 'https://zellwk.com',

  port: getPort(),
  syncDestination: '/var/www/zellwk.com/dist',
}

function getPort(mode) {
  mode = mode || process.env.NODE_ENV

  if (mode === 'production') return 8080
  if (mode === 'development') return 5555
}
