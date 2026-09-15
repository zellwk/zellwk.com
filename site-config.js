export default {
  appName: 'zellwk.com',
  site: {
    title: 'Zell Liew',
    description: `I build AI and automation systems that make businesses easier to run, plus tools and courses for developers like Splendid Labz, Practical Astro and Unorthodox Tailwind.`,
    url: 'https://zellwk.com',
    OGImageFallback: '/og/fallback.png',
    OGImageFallbackAlt: 'Zell Liew',
    twitterHandle: '@zellwk',
    siteHandle: '@zellwk',
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
