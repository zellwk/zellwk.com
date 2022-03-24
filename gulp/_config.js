const env = process.env.NODE_ENV
const isDev = env === 'development'
const isProd = env === 'production'
const isTest = env === 'test'

// TODO: Update to use rsync straight instead of gulp-rsync.
// Because WAY FASTER.

module.exports = {
  env,
  isDev,
  isProd,
  isTest,
  input: 'src',
  output: 'dist',
  scssDir: 'scss',
  jsDir: 'js',
  sync: {
    staticDest: '/var/www/zellwk.com/dist',
    secretsDest: '/var/www/zellwk.com/secrets'
  }
}
