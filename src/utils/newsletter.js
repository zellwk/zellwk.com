/**
 * @file Orders newsletter issues for the site.
 */
import { processFiles } from '@splendidlabz/astro/content'

/**
 * getIssues
 * Sorts issues newest first, with date and slug from the file name.
 *
 * @param {object[]} entries Newsletter collection entries
 * @returns {object[]}
 */
export function getIssues(entries) {
  return processFiles(entries, { filter: false })
}

/**
 * getLatestIssue
 * Picks the issue sent last.
 *
 * @param {object[]} entries Newsletter collection entries
 * @returns {object | undefined}
 */
export function getLatestIssue(entries) {
  return getIssues(entries)[0]
}
