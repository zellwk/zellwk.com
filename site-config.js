export default {
  appName: 'zellwk.com',
  site: {
    title: 'Zell Liew',
    description: `I build products, coach people, and explore what sustainable work means. I bring a dev background and psychology to everything I make. Weekly updates on code, breakthroughs, and living well.`,
    url: 'https://zellwk.com',
    OGImageFallback: '',
    OGImageFallbackAlt: '',
  },
  port: getPort(),
  apiRoot: getAPIRoot(),
  syncDestination: '/var/www/zellwk.com',
}

function getPort(mode) {
  mode = mode || process.env.NODE_ENV

  if (mode === 'production') return 8080
  return 5555
}

function getAPIRoot(mode) {
  mode = mode || process.env.NODE_ENV

  if (mode === 'production') return 'https://api.zellwk.com/api/v1'
  return 'http://localhost:4000/api/v1'
}
