import { describe, expect, it } from 'vitest'
import { convertIssue, getIssueSlug, rejectSlugClash } from './convert.js'

function buildSource({ frontmatter, body }) {
  return `---\nlayout: '@/layouts/EmailBaseMDX.astro'\n${frontmatter}\n---\n${body}`
}

describe('convertIssue', () => {
  it('names the file by send date and subject slug', () => {
    const source = buildSource({ frontmatter: "subject: 'Redefining my relationship with you'", body: 'Hi' })
    const { fileName } = convertIssue({ source, sentDate: '2026-10-10' })
    expect(fileName).toBe('2026-10-10-redefining-my-relationship-with-you.mdx')
  })

  it('maps subject, preview text and P.S. and drops the layout', () => {
    const source = buildSource({
      frontmatter: "subject: 'Hello'\npreviewText: 'A preview'\nps: 'P.S. Reply!'",
      body: 'Body',
    })
    const { text } = convertIssue({ source, sentDate: '2026-01-01' })
    expect(text).toBe('---\ntitle: Hello\ndescription: A preview\nps: P.S. Reply!\n---\n\nBody\n')
  })

  it('leaves out an empty preview and a whitespace-only P.S.', () => {
    const source = buildSource({ frontmatter: "subject: 'Hello'\npreviewText: ''\nps: ' '", body: 'Body' })
    const { text } = convertIssue({ source, sentDate: '2026-01-01' })
    expect(text).toBe('---\ntitle: Hello\n---\n\nBody\n')
  })

  it('drops the EmailImage import and lists image paths', () => {
    const body = [
      '',
      "import Image from '@/components/EmailImage.astro'",
      '',
      '<Image',
      '  src="/src/assets/newsletter/one.png"',
      '  alt="One"',
      '/>',
    ].join('\n')
    const source = buildSource({ frontmatter: "subject: 'Hello'", body })
    const { text, imagePaths } = convertIssue({ source, sentDate: '2026-01-01' })
    expect(text).not.toContain('EmailImage')
    expect(text).toContain('src="/src/assets/newsletter/one.png"')
    expect(imagePaths).toEqual(['/src/assets/newsletter/one.png'])
  })

  it('replaces personalisation tags with their fallback and drops link tags', () => {
    const source = buildSource({
      frontmatter: "subject: 'Hello'\nps: 'P.S. Bye [Name,fallback=friend]'",
      body: 'Hi [Name, fallback=there]. <webversion>View online</webversion>[unsubscribe]',
    })
    const { text } = convertIssue({ source, sentDate: '2026-01-01' })
    expect(text).toContain('Hi there.')
    expect(text).toContain('P.S. Bye friend')
    expect(text).not.toMatch(/webversion|unsubscribe|fallback/)
  })
})

describe('getIssueSlug', () => {
  it('drops apostrophes and joins words across punctuation', () => {
    expect(getIssueSlug("Time doesn't heal wounds")).toBe('time-doesnt-heal-wounds')
    expect(getIssueSlug('Back (again) — and articles to come')).toBe('back-again-and-articles-to-come')
    expect(getIssueSlug("You don't need to trap focus on dialogs...")).toBe('you-dont-need-to-trap-focus-on-dialogs')
  })
})

describe('rejectSlugClash', () => {
  const reservedSlugs = ['index', 'confirm', 'latest', '[slug]']

  it('rejects a slug taken by a newsletter page', () => {
    expect(() => rejectSlugClash({ fileName: '2026-01-01-confirm.mdx', reservedSlugs, issueFileNames: [] })).toThrow(
      '/newsletter/confirm/',
    )
  })

  it('rejects a slug another issue file uses under a different date', () => {
    const issueFileNames = ['2026-01-01-hello.mdx']
    expect(() => rejectSlugClash({ fileName: '2026-01-03-hello.mdx', reservedSlugs, issueFileNames })).toThrow(
      '2026-01-01-hello.mdx',
    )
  })

  it('allows re-syncing the same issue file', () => {
    const issueFileNames = ['2026-01-01-hello.mdx']
    expect(() => rejectSlugClash({ fileName: '2026-01-01-hello.mdx', reservedSlugs, issueFileNames })).not.toThrow()
  })
})
