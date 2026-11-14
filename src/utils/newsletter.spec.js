import { describe, expect, it } from 'vitest'
import { getLatestIssue } from './newsletter.js'

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
