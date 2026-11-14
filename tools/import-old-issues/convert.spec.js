import { describe, expect, it } from 'vitest'
import {
  buildIssueText,
  cleanSubject,
  convertOldIssue,
  getImageUrls,
  getImportFileNames,
} from './convert.js'

const liveImageUrls = new Set(['https://convertkit.s3.amazonaws.com/live.png'])

function convert(html, subject = 'A subject') {
  return convertOldIssue({ html, subject, liveImageUrls })
}

function base64(url) {
  return Buffer.from(url).toString('base64')
}

describe('greeting', () => {
  it('drops the greeting and everything above it', () => {
    const issue = convert(`
      <div style="display:none">Preheader text</div>
      <h1>A subject</h1>
      <p>Hey Wee Keat,</p>
      <p>First line.</p>
      <p>Stay awesome,<br>Zell</p>`)
    expect(issue.body).toBe('First line.')
  })

  it('drops a merge-tag greeting', () => {
    const issue = convert(
      '<p>Hey [FIRST NAME GOES HERE],</p><p>Body.</p><p>Stay awesome,<br>Zell</p>',
    )
    expect(issue.body).toBe('Body.')
  })

  it('drops only the salutation when the greeting opens a paragraph', () => {
    const issue = convert(
      '<p>Hey Zell, here is the news.</p><p>Stay awesome,<br>Zell</p>',
    )
    expect(issue.body).toBe('Here is the news.')
  })

  it('capitalises a letter that continued the greeting’s sentence', () => {
    const issue = convert(
      '<p>Hey Zell,</p><p>it may seem hard.</p><p>Stay awesome,<br>Zell</p>',
    )
    expect(issue.body).toBe('It may seem hard.')
  })

  it('drops a repeated greeting and a stray link before it', () => {
    const issue = convert(`
      <p><a href="https://twitter.com/share">https://twitter.com/share</a>Hey Zell,</p>
      <p>Hey Zell,</p>
      <p>Hey, it's Zell.</p>
      <p>Body.</p>
      <p>Stay awesome,<br>Zell</p>`)
    expect(issue.body).toBe("Hey, it's Zell.\n\nBody.")
  })

  it('splits Mailchimp paragraphs joined by double breaks', () => {
    const issue = convert(
      '<div>Hey&nbsp;<br><br>First.<br><br>Second.<br><br>Be awesome, Stay awesome!&nbsp;<br>Zell&nbsp;</div>',
    )
    expect(issue.body).toBe('First.\n\nSecond.')
  })
})

describe('sign-off, P.S. and footer', () => {
  it('drops a sponsored section and the line introducing it', () => {
    const issue = convert(`
      <p>Hi Zell,</p>
      <p>Body.</p>
      <p>Also, gonna try out a sponsored thing.</p>
      <p>Sponsored by: An AI newsletter</p>
      <p>Sign up to start learning</p>
      <p>Stay awesome,<br>Zell</p>`)
    expect(issue.body).toBe('Body.')
  })

  it('cuts at the sign-off and keeps the P.S. up to the footer', () => {
    const issue = convert(`
      <p>Hi Zell,</p>
      <p>Body.</p>
      <p>Stay awesome,<br>Zell</p>
      <p>P.S. One more thing.</p>
      <p>Still the P.S.</p>
      <div class="footer"><ul><li>Need 1-1 help? Let me know</li>
      <li>You can <a href="https://el2.convertkit-mail2.com/u/abc">unsubscribe</a> anytime.</li></ul></div>`)
    expect(issue.body).toBe('Body.')
    expect(issue.ps).toBe('P.S. One more thing.\n\nStill the P.S.')
    expect(issue.hasSignOff).toBe(true)
  })

  it('takes the first sign-off when the email repeats it after the P.S.', () => {
    const issue = convert(`
      <p>Hey Zell,</p><p>Body.</p><p>Stay awesome,</p><p>Zell</p>
      <p>P.S. Note.</p><p>Stay awesome, Zell</p>
      <p>Unsubscribe from all emails</p>`)
    expect(issue.body).toBe('Body.')
    expect(issue.ps).toBe('P.S. Note.')
  })

  it('cuts at the footer when there is no sign-off', () => {
    const issue = convert(`
      <p>Hey Zell,</p>
      <p>If you don't want these monthly updates, feel free to click the unsubscribe link at the footer of this email.</p>
      <p>Enjoy!</p>
      <p>Have a question about frontend development? Hit reply.</p>
      <p>Zell Liew, Blk 427 Serangoon Central #05-310</p>`)
    expect(issue.body).toBe(
      "If you don't want these monthly updates, feel free to click the unsubscribe link at the footer of this email.\n\nEnjoy!",
    )
    expect(issue.hasSignOff).toBe(false)
  })

  it('drops a blank template sign-off above the letter', () => {
    const issue = convert(
      '<p>Hey Zell!</p><p>Stay Awesome!<br>Zell</p><p>Hey Zell!</p><p>Real body.</p><p>Talk soon :)</p><p>Zell</p>',
    )
    expect(issue.body).toBe('Real body.')
  })
})

describe('links', () => {
  it('decodes ConvertKit, Kit and Buttondown tracking links', () => {
    const issue = convert(`
      <p>Hey Zell,</p>
      <p><a href="https://el2.convertkit-mail2.com/c/abc/def/${base64('https://zellwk.com/blog/a')}">a</a>
      <a href="https://click.convertkit-mail.com/abc/def/${base64('https://example.com/b?ck_subscriber_id=123&x=1')}">b</a>
      <a href="http://app.convertkit.com/clck/abc?idx=0&amp;url=https%3A%2F%2Fexample.com%2Fc">c</a>
      <a href="https://x.r.us-east-1.awstrack.me/L0/https:%2F%2Fzellwk.life%2Fd%2F/1/abc">d</a></p>
      <p>Stay awesome,<br>Zell</p>`)
    expect(issue.body).toBe(
      '[a](https://zellwk.com/blog/a) [b](https://example.com/b?x=1) [c](https://example.com/c) [d](https://zellwk.life/d/)',
    )
  })

  it('points relative and editor-mangled targets at zellwk.com', () => {
    const issue = convert(`
      <p>Hey Zell,</p>
      <p><a href="https://el2.convertkit-mail.com/c/a/b/${base64('/blog/x')}">x</a>
      <a href="https://el2.convertkit-mail.com/c/a/b/${base64('applewebdata://ABC-123/blog/y')}">y</a></p>
      <p>Stay awesome,<br>Zell</p>`)
    expect(issue.body).toBe(
      '[x](https://zellwk.com/blog/x) [y](https://zellwk.com/blog/y)',
    )
  })

  it('uses a dead Mailchimp link’s URL text, or keeps only its text', () => {
    const issue = convert(`
      <p>Hey Zell,</p>
      <p><a href="http://zell-weekeat.us6.list-manage.com/track/click?u=1&amp;id=2">http://www.zell-weekeat.com/post/</a></p>
      <p><a href="http://zell-weekeat.us6.list-manage1.com/track/click?u=1&amp;id=3">this post</a></p>
      <p>Stay awesome,<br>Zell</p>`)
    expect(issue.body).toBe(
      '[http://www.zell-weekeat.com/post/](http://www.zell-weekeat.com/post/)\n\nthis post',
    )
    expect(issue.unresolvedLinks).toEqual(['this post'])
  })

  it('unlinks Kit ad links', () => {
    const issue = convert(`
      <p>Hey Zell,</p>
      <p>Try <a href="https://click.convertkit-mail.com/a/b/${base64('https://kitads.link/1/me@example.com')}">The Rundown</a>.</p>
      <p>Stay awesome,<br>Zell</p>`)
    expect(issue.body).toBe('Try The Rundown.')
  })

  it('keeps targets that only mention ConvertKit, and unlinks its admin pages', () => {
    const issue = convert(`
      <p>Hey Zell,</p>
      <p><a href="https://el2.convertkit-mail.com/c/a/b/${base64('https://zellwk.com/blog/convertkit-cli')}">CLI</a>
      <a href="https://click.convertkit-mail.com/a/b/${base64('https://app.convertkit.com/campaigns/1/draft')}">draft</a></p>
      <p>Stay awesome,<br>Zell</p>`)
    expect(issue.body).toBe(
      '[CLI](https://zellwk.com/blog/convertkit-cli) draft',
    )
    expect(issue.unresolvedLinks).toEqual(['draft'])
  })
})

describe('images', () => {
  const html = `
    <p>Hey Zell,</p>
    <p><img src="https://convertkit.s3.amazonaws.com/live.png" alt="Live"></p>
    <p><img src="https://embed.filekitcdn.com/e/dead/email" alt=""></p>
    <p><img src="https://zellwk.com/images/2018/x/quadrants.jpg" alt="Quadrants"></p>
    <p>Stay awesome,<br>Zell</p>
    <img src="https://open.convertkit-mail.com/abc" alt="">
    <img src="http://zell-weekeat.us6.list-manage.com/track/open.php?u=1">`

  it('keeps live images, maps old site images and removes dead ones', () => {
    const issue = convert(html)
    expect(issue.body).toBe(
      '![Live](https://convertkit.s3.amazonaws.com/live.png)\n\n![Quadrants](../../assets/2018/x/quadrants.jpg)',
    )
    expect(issue.removedImages).toEqual([
      'https://embed.filekitcdn.com/e/dead/email',
    ])
  })

  it('lists only content images on other hosts for checking', () => {
    expect(getImageUrls(html)).toEqual([
      'https://convertkit.s3.amazonaws.com/live.png',
      'https://embed.filekitcdn.com/e/dead/email',
    ])
  })
})

describe('Markdown', () => {
  it('keeps headings, lists, emphasis, code and quotes', () => {
    const issue = convert(`
      <p>Hey Zell,</p>
      <h2>Articles</h2>
      <ul><li>One</li><li>Two</li></ul>
      <ol><li>First</li></ol>
      <p><em>Italic</em> and <strong>bold</strong> and <code>code</code>.</p>
      <blockquote><p>Quote</p></blockquote>
      <pre>let a = 1<br>let b = 2</pre>
      <p>Stay awesome,<br>Zell</p>`)
    expect(issue.body).toBe(
      '## Articles\n\n- One\n- Two\n\n1. First\n\n_Italic_ and **bold** and `code`.\n\n> Quote\n\n```\nlet a = 1\nlet b = 2\n```',
    )
  })

  it('rebuilds code pasted in as markup text and escapes tags in prose', () => {
    const issue = convert(`
      <p>Hey Zell,</p>
      <p>Style &lt;strong&gt; tags.</p>
      <p>~~~</p><pre>&lt;code&gt;.a {&lt;/code&gt;&lt;code&gt;}&lt;/code&gt;</pre><p>~~~</p>
      <p>Stay awesome,<br>Zell</p>`)
    expect(issue.body).toBe('Style &lt;strong> tags.\n\n```\n.a {}\n```')
  })
})

describe('subject and file names', () => {
  it('removes the merge tag from a subject', () => {
    expect(
      cleanSubject("\u200B[FIRST NAME GOES HERE], you don't need it"),
    ).toBe("You don't need it")
  })

  it('adds the year, then the date, to repeated subjects', () => {
    const fileNames = getImportFileNames([
      { sentDate: '2018-12-01', title: 'Learn JavaScript update' },
      { sentDate: '2020-07-28', title: 'Learn JavaScript update' },
      { sentDate: '2020-08-10', title: 'Learn JavaScript Update' },
    ])
    expect(fileNames).toEqual([
      '2018-12-01-learn-javascript-update.md',
      '2020-07-28-learn-javascript-update-2020.md',
      '2020-08-10-learn-javascript-update-2020-08-10.md',
    ])
  })

  it('writes the P.S. into frontmatter only when there is one', () => {
    expect(buildIssueText({ title: 'Hi: there', body: 'Body.', ps: '' })).toBe(
      '---\ntitle: "Hi: there"\n---\n\nBody.\n',
    )
    expect(buildIssueText({ title: 'T', body: 'B', ps: 'P.S. x' })).toBe(
      '---\ntitle: T\nps: P.S. x\n---\n\nB\n',
    )
  })
})
