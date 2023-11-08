import gulp from 'gulp'

const { src, dest, parallel, watch } = gulp

const paths = {
  input: 'src/assets',
  output: 'public/assets',
}

const copyAssets = parallel(copyVideos, copySVGs)
export default copyAssets

export function assetWatcher() {
  watch(paths.input + '/**/*', copyAssets)
}

// Copy videos to the public folder so Astro build can copy it to dist.
function copyVideos() {
  return src(paths.input + '/**/*.mp4').pipe(dest(paths.output))
}

function copySVGs() {
  return src(paths.input + '/**/*.svg').pipe(dest(paths.output))
}
