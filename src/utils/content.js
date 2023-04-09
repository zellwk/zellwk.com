import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkPlainText from 'remark-plain-text'
import remarkRehype from 'remark-rehype'
import remarkStringify from 'remark-stringify'
import sanitizeHTML from 'sanitize-html'
import { unified } from 'unified'

// Normalize posts so they're ready to be used.
export function normalize(files) {
  const published = getPublished(files)
  const sorted = sortFiles(published)
  const addedExcerpt = addExcerpt(sorted)
  const addedDescription = addDescription(addedExcerpt)
  return addedDescription
}

// Removes posts that aren't published yet
export function getPublished(files) {
  return files
    .map(file => {
      // Adds a date property to each post
      file.data.date = file.data.updateDate || file.data.pubDate
      return file
    })
    .filter(file => {
      // Remove those that aren't published yet
      if (file.data.date > new Date()) return false
      if (file.data.status === 'draft') return false
      if (!file.data.status) return true
      return true
    })
}

// Returns latest posts
export function sortFiles(files, order = 'desc') {
  const sorted = files
    .map(file => {
      // Adds a date property to each post if it doesn't exist.
      // Defensive measure in case sortFiles is used before getPublished
      if (file.data.date) return file
      file.data.date = file.data.updateDate || file.data.pubDate
      return file
    })
    .sort((a, b) => {
      if (order === 'desc') {
        return b.data.date.valueOf() - a.data.date.valueOf()
      } else {
        return a.data.date.valueOf() - b.data.date.valueOf()
      }
    })

  return sorted
}

export function addExcerpt(files) {
  return files.map(file => {
    file.data.excerpt = file.body.split('{/* more */}')[0]
    return file
  })
}

// Add description to posts if unavailable
// Must only be used after excerpts are added
export function addDescription(files) {
  return files.map(file => {
    if (!file.data.description) {
      file.data.description = toPlainText(file.data.excerpt)
    }
    return file
  })
}

// Strip the {/* more */} comment from the post body so it doesn't show up in RSS feeds
export function stripMore(files) {
  return files.map(file => {
    file.body.replace()
    file.body = file.body.replace('{/* more */}', '')
    return file
  })
}

export function gatherTags(files) {
  const tags = {}
  const published = getPublished(files)
  const sorted = sortFiles(published)

  // Go through all posts and gather tags into an object
  sorted.forEach(file => {
    if (file.data.tags.length === 0) {
      throw new Error(`No tags found for "${file.data.title}"`)
    }

    file.data.tags.forEach(tag => {
      if (tags[tag]) {
        tags[tag].push(file)
      } else {
        tags[tag] = [file]
      }
    })
  })

  // Sort tags by alphabetical order
  // And convert object into an array for usage
  const sortedTags = Object.keys(tags)
    .sort()
    .map(tag => {
      return {
        name: tag,
        items: tags[tag],
      }
    })

  return sortedTags
}

export function toHTML(content, options = {}) {
  const vFile = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(content)
  const string = vFile.toString()

  if (options.sanitizeHTML) return sanitizeHTML(string)
  return string
}

export function toPlainText(content) {
  const vFile = unified()
    .use(remarkParse)
    .use(remarkPlainText)
    .use(remarkStringify)
    .processSync(content)

  // Removes extra spaces that remarkPlainText doesn't handle
  return vFile
    .toString()
    .replace(' ,', ',')
    .replace(' .', '.')
    .replace(' !', '!')
}
