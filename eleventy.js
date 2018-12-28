const path = require('path')
const datefns = require('date-fns')
const sizeOf = require('image-size')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const form = require('./eleventy/form')
const markdown = require('./eleventy/markdown')
const paginate = require('./eleventy/paginate')
const post = require('./eleventy/post')
const sitewide = require('./eleventy/sitewide')

const { input, output } = require('./gulp/_config')

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.addLayoutAlias('post', '_layout/post')

  // Markdown
  eleventyConfig.setLibrary('md', markdown.lib)
  eleventyConfig.addPairedShortcode('markdown', markdown.pairedMarkdown)
  eleventyConfig.addFilter('markdownInline', markdown.inline)

  // Pages
  // Override permalink to remove /page prefix
  eleventyConfig.addFilter('pagePathOverride', content => {
    const regex = /page\/(.*).njk/
    const match = content.match(regex)
    return match[1]
  })

  // Published posts are posts that are older than today (when eleventy runs)
  const isPublished = item => item.date <= new Date()

  // Collections
  eleventyConfig.addCollection('publishedPosts', collection => {
    return collection.getFilteredByGlob('./src/posts/*.md')
      .filter(isPublished)
      .reverse()
  })

  // Collections
  eleventyConfig.addCollection('algolia', collection => {
    return collection.getFilteredByGlob('./src/posts/*.md')
      .filter(isPublished)
      .reverse()
      .map(post => {
        return {
          title: post.data.title,
          tags: post.data.tags,
          url: post.url
        }
      })
  })

  eleventyConfig.addCollection('best', collection => {
    return collection.getFilteredByTag('best')
      .filter(isPublished)
  })

  eleventyConfig.addCollection('tagslist', collection => {
    const col = collection.getFilteredByGlob('./src/posts/*.md')
      .filter(isPublished)
      .reduce((collated, item) => {
        let tags = item.data.tags
        if (typeof tags === 'string') tags = [tags]

        for (const tag of tags) {
          const tagIndex = collated.findIndex(ctag => ctag.name === tag)
          if (tagIndex === -1) {
            collated.push({
              name: tag,
              items: [item.data.title]
            })
          } else {
            collated[tagIndex].items.push(item.data.title)
          }
        }

        return collated
      }, [])
      .filter(tag => tag.name !== 'best')
      .sort((a, b) => {
        var nameA = a.name.toUpperCase() // ignore upper and lowercase
        var nameB = b.name.toUpperCase() // ignore upper and lowercase
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
      })

    return col
  })

  eleventyConfig.addPairedShortcode('isPublished', (content, date, isPublished = true) => {
    if (
      (isPublished && new Date() > date) ||
      ((!isPublished && new Date() < date))
    ) {
      return content
    }

    return ''
  })

  eleventyConfig.addShortcode('paginate', paginate)

  // Posts
  eleventyConfig.addShortcode('summary', post.summary)
  eleventyConfig.addShortcode('shareArticle', post.share)

  // Forms
  eleventyConfig.addShortcode('formHidden', form.hidden)
  eleventyConfig.addShortcode('formInput', form.input)
  eleventyConfig.addShortcode('formTextarea', form.textarea)
  eleventyConfig.addShortcode('formRadios', form.radios)
  eleventyConfig.addPairedShortcode('form', form.form)

  // Sitewide shortcodes
  eleventyConfig.addShortcode('youtube', sitewide.youtube)
  eleventyConfig.addShortcode('audio', sitewide.audio)
  eleventyConfig.addShortcode('getDesc', sitewide.getDescription)

  const getSrcSet = (width, size, dir, basename, ext) => {
    const sizePath = size === width
      ? `-${size}`
      : ''
    return `${path.join(dir, basename + sizePath + ext)} ${size}w`
  }

  eleventyConfig.addShortcode('imageWithPerf', (fpath, alt, caption) => {
    const { width } = sizeOf(path.join(__dirname, 'src', fpath))
    const ext = path.extname(fpath)
    const basename = path.basename(fpath, ext)
    const dir = path.dirname(fpath)
    const imageSizes = [400, 900, 1300]

    // Get all available sizes
    // Orig file itself is the largest size
    const sizes = imageSizes.filter(size => size < width)
    if (sizes[sizes.length - 1] !== width) sizes.push(width)

    // Create a map of paths.
    // Includes webP and non webp...
    const nonWebp = sizes
      .map(size => getSrcSet(width, size, dir, basename, ext))
      .join()

    const webp = sizes
      .map(size => getSrcSet(width, size, dir, basename, '.webp'))
      .join()

    return `<figure>
  <picture>
    <source srcset="${webp}" sizes="100vw"/>
    <img srcset="${nonWebp}" sizes="100vw"
      src="${fpath}" alt="${alt}"
    />
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </picture>
</figure>`
  })

  // Dates
  eleventyConfig.addFilter('readableDate', value => {
    return datefns.format(value, 'Do MMM YYYY')
  })
  eleventyConfig.addFilter('htmlDateString', value => {
    return datefns.format(value, 'YYYY-MM-DD')
  })

  return {
    dir: {
      input,
      output,
      includes: '_includes'
    },
    templateFormats: ['njk', 'md'],
    passthroughFileCopy: true
  }
}
