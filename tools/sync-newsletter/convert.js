/**
 * @file Converts a sent email issue into a site issue.
 */
import { parse, stringify } from 'yaml'

/**
 * convertIssue
 * Turns a sendy-app issue into the site's issue file.
 *
 * @param {object} opts
 * @param {string} opts.source Contents of the sendy-app issue
 * @param {string} opts.sentDate Send date as YYYY-MM-DD
 * @returns {{ fileName: string, text: string, imagePaths: string[] }}
 */
export function convertIssue({ source, sentDate }) {
  const [, rawFrontmatter, rawBody] = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  const { subject, previewText = '', ps = '' } = parse(rawFrontmatter)

  // Builds frontmatter, leaving out empty fields
  const frontmatter = { title: subject }
  if (previewText.trim()) frontmatter.description = previewText.trim()
  if (ps.trim()) frontmatter.ps = removeSendyTags(ps.trim())

  // Strips email-only markup from the body
  let body = rawBody.replace(/^import .+ from '@\/components\/EmailImage\.astro'\n/m, '')
  body = removeSendyTags(body).trim()

  return {
    fileName: `${sentDate}-${getIssueSlug(subject)}.mdx`,
    text: `---\n${stringify(frontmatter, { lineWidth: 0 })}---\n\n${body}\n`,
    imagePaths: [...body.matchAll(/src="(\/src\/assets\/[^"]+)"/g)].map(match => match[1]),
  }
}

/**
 * getIssueSlug
 * Builds the URL slug from an issue's subject.
 *
 * @param {string} subject
 * @returns {string}
 */
export function getIssueSlug(subject) {
  return subject
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * rejectSlugClash
 * Throws when the issue's slug is taken by a page or another issue.
 *
 * @param {object} opts
 * @param {string} opts.fileName Issue file being written
 * @param {string[]} opts.reservedSlugs Pages under /newsletter/
 * @param {string[]} opts.issueFileNames Issue files already on the site
 * @returns {void}
 */
export function rejectSlugClash({ fileName, reservedSlugs, issueFileNames }) {
  const slug = getSlugFromFileName(fileName)

  if (reservedSlugs.includes(slug)) {
    throw new Error(`"${slug}" is already a page at /newsletter/${slug}/. Change the issue's subject.`)
  }

  const clashingFile = issueFileNames.find(name => name !== fileName && getSlugFromFileName(name) === slug)
  if (clashingFile) {
    throw new Error(`${clashingFile} already uses the slug "${slug}". Pass the date in its file name to --sent, or change the subject.`)
  }
}

/**
 * removeSendyTags
 * Replaces Sendy's personalisation tags and drops its link tags.
 *
 * @param {string} text
 * @returns {string}
 */
function removeSendyTags(text) {
  return text
    .replace(/\[[A-Za-z ]+,\s*fallback=([^\]]*)\]/g, '$1')
    .replace(/<(webversion|unsubscribe)>[\s\S]*?<\/\1>/g, '')
    .replace(/\[(webversion|unsubscribe)\]/g, '')
}

/**
 * getSlugFromFileName
 * Reads the slug out of a dated issue file name.
 *
 * @param {string} fileName
 * @returns {string}
 */
function getSlugFromFileName(fileName) {
  return fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '')
}
