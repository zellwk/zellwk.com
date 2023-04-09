import gulp from 'gulp'
import fs from 'fs-extra'
import glob from 'glob-promise'
import archiver from 'archiver'

const paths = {
  input: 'source-code',
  outputDir: 'public',
  temp: '.temp'
}

export function zipSourceCodeWatcher () {
  gulp.watch(paths.input + '/**/*', zipSourceCode)
}

// Check stats for each file
// Determine whether to copy or not
// If yes, copy. If not, don't copy
// Remove node_modules, certs, .env from each copied folder
// Zip up each folder
// Then put into public folder for user to download
export default async function zipSourceCode () {
  let sourceCodeFolders = await glob(paths.input + '/*/*')

  const filesToCreate = await getFilesToCreate(sourceCodeFolders)

  console.log(`Creating ${filesToCreate.length} files`)

  await Promise.all(
    filesToCreate.map(async file => {
      await clone(file)
      await fs.mkdirp(`${paths.outputDir}/${file.dir}`)
      await zipFile(file)
    })
  )
  await fs.remove(`${paths.temp}`)
}

async function zipFile (file) {
  const tempPath = `${paths.temp}/${file.path}`
  const outputPath = `${paths.outputDir}/${file.path}.zip`

  const output = fs.createWriteStream(outputPath)
  const archive = archiver('zip', { zlib: { level: 9 } })

  archive.pipe(output)
  archive.directory(tempPath, `${file.name}`)
  archive.finalize()

  // wraps resolve and reject to let the stream end
  return new Promise((resolve, reject) => {
    output.on('close', function () {
      console.log(`Zipped ${tempPath} — ${archive.pointer()} total bytes`)
      resolve()
    })

    output.on('end', function () {
      console.log('Data has been drained')
    })

    archive.on('warning', function (err) {
      if (err.code !== 'ENOENT') return reject(err)
    })

    archive.on('error', function (err) {
      reject(err)
    })
  })
}

async function getFilesToCreate (files) {
  files = await Promise.all(
    files.map(async file => {
      const inputPath = file
      const outputPath = `${paths.outputDir}/${file}`
      const shouldCreate = await shouldCreateFile(file, outputPath)

      const array = file.split('/')
      const name = array.pop()
      const dir = array.join('/')

      if (!shouldCreate) return
      return {
        name: name,
        dir: dir,
        path: inputPath
      }
    })
  )
  files = files.filter(file => file !== undefined)
  return files
}

// TODO: Make this work... because need to do recursive folder check for inputStats...
async function shouldCreateFile (inputPath, outputPath) {
  let files = await glob(`${inputPath}/**/*`, {
    ignore: ['**/node_modules/**']
  })

  const stats = await Promise.all(files.map(async file => fs.stat(file)))
  const lastModified = stats.map(stat => stat.mtimeMs).sort((a, b) => b - a)[0]
  let outputStats

  try {
    outputStats = await fs.stat(outputPath + '.zip')
  } catch (error) {}

  if (!outputStats) return true

  if (lastModified > outputStats.mtimeMs) return true
  return false
}

async function clone (file) {
  const inputPath = file.path
  const tempPath = `${paths.temp}/${file.path}`

  // Create a clone — to remove unnecessary and sensitive before zipping them up
  await fs.copy(inputPath, tempPath)
  await Promise.all([
    fs.remove(`${tempPath}/node_modules`),
    fs.remove(`${tempPath}/certs`),
    fs.remove(`${tempPath}/.env`)
  ])
}
