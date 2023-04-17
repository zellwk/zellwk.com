export default {
  appName: 'zellwk.com',
  siteTitle: 'Zell Liew',
  siteDescription: `This is where I share the things I know and learned about Web Development and Web Design. `,
  siteUrl: 'https://zellwk.com',

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
