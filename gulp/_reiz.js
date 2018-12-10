const path = require('path')
const denodeify = require('denodeify')
const glob = denodeify(require('glob'))
const mkdirp = require('mkdirp-promise')
const sharp = require('sharp')

const reiz = async ({
  inputDir,
  outputDir,
  exts = ['jpg', 'webp', 'png', 'jpeg'],
  sizes
}) => {
  const extensions = exts.join(',')
  const files = await glob(inputDir + `/**/*.{${extensions}}`)

  // Make output directories.
  // Required for Sharp, because Sharp errors if directory doesn't exist
  const directories = files.reduce((dirs, file) => {
    const dir = path.dirname(file).replace(inputDir, outputDir)
    dirs.push(dir)
    return dirs
  }, [])

  const uniqueDirs = [...(new Set(directories))]
  await Promise.all(uniqueDirs.map(async dir => mkdirp(dir)))

  // Make image sizes
  await Promise.all(files.map(async file => {
    return Promise.all(sizes.map(async size => {
      const { width } = await sharp(file).metadata()
      if (size > width) return

      const ext = path.extname(file)
      const fname = path.basename(file, ext)
      const dir = path.dirname(file).replace(inputDir, outputDir)
      const output = path.join(dir, fname + '-' + size + ext)

      return sharp(file)
        .resize(size)
        .toFile(output)
    }))
  }))
}

module.exports = reiz
