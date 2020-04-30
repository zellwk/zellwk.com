const path = require('path')
const datefns = require('date-fns')
const sizeOf = require('image-size')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const form = require('./eleventy/form')
const markdown = require('./eleventy/markdown')
const paginate = require('./eleventy/paginate')
const post = require('./eleventy/post')
const sitewide = require('./eleventy/sitewide')
const fs = require('fs')
const fsp = fs.promises

const { input, output } = require('./gulp/_config')

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addLayoutAlias('post', '_layout/post')

  // Markdown
  eleventyConfig.setLibrary('md', markdown.lib)
  eleventyConfig.addFilter('markdown', markdown.inline)
  eleventyConfig.addPairedShortcode('markdownFile', markdown.includeMarkdownFile)
  eleventyConfig.addPairedShortcode('markdown', markdown.pairedMarkdown)

  // Pages
  // Override permalink to remove /page prefix
  eleventyConfig.addFilter('pagePathOverride', content => {
    const regex = /page\/(.*).njk/
    const match = content.match(regex)
    return match[1]
  })

  // Published posts are posts that are older than today (when eleventy runs)
  const isPublished = item => item.date <= new Date()

  // Published Posts
  // Used for Blog template
  // Used for previous/next post link
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
        const nameA = a.name.toUpperCase() // ignore upper and lowercase
        const nameB = b.name.toUpperCase() // ignore upper and lowercase
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
      })

    return col
  })

  // For series content
  eleventyConfig.addCollection('seriesContent', collection => {
    return collection.getFilteredByGlob('./src/posts/*.md')
      .filter(isPublished)
      .filter(item => item.data.series)
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
  eleventyConfig.addShortcode('twitterLink', post.twitterLink)
  eleventyConfig.addShortcode('youtube', post.youtube)

  // Forms
  eleventyConfig.addShortcode('formHidden', form.hidden)
  eleventyConfig.addShortcode('formInput', form.input)
  eleventyConfig.addShortcode('formTextarea', form.textarea)
  eleventyConfig.addShortcode('formRadios', form.radios)
  eleventyConfig.addPairedShortcode('form', form.form)

  // Sitewide shortcodes
  eleventyConfig.addShortcode('youtube', sitewide.youtube)
  eleventyConfig.addShortcode('audio', sitewide.audio)
  eleventyConfig.addShortcode('audio2', sitewide.audio2)
  eleventyConfig.addFilter('decode', sitewide.decode)
  eleventyConfig.addShortcode('getDesc', sitewide.getDescription)

  const getSrcSet = (width, size, dir, basename, ext) => {
    const sizePath = size === width
      ? `-${size}`
      : ''
    return `${path.join(dir, basename + sizePath + ext)} ${size}w`
  }

  // Dates
  eleventyConfig.addFilter('readableDate', value => {
    return datefns.format(value, 'do MMM yyyy')
  })
  eleventyConfig.addFilter('htmlDateString', value => {
    return datefns.format(value, 'yyyy-MM-dd')
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
