const rollup = require('rollup')
const { reload } = require('./browser-sync')
const {
  inputOptions,
  outputOptions,
  watchOptions
} = require('./rollup.config')

async function watch () {
  const watcher = rollup.watch(watchOptions)

  watcher.on('event', event => {
    if (event.code === 'ERROR') return console.log(event)
    if (event.code === 'END') {
      return reload()
    }
  })
}

async function build () {
  const bundle = await rollup.rollup(inputOptions)

  const outputs = outputOptions.map(opt => bundle.write(opt))
  await Promise.all(outputs)
}

module.exports = {
  jsDevelopment: watch,
  jsProduction: build
}
