import { describe, expect, it } from 'vitest'
import { getIssues, getLatestIssue, groupByYear } from './newsletter.js'

function buildEntry(fileName) {
  return {
    id: fileName,
    filePath: `src/content/newsletter/${fileName}`,
    data: { title: fileName },
    body: '',
  }
}

describe('getLatestIssue', () => {
  it('picks the newest sent date whatever the collection order', () => {
    const entries = [
      buildEntry('2026-03-19-the-real-reason-i-use-tailwind.mdx'),
      buildEntry('2026-10-10-redefining-my-relationship-with-you.mdx'),
      buildEntry('2025-11-17-back-again-and-articles-to-come.mdx'),
    ]
    expect(getLatestIssue(entries).data.slug).toBe('redefining-my-relationship-with-you')
  })

  it('returns nothing when there are no issues', () => {
    expect(getLatestIssue([])).toBeUndefined()
  })
})

describe('groupByYear', () => {
  it('lists years newest first, with each year keeping its issues newest first', () => {
    const issues = getIssues([
      buildEntry('2024-02-10-splendid-layouts-is-here.md'),
      buildEntry('2026-03-19-the-real-reason-i-use-tailwind.mdx'),
      buildEntry('2024-01-16-how-to-win-at-javascript.md'),
      buildEntry('2026-10-10-redefining-my-relationship-with-you.mdx'),
    ])
    const years = groupByYear(issues).map(({ year, issues }) => ({
      year,
      slugs: issues.map(issue => issue.data.slug),
    }))

    expect(years).toEqual([
      { year: 2026, slugs: ['redefining-my-relationship-with-you', 'the-real-reason-i-use-tailwind'] },
      { year: 2024, slugs: ['splendid-layouts-is-here', 'how-to-win-at-javascript'] },
    ])
  })
})
