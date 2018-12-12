const path = require('path')
const mkdirp = require('mkdirp-promise')
const sharp = require('sharp')

const denodeify = require('denodeify')
const glob = denodeify(require('glob'))
const fs = require('fs')
const fsStat = denodeify(fs.stat).bind(fs)

/**
 * Make output directories.
 * Required for Sharp, because Sharp errors if directory doesn't exist
 * @param {array} files Array of file paths
 */
const createDirectories = (files, inputDir, outputDir) => {
  const directories = files.reduce((dirs, file) => {
    const dir = path.dirname(file).replace(inputDir, outputDir)
    dirs.push(dir)
    return dirs
  }, [])

  const uniqueDirs = [...(new Set(directories))]
  return Promise.all(uniqueDirs.map(async dir => mkdirp(dir)))
}

const getOutputPaths = (file, inputDir, outputDir, sizes) => {
  const dir = path.dirname(file).replace(inputDir, outputDir)
  const ext = path.extname(file)
  const base = path.basename(file, ext)

  return sizes.map(size => {
    return path.resolve(dir, `${base}-${size}${ext}`)
  })
}

const isNewer = async (files, inputDir, outputDir, sizes) => {
  return files.filter(async file => {
    const firstOutput = getOutputPaths(file, inputDir, outputDir, sizes)[0]

    try {
      const outputStats = await fsStat(firstOutput)
      const inputStats = await fsStat(file)
      const isNew = inputStats.mtime > outputStats.mtime
      return isNew
    } catch (e) {
      // Make new file if outputStats cannot be found
      // Uhh... Must check size of too...
      return true
    }
  })
}

const reiz = async ({
  inputDir,
  outputDir,
  exts = ['jpg', 'webp', 'png', 'jpeg'],
  sizes
}) => {
  const extensions = exts.join(',')
  let files = await glob(inputDir + `/**/*.{${extensions}}`)

  await createDirectories(files, inputDir, outputDir)

  // TODO: Check if source is newer than destination
  // files = await isNewer(files, inputDir, outputDir, sizes)
  // console.log('files:', files)

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
