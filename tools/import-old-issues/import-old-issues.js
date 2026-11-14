/**
 * @file Imports old newsletter emails as issues.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import zlFetch from 'zl-fetch'
import { rejectSlugClash } from '../sync-newsletter/convert.js'
import {
  buildIssueText,
  convertOldIssue,
  getImageUrls,
  getImportFileNames,
} from './convert.js'

await importIssues(parseCommand())

/**
 * parseCommand
 * Reads the sorted-emails folder and the scratch folder from the command line.
 *
 * @returns {{ sortDir: string, scratchDir: string }}
 */
function parseCommand() {
  const { values } = parseArgs({
    options: { sort: { type: 'string' }, scratch: { type: 'string' } },
  })

  if (!values.sort || !values.scratch) {
    throw new Error(
      'Usage: npm run import-old-issues -- --sort <folder with sorted.tsv> --scratch <folder for cache and report>',
    )
  }

  return {
    sortDir: path.resolve(values.sort),
    scratchDir: path.resolve(values.scratch),
  }
}

/**
 * importIssues
 * Replaces the previously imported issues with a fresh conversion.
 *
 * @param {object} opts
 * @param {string} opts.sortDir Folder holding sorted.tsv and issues/
 * @param {string} opts.scratchDir Folder for the image cache and report
 * @returns {Promise<void>}
 */
async function importIssues({ sortDir, scratchDir }) {
  const siteRoot = fileURLToPath(new URL('../../', import.meta.url))
  const issueDir = path.join(siteRoot, 'src/content/newsletter')
  const manifestPath = fileURLToPath(new URL('written.json', import.meta.url))

  // Reads the emails marked as issues, oldest first
  const rows = await getIssueRows(sortDir)
  const emails = await Promise.all(
    rows.map(async row => ({
      ...row,
      html: await fs.readFile(
        path.join(sortDir, 'issues', row.htmlFile),
        'utf-8',
      ),
    })),
  )

  // Checks which images still answer
  await fs.mkdir(scratchDir, { recursive: true })
  const liveImageUrls = await getLiveImageUrls({
    imageUrls: [...new Set(emails.flatMap(email => getImageUrls(email.html)))],
    cachePath: path.join(scratchDir, 'image-status.json'),
  })

  // Converts every email and names its file
  const issues = emails.map(email => ({
    ...email,
    ...convertOldIssue({
      html: email.html,
      subject: email.subject,
      liveImageUrls,
    }),
  }))
  const fileNames = getImportFileNames(
    issues.map(issue => ({ sentDate: issue.sentDate, title: issue.title })),
  )

  // Removes the files the last run wrote
  const previousFileNames = JSON.parse(
    await fs.readFile(manifestPath, 'utf-8').catch(() => '[]'),
  )
  for (const fileName of previousFileNames)
    await fs.rm(path.join(issueDir, fileName), { force: true })

  // Rejects slugs that clash with pages or other issues
  const pageNames = await fs.readdir(
    path.join(siteRoot, 'src/pages/newsletter'),
  )
  const issueFileNames = [...(await fs.readdir(issueDir)), ...fileNames]
  for (const fileName of fileNames) {
    rejectSlugClash({
      fileName,
      reservedSlugs: pageNames.map(name => path.parse(name).name),
      issueFileNames,
    })
  }

  // Writes the issues, the manifest and the run report
  for (const [index, issue] of issues.entries()) {
    const text = removeContactDetails({
      text: buildIssueText(issue),
      sentDate: issue.sentDate,
    })
    await fs.writeFile(path.join(issueDir, fileNames[index]), text)
  }
  await fs.writeFile(manifestPath, `${JSON.stringify(fileNames, null, 2)}\n`)
  await fs.writeFile(
    path.join(scratchDir, 'report.tsv'),
    buildReport({ issues, fileNames }),
  )

  console.log(
    `Wrote ${fileNames.length} issues. Report: ${path.join(scratchDir, 'report.tsv')}`,
  )
}

/**
 * getIssueRows
 * Reads the rows marked as issues from sorted.tsv.
 *
 * @param {string} sortDir
 * @returns {Promise<{ id: string, sentDate: string, subject: string, htmlFile: string }[]>}
 */
async function getIssueRows(sortDir) {
  const text = await fs.readFile(path.join(sortDir, 'sorted.tsv'), 'utf-8')
  return text
    .trim()
    .split('\n')
    .slice(1)
    .map(row => row.split('\t'))
    .filter(([, , , verdict]) => verdict === 'issue')
    .map(([id, sentDate, subject, , , files]) => ({
      id,
      sentDate,
      subject,
      htmlFile: files.split(' ').find(file => file.endsWith('.html')) ?? '',
    }))
    .sort((a, b) => a.sentDate.localeCompare(b.sentDate))
}

/**
 * getLiveImageUrls
 * Fetches each unchecked image once and caches its status.
 *
 * @param {object} opts
 * @param {string[]} opts.imageUrls
 * @param {string} opts.cachePath JSON file of url to status
 * @returns {Promise<Set<string>>}
 */
async function getLiveImageUrls({ imageUrls, cachePath }) {
  const statuses = JSON.parse(
    await fs.readFile(cachePath, 'utf-8').catch(() => '{}'),
  )
  const uncheckedUrls = imageUrls.filter(url => !statuses[url])

  // Fetches in small batches to stay polite to each host
  for (let start = 0; start < uncheckedUrls.length; start += 8) {
    const batch = uncheckedUrls.slice(start, start + 8)
    const results = await Promise.all(batch.map(fetchImageStatus))
    batch.forEach((url, index) => (statuses[url] = results[index]))
  }
  await fs.writeFile(cachePath, `${JSON.stringify(statuses, null, 2)}\n`)

  const isLive = status =>
    status.code === 200 && status.type.startsWith('image/')
  return new Set(imageUrls.filter(url => isLive(statuses[url])))
}

/**
 * fetchImageStatus
 * Requests an image and reads its final status and type.
 *
 * @param {string} url
 * @returns {Promise<{ code: number, type: string }>}
 */
async function fetchImageStatus(url) {
  try {
    const response = await zlFetch(url, { customResponseParser: true })
    await response.body?.cancel()
    return {
      code: response.status,
      type: response.headers.get('content-type') ?? '',
    }
  } catch (error) {
    if (!(error instanceof TypeError)) throw error
    return { code: 0, type: error.cause?.code ?? error.message }
  }
}

/**
 * removeContactDetails
 * Takes third parties' contact details out of issues that carried them.
 *
 * @param {object} opts
 * @param {string} opts.text Issue file contents
 * @param {string} opts.sentDate
 * @returns {string}
 */
function removeContactDetails({ text, sentDate }) {
  const redactions = {
    '2018-08-29': [
      [
        / at \[e\.vandijk@[^\]]+\]\([^)]+\)\. You can also reach him at \[\+65 94522948\]\([^)]+\)/,
        '.',
      ],
    ],
  }

  let redactedText = text
  for (const [pattern, replacement] of redactions[sentDate] ?? []) {
    if (!pattern.test(redactedText))
      throw new Error(`${sentDate}: contact details not found by ${pattern}`)
    redactedText = redactedText.replace(pattern, replacement)
  }
  return redactedText
}

/**
 * buildReport
 * Lays out per-issue counts as TSV for review.
 *
 * @param {object} opts
 * @param {(ReturnType<typeof convertOldIssue> & { id: string })[]} opts.issues
 * @param {string[]} opts.fileNames
 * @returns {string}
 */
function buildReport({ issues, fileNames }) {
  const header = [
    'file',
    'id',
    'keptImages',
    'removedImages',
    'unresolvedLinks',
    'hasSignOff',
    'hasPs',
    'removedImageUrls',
    'unresolvedLinkTexts',
  ]
  const rows = issues.map((issue, index) => [
    fileNames[index],
    issue.id,
    issue.keptImages.length,
    issue.removedImages.length,
    issue.unresolvedLinks.length,
    issue.hasSignOff,
    Boolean(issue.ps),
    issue.removedImages.join(' '),
    issue.unresolvedLinks.join(' | '),
  ])
  return [header, ...rows].map(row => row.join('\t')).join('\n') + '\n'
}
