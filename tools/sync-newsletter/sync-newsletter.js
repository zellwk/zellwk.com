/**
 * @file Copies a sent issue from sendy-app.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { convertIssue, rejectSlugClash } from './convert.js'

await syncIssue(parseCommand())

/**
 * parseCommand
 * Reads the issue path and send date from the command line.
 *
 * @returns {{ issuePath: string, sentDate: string }}
 */
function parseCommand() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: { sent: { type: 'string' } },
  })

  const [issuePath] = positionals
  const sentDate = values.sent ?? ''
  if (!issuePath || !/^\d{4}-\d{2}-\d{2}$/.test(sentDate)) {
    throw new Error('Usage: npm run sync-newsletter -- <sendy-app issue .mdx> --sent YYYY-MM-DD')
  }

  return { issuePath: path.resolve(issuePath), sentDate }
}

/**
 * syncIssue
 * Writes the converted issue and its images into the site.
 *
 * @param {object} opts
 * @param {string} opts.issuePath Absolute sendy-app issue path
 * @param {string} opts.sentDate Send date as YYYY-MM-DD
 * @returns {Promise<void>}
 */
async function syncIssue({ issuePath, sentDate }) {
  const siteRoot = fileURLToPath(new URL('../../', import.meta.url))
  const issueDir = path.join(siteRoot, 'src/content/newsletter')
  const sendyAppRoot = issuePath.slice(0, issuePath.indexOf('/src/content/'))

  // Converts the issue
  const source = await fs.readFile(issuePath, 'utf-8')
  const issue = convertIssue({ source, sentDate })

  // Rejects slugs that clash with pages or issues
  const pageNames = await fs.readdir(path.join(siteRoot, 'src/pages/newsletter'))
  await fs.mkdir(issueDir, { recursive: true })
  rejectSlugClash({
    fileName: issue.fileName,
    reservedSlugs: pageNames.map(name => path.parse(name).name),
    issueFileNames: await fs.readdir(issueDir),
  })

  // Writes the issue and copies its images
  await fs.writeFile(path.join(issueDir, issue.fileName), issue.text)
  for (const imagePath of issue.imagePaths) {
    await fs.cp(path.join(sendyAppRoot, imagePath), path.join(siteRoot, imagePath))
  }

  console.log(`Wrote src/content/newsletter/${issue.fileName} with ${issue.imagePaths.length} images`)
}
