import imagemin, { gifsicle, mozjpeg, optipng } from 'gulp-imagemin'

import gulp from 'gulp'
import newer from 'gulp-newer'

const { src, dest, parallel, watch } = gulp

const paths = {
  input: 'images',
  output: 'public/images',
}

const optimizeAssets = parallel(copyVideos, optimizeImages, copySVGs)
export default optimizeAssets

export function assetWatcher() {
  watch(paths.input + '/**/*', optimizeAssets)
}

// Optimize images and put it in the public folder.
// Astro build will take care of the images from that point onwards.
function optimizeImages() {
  return src(paths.input + '/**/*.{jpg,jpeg,png,gif}')
    .pipe(newer(paths.output))
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 100, progressive: true }),
        optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(dest(paths.output))
}

// Copy videos to the public folder so Astro build can copy it to dist.
function copyVideos() {
  return src(paths.input + '/**/*.mp4').pipe(dest(paths.output))
}

function copySVGs() {
  return src(paths.input + '/**/*.svg').pipe(dest(paths.output))
}
