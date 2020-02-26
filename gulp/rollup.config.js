const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('rollup-plugin-babel')
const replace = require('@rollup/plugin-replace')
const { terser } = require('rollup-plugin-terser')

const inputOptions = {
  input: 'src/js/main.js',
  plugins: [
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
      runtimeHelpers: true,
      babelrc: false,
      presets: [['@babel/env']],
      plugins: ['@babel/plugin-transform-runtime']
    }),
    terser()
  ]
}

const outputs = [
  { file: 'dist/js/main.mjs', format: 'esm' },
  { file: 'dist/js/main-legacy.js', format: 'iife' }
]

const outputOptions = outputs.map(output => {
  return {
    ...output,
    sourcemap: true,
    plugins: [terser()]
  }
})

const watchOptions = {
  ...inputOptions,
  output: outputOptions,
  watch: {
    chokidar: false,
    include: 'src/js/**/*'
  }
}

module.exports = {
  inputOptions,
  outputOptions,
  watchOptions
}
