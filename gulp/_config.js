const env = process.env.NODE_ENV
const isDev = env === 'development'
const isProd = env === 'production'
const isTest = env === 'test'

module.exports = {
  env,
  isDev,
  isProd,
  isTest,
  input: 'src',
  output: 'dist',
  scssDir: 'scss',
  jsDir: 'js',
  imageSizes: [400, 900, 1300]
}
