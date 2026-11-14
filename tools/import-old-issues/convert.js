/**
 * @file Converts an old newsletter email into an issue.
 */
import * as cheerio from 'cheerio'
import TurndownService from 'turndown'
import { stringify } from 'yaml'
import { getIssueSlug } from '../sync-newsletter/convert.js'

/**
 * convertOldIssue
 * Turns a sent email's HTML into an issue's title, body and P.S.
 *
 * @typedef {object} OldIssue
 * @property {string} title Cleaned subject
 * @property {string} body Markdown between greeting and sign-off
 * @property {string} ps Markdown P.S., or empty
 * @property {string[]} keptImages Image URLs left in the issue
 * @property {string[]} removedImages Dead image URLs taken out
 * @property {string[]} unresolvedLinks Link texts whose target is lost
 * @property {boolean} hasSignOff Whether a sign-off was found
 *
 * @param {object} opts
 * @param {string} opts.html Email HTML
 * @param {string} opts.subject Email subject
 * @param {Set<string>} opts.liveImageUrls Image URLs that answer 200
 * @returns {OldIssue}
 */
export function convertOldIssue({ html, subject, liveImageUrls }) {
  const $ = cheerio.load(html)

  // Removes markup that never shows in the letter
  $('head, style, script, title').remove()
  $('*')
    .contents()
    .filter((index, node) => node.type === 'comment')
    .remove()
  $('[style]')
    .filter((index, element) => isHidden($(element).attr('style')))
    .remove()

  // Removes tracking pixels and email chrome images
  $('img')
    .filter((index, element) => isChromeImage($(element)))
    .remove()

  // Rebuilds code blocks, including markup pasted in as text
  $('pre').each((index, element) => {
    const pre = $(element)
    pre.find('br').replaceWith('\n')
    const code = pre
      .text()
      .replace(/<\/?(code|span|strong|em|b|i)\b[^>]*>/g, '')
    pre.empty().append($('<code>').text(code))
  })
  $('p')
    .filter((index, element) => /^(~~~|```)$/.test($(element).text().trim()))
    .remove()

  // Rewrites tracked links to their targets
  $('a[href]').each((index, element) => {
    const link = $(element)
    link.attr(
      'href',
      getLinkTarget({ href: link.attr('href'), text: link.text() }),
    )
  })

  // Marks dead images, and points old site images at the repo's assets
  $('img').each((index, element) => {
    const image = $(element)
    image.attr('src', getImageSource({ src: image.attr('src'), liveImageUrls }))
  })

  // Converts to Markdown and cuts the letter out of the email
  const blocks = getBlocks(buildTurndown().turndown($('body').html() ?? ''))
  const title = cleanSubject(subject)
  const letter = cutLetter({ blocks, title })

  // Drops the marked links and images from what's left
  const body = removeMarkers(letter.bodyBlocks.join('\n\n'))
  const ps = removeMarkers(letter.psBlocks.join('\n\n'))

  return {
    title,
    body: body.text,
    ps: ps.text,
    keptImages: [...body.keptImages, ...ps.keptImages],
    removedImages: [...body.removedImages, ...ps.removedImages],
    unresolvedLinks: [...body.unresolvedLinks, ...ps.unresolvedLinks],
    hasSignOff: letter.hasSignOff,
  }
}

/**
 * getImageUrls
 * Lists the content images whose liveness has to be checked.
 *
 * @param {string} html Email HTML
 * @returns {string[]}
 */
export function getImageUrls(html) {
  const $ = cheerio.load(html)
  return $('img')
    .filter((index, element) => !isChromeImage($(element)))
    .map((index, element) => $(element).attr('src') ?? '')
    .get()
    .filter(src => /^https?:\/\//.test(src) && !getAssetPath(src))
}

/**
 * cleanSubject
 * Removes merge tags and invisible characters from a subject.
 *
 * @param {string} subject
 * @returns {string}
 */
export function cleanSubject(subject) {
  const title = subject
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/^\[FIRST NAME GOES HERE\],?\s*/i, '')
    .trim()
  return title.charAt(0).toUpperCase() + title.slice(1)
}

/**
 * getImportFileNames
 * Names each issue's file, adding the year or date to repeated subjects.
 *
 * @param {{ sentDate: string, title: string }[]} issues Oldest first
 * @returns {string[]}
 */
export function getImportFileNames(issues) {
  const takenSlugs = new Set()

  return issues.map(({ sentDate, title }) => {
    const baseSlug = getIssueSlug(title)
    let slug = baseSlug
    if (takenSlugs.has(slug)) slug = `${baseSlug}-${sentDate.slice(0, 4)}`
    if (takenSlugs.has(slug)) slug = `${baseSlug}-${sentDate}`

    takenSlugs.add(slug)
    return `${sentDate}-${slug}.md`
  })
}

/**
 * buildIssueText
 * Writes an issue's frontmatter and body as file contents.
 *
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} opts.body Markdown body
 * @param {string} opts.ps Markdown P.S., or empty
 * @returns {string}
 */
export function buildIssueText({ title, body, ps }) {
  const frontmatter = { title }
  if (ps) frontmatter.ps = ps
  return `---\n${stringify(frontmatter, { lineWidth: 0 })}---\n\n${body}\n`
}

/**
 * isHidden
 * Tells whether an inline style hides its element.
 *
 * @param {string | undefined} style
 * @returns {boolean}
 */
function isHidden(style = '') {
  return /display:\s*none|max-height:\s*0(px)?\s*(;|!|$)|opacity:\s*0(\.0)?\s*(;|!|$)|mso-hide:\s*all/i.test(
    style,
  )
}

/**
 * isChromeImage
 * Tells whether an image is a tracking pixel or email platform chrome.
 *
 * @param {import('cheerio').Cheerio<any>} image
 * @returns {boolean}
 */
function isChromeImage(image) {
  const src = image.attr('src') ?? ''
  const isPixel = image.attr('width') === '1' || image.attr('height') === '1'
  const isTracker =
    /open\.convertkit-mail|convertkit[^/]*\.com\/o\/|list-manage\d*\.com\/track\/open|awstrack\.me|link\.h\.convertkit\.com\/wf\/open/.test(
      src,
    )
  const isPlatformBadge = /cdn-images\.mailchimp\.com|transparent\.gif/.test(
    src,
  )
  return !src || isPixel || isTracker || isPlatformBadge
}

/**
 * getLinkTarget
 * Decodes a tracked link, or marks it unresolved when its target is lost.
 *
 * @param {object} opts
 * @param {string | undefined} opts.href
 * @param {string} opts.text Visible link text
 * @returns {string}
 */
function getLinkTarget({ href = '', text }) {
  const target = decodeTrackedUrl(href)
  if (target) return removeSubscriberId(rebaseSiteUrl(target))

  const textUrl = text.replace(/[\u200B-\u200F]/g, '').trim()
  if (/^(https?:\/\/|www\.)\S+$/.test(textUrl)) {
    return textUrl.startsWith('www.') ? `http://${textUrl}` : textUrl
  }
  return `UNRESOLVED:${href}`
}

/**
 * decodeTrackedUrl
 * Reads the real URL out of a link, or returns '' when it can't.
 *
 * @param {string} href
 * @returns {string}
 */
function decodeTrackedUrl(href) {
  const convertKitClick = href.match(
    /^https?:\/\/(?:el2\.convertkit[^/]*\.com\/c|click\.convertkit-mail\.com)\/[^/]+\/[^/]+\/([A-Za-z0-9+/=_-]+)$/,
  )
  if (convertKitClick) {
    const target = Buffer.from(convertKitClick[1], 'base64url').toString('utf8')
    return isLiveTarget(target) ? target : ''
  }

  const convertKitApp = href.match(
    /^https?:\/\/app\.convertkit\.com\/clck\/[^?]+\?(.+)$/,
  )
  if (convertKitApp) {
    const target =
      new URLSearchParams(convertKitApp[1].replace(/&amp;/g, '&')).get('url') ??
      ''
    return isLiveTarget(target) ? target : ''
  }

  const buttondown = href.match(
    /^https?:\/\/[^/]+\.awstrack\.me\/L0\/([^/]+)\//,
  )
  if (buttondown) {
    const target = decodeURIComponent(buttondown[1])
    return isLiveTarget(target) ? target : ''
  }

  const isTracked =
    /list-manage\d*\.com|forward-to-friend|campaign-archive|convertkit|ck\.page|awstrack\.me|kitads\.link/.test(
      href,
    )
  return isTracked ? '' : href
}

/**
 * isLiveTarget
 * Tells whether a decoded target is a page a reader can still open.
 *
 * @param {string} target
 * @returns {boolean}
 */
function isLiveTarget(target) {
  const isLink = /^(https?:\/\/|\/|applewebdata:\/\/|mailto:|tel:)/.test(target)
  const isPlatformLink =
    /^https?:\/\/([^/]+\.)?(convertkit-mail\d*\.com|el2\.convertkit\.com|app\.convertkit\.com|ck\.page|kitads\.link|buttondown\.email)\//.test(
      target,
    )
  return isLink && !isPlatformLink
}

/**
 * rebaseSiteUrl
 * Points relative and editor-mangled links at zellwk.com.
 *
 * @param {string} target
 * @returns {string}
 */
function rebaseSiteUrl(target) {
  return target
    .replace(/^applewebdata:\/\/[^/]+/, '')
    .replace(/^\//, 'https://zellwk.com/')
}

/**
 * removeSubscriberId
 * Drops the subscriber id Kit appends to links.
 *
 * @param {string} target
 * @returns {string}
 */
function removeSubscriberId(target) {
  if (!/[?&]ck_subscriber_id=/.test(target)) return target
  const url = new URL(target)
  url.searchParams.delete('ck_subscriber_id')
  return url.toString()
}

/**
 * getImageSource
 * Keeps live images, maps old site images to assets, marks the rest dead.
 *
 * @param {object} opts
 * @param {string | undefined} opts.src
 * @param {Set<string>} opts.liveImageUrls
 * @returns {string}
 */
function getImageSource({ src = '', liveImageUrls }) {
  const assetPath = getAssetPath(src)
  if (assetPath) return assetPath
  if (liveImageUrls.has(src)) return src
  return `DEAD:${src}`
}

/**
 * getAssetPath
 * Maps an old zellwk.com image URL to its file in src/assets.
 *
 * @param {string} src
 * @returns {string}
 */
function getAssetPath(src) {
  const match = src.match(/^https?:\/\/(?:www\.)?zellwk\.com\/images\/(.+)$/)
  return match ? `../../assets/${match[1]}` : ''
}

/**
 * buildTurndown
 * Sets up HTML to Markdown conversion in the site's style.
 *
 * @returns {TurndownService}
 */
function buildTurndown() {
  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '_',
    hr: '---',
  })

  // Escapes angle brackets so prose about tags stays text
  const escapeMarkdown = turndown.escape.bind(turndown)
  turndown.escape = text => escapeMarkdown(text).replace(/</g, '&lt;')

  // Writes list items with one space after the marker
  turndown.addRule('listItem', {
    filter: 'li',
    replacement: (content, node) => {
      const list = node.parentNode
      const start = Number(list?.getAttribute?.('start') ?? 1)
      const position = list
        ? Array.prototype.indexOf.call(list.children, node)
        : 0
      const prefix = list?.nodeName === 'OL' ? `${start + position}. ` : '- '
      const indent = ' '.repeat(prefix.length)
      const text = content
        .replace(/^\n+/, '')
        .replace(/\n+$/, '\n')
        .replace(/\n(?!$)/g, `\n${indent}`)
      return (
        prefix + text + (node.nextSibling && !text.endsWith('\n') ? '\n' : '')
      )
    },
  })

  // Drops links left with nothing to click
  turndown.addRule('emptyLink', {
    filter: node =>
      node.nodeName === 'A' &&
      !node.textContent?.trim() &&
      !node.querySelector('img'),
    replacement: () => '',
  })

  return turndown
}

/**
 * getBlocks
 * Splits Markdown into tidy, non-empty blocks.
 *
 * @param {string} markdown
 * @returns {string[]}
 */
function getBlocks(markdown) {
  return markdown
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\u034F/g, '')
    .replace(/\u00A0/g, ' ')
    .split(/\n[ \t]*\n/)
    .map(block =>
      block
        .split('\n')
        .map(row => row.replace(/[ \t]+$/, ''))
        .join('\n')
        .replace(/^\n+|\n+$/g, ''),
    )
    .map(block => (block.includes('```') ? block : block.trim()))
    .filter(block => getPlainText(block) || /!\[/.test(block))
}

/**
 * dropSponsorBlock
 * Cuts a sponsored section from where it starts, with the line introducing it.
 *
 * @param {string[]} blocks Markdown blocks of the letter
 * @returns {string[]}
 */
function dropSponsorBlock(blocks) {
  const sponsorIndex = blocks.findIndex(block =>
    /^sponsored by\b/i.test(getPlainText(block)),
  )
  if (sponsorIndex === -1) return blocks

  // Drops the line before it too, when it introduces the sponsor
  const hasIntro = /sponsor/i.test(getPlainText(blocks[sponsorIndex - 1] ?? ''))
  return blocks.slice(0, hasIntro ? sponsorIndex - 1 : sponsorIndex)
}

/**
 * cutLetter
 * Keeps the blocks between greeting and sign-off, and the P.S. after it.
 *
 * @param {object} opts
 * @param {string[]} opts.blocks Markdown blocks of the whole email
 * @param {string} opts.title Cleaned subject
 * @returns {{ bodyBlocks: string[], psBlocks: string[], hasSignOff: boolean }}
 */
function cutLetter({ blocks, title }) {
  // Drops everything above the greeting, and the greeting itself
  const greetingIndex = blocks
    .slice(0, 12)
    .findIndex(block => isGreeting(getPlainText(removeLeadingLink(block))))
  const letterBlocks =
    greetingIndex === -1
      ? dropEmailHeader({ blocks, title })
      : removeGreetingPrefix({
          blocks: [
            removeLeadingLink(blocks[greetingIndex]),
            ...blocks.slice(greetingIndex + 1),
          ],
        })

  // Cuts at the first footer block when there's no sign-off
  const signOffIndex = findSignOff(letterBlocks)
  if (signOffIndex === -1) {
    const footerStart = findFooterStart({ blocks: letterBlocks, start: 0 })
    return {
      bodyBlocks: dropSponsorBlock(
        dropTrailingRules(letterBlocks.slice(0, footerStart)),
      ),
      psBlocks: [],
      hasSignOff: false,
    }
  }

  // Keeps the P.S. between the sign-off and the footer, minus repeated sign-offs
  const closingIndex = isClosingPhrase(
    getPlainText(letterBlocks[signOffIndex - 1] ?? ''),
  )
    ? signOffIndex - 1
    : signOffIndex
  const footerStart = findFooterStart({
    blocks: letterBlocks,
    start: signOffIndex + 1,
  })
  const afterSignOff = letterBlocks
    .slice(signOffIndex + 1, footerStart)
    .filter(
      block =>
        !isSignOff(getPlainText(block)) &&
        !isClosingPhrase(getPlainText(block)),
    )
  const hasPs = isPs(getPlainText(afterSignOff[0] ?? ''))

  return {
    bodyBlocks: dropSponsorBlock(
      dropTrailingRules(letterBlocks.slice(0, closingIndex)),
    ),
    psBlocks: hasPs ? afterSignOff : [],
    hasSignOff: true,
  }
}

/**
 * dropTrailingRules
 * Removes horizontal rules left at the end of the letter.
 *
 * @param {string[]} blocks
 * @returns {string[]}
 */
function dropTrailingRules(blocks) {
  const lastTextIndex = blocks.findLastIndex(block => block.trim() !== '---')
  return blocks.slice(0, lastTextIndex + 1)
}

/**
 * findSignOff
 * Finds the sign-off that only a P.S., another sign-off or the footer follows.
 *
 * @param {string[]} blocks
 * @returns {number}
 */
function findSignOff(blocks) {
  const signOffIndexes = blocks
    .map((block, index) => (isSignOff(getPlainText(block)) ? index : -1))
    .filter(index => index !== -1)

  const endsLetter = index => {
    const next = getPlainText(blocks[index + 1] ?? '')
    return !next || isPs(next) || isSignOff(next) || isFooter(next)
  }
  return signOffIndexes.find(endsLetter) ?? signOffIndexes.at(-1) ?? -1
}

/**
 * isPs
 * Tells whether a block opens a P.S.
 *
 * @param {string} text Plain text of a block
 * @returns {boolean}
 */
function isPs(text) {
  return /^P\.?\s?P?\.?\s?S\b/i.test(text)
}

/**
 * findFooterStart
 * Finds the first footer block at or after a position.
 *
 * @param {object} opts
 * @param {string[]} opts.blocks
 * @param {number} opts.start First index to look at
 * @returns {number}
 */
function findFooterStart({ blocks, start }) {
  const offset = blocks
    .slice(start)
    .findIndex(block => isFooter(getPlainText(block)))
  return offset === -1 ? blocks.length : start + offset
}

/**
 * removeGreetingPrefix
 * Drops the greeting block, or the salutation that opens a longer block.
 *
 * @param {object} opts
 * @param {string[]} opts.blocks Blocks starting at the greeting
 * @returns {string[]}
 */
function removeGreetingPrefix({ blocks }) {
  const [greeting, ...rest] = blocks
  const remainder = greeting.replace(
    /^(hey|hi|hello|dear)\b[^,\n]{0,40},+\s*/i,
    '',
  )
  const isWholeBlock =
    !/[\p{L}\p{N}]/u.test(getPlainText(remainder)) || remainder === greeting

  // Skips repeated greetings and template sign-offs above the letter
  const letterStart = rest.findIndex(block => !isFiller(getPlainText(block)))
  const letter = letterStart === -1 ? [] : rest.slice(letterStart)

  const [first, ...others] = isWholeBlock ? letter : [remainder, ...rest]
  if (first === undefined) return []

  // Capitalises the letter's first word, after any opening tags
  const capitalised = first.replace(
    /^((?:<[^>]*>|\s)*)(\p{Ll})/u,
    (_, opening, char) => opening + char.toUpperCase(),
  )
  return [capitalised, ...others]
}

/**
 * isFiller
 * Tells whether a block is a bare greeting, closing phrase or sign-off.
 *
 * @param {string} text Plain text of a block
 * @returns {boolean}
 */
function isFiller(text) {
  const isBareGreeting = /^(hey|hi|hello|dear|yo)\b[^,.!?]{0,30}[,!.]*$/i.test(
    text,
  )
  const isTemplateSignOff = isSignOff(text) && !isGreeting(text)
  return isBareGreeting || isClosingPhrase(text) || isTemplateSignOff
}

/**
 * removeLeadingLink
 * Drops a stray link pasted in front of a block's text.
 *
 * @param {string} block
 * @returns {string}
 */
function removeLeadingLink(block) {
  return block.replace(/^\[[^\]]*\]\([^)]*\)\s*(?=(hey|hi|hello|dear)\b)/i, '')
}

/**
 * dropEmailHeader
 * Drops the browser-view line and a heading that repeats the subject.
 *
 * @param {object} opts
 * @param {string[]} opts.blocks
 * @param {string} opts.title
 * @returns {string[]}
 */
function dropEmailHeader({ blocks, title }) {
  const titleText = title.toLowerCase()
  return blocks.filter((block, index) => {
    const text = getPlainText(block).toLowerCase()
    const isBrowserLink = /view this email in your browser/.test(text)
    const isRepeatedTitle = index < 4 && text === titleText
    return !isBrowserLink && !isRepeatedTitle
  })
}

/**
 * isGreeting
 * Tells whether a block opens with a salutation to the reader.
 *
 * @param {string} text Plain text of a block
 * @returns {boolean}
 */
function isGreeting(text) {
  const isShortSalutation = text.length <= 50
  const opensWithSalutation = /^(hey|hi|hello|dear)\b[^,.!?\n]{0,40},/i.test(
    text,
  )
  return (
    /^(hey|hi|hello|dear|yo)\b/i.test(text) &&
    (isShortSalutation || opensWithSalutation)
  )
}

/**
 * isSignOff
 * Tells whether a block is Zell's sign-off.
 *
 * @param {string} text Plain text of a block
 * @returns {boolean}
 */
function isSignOff(text) {
  const words = text.replace(/[^\p{L}\s]/gu, ' ').trim()
  return (
    text.length <= 60 && /\bZell$/.test(words) && !isPs(text) && !isFooter(text)
  )
}

/**
 * isClosingPhrase
 * Tells whether a short block is the closing phrase above a bare "Zell".
 *
 * @param {string} text Plain text of a block
 * @returns {boolean}
 */
function isClosingPhrase(text) {
  return (
    text.length <= 30 &&
    /^(talk soon|cheers|stay awesome|be awesome|love|thanks|thank you|best|regards|warmly)\b/i.test(
      text,
    )
  )
}

/**
 * isFooter
 * Tells whether a block belongs to the email platform's footer.
 *
 * @param {string} text Plain text of a block
 * @returns {boolean}
 */
function isFooter(text) {
  const isUnsubscribeLine = text.length <= 100 && /unsubscribe/i.test(text)
  const hasFooterMarker =
    /^Have a question about frontend development\? Hit reply|^Want to work together\? Tell me about your business|Serangoon Central|Alkaff Crescent|Need (1-1|hands-on) help|Receiving duplicated emails|Built with Convertkit|brought to you by Buttondown|^This was issue #|You have been subscribed|You are receiving this|update (your )?(subscription preferences|profile)|forward to a friend|Copyright ©/i.test(
      text,
    )
  return isUnsubscribeLine || hasFooterMarker
}

/**
 * getPlainText
 * Strips Markdown syntax to read a block's words.
 *
 * @param {string} block
 * @returns {string}
 */
function getPlainText(block) {
  return block
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`#>\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * removeMarkers
 * Unlinks unresolved links and drops dead images, counting both.
 *
 * @param {string} markdown
 * @returns {{ text: string, keptImages: string[], removedImages: string[], unresolvedLinks: string[] }}
 */
function removeMarkers(markdown) {
  const removedImages = []
  const unresolvedLinks = []

  const text = markdown
    .replace(/!\[[^\]]*\]\(DEAD:([^)\s]*)\)/g, (match, src) => {
      removedImages.push(src)
      return ''
    })
    .replace(/\[([^\]]*)\]\(UNRESOLVED:[^)]*\)/g, (match, linkText) => {
      if (linkText.trim()) unresolvedLinks.push(linkText.trim())
      return linkText
    })
    .replace(/(?<!!)\[\s*\]\([^)]*\)/g, '')
    .split(/\n{2,}/)
    .filter(block => block.trim())
    .join('\n\n')
    .trim()

  const keptImages = [...text.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)].map(
    match => match[1],
  )
  return { text, keptImages, removedImages, unresolvedLinks }
}
