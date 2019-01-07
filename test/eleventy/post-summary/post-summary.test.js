/* globals describe it expect */
const fs = require('fs')
const path = require('path')
const denodeify = require('denodeify')
const readFile = denodeify(fs.readFile)
const { summary } = require('../../../eleventy/post')

const pathToTestFolder = 'test/eleventy/post-summary/input'

/**
 * Gets content from file
 * @param {string} file file name (with extension)
 */
const getContent = async file => {
  const buffer = await readFile(path.resolve(pathToTestFolder, file))
  return buffer.toString()
}

describe('Post summary should', () => {
  it('split at <!--more-->', async done => {
    const content = await getContent('more.md')
    const output = summary({ templateContent: content })
    expect(output).toMatch(/Kentucky fried chicken/)
    expect(output).not.toMatch(/Macdonalds/)
    done()
  })

  it('split at <!-- more -->', async done => {
    const content = await getContent('more2.md')
    const output = summary({ templateContent: content })
    expect(output).toMatch(/Kentucky fried chicken/)
    expect(output).not.toMatch(/Macdonalds/)
    done()
  })
})

describe('Post summary converts reference links to inline links', () => {
  it('works for links without title', async done => {
    const content = await getContent('ref-link.md')
    const output = summary({ templateContent: content })
    expect(output).toMatch('[chicken](/link)')
    done()
  })

  it('works for with titles', async done => {
    const content = await getContent('ref-link-title.md')
    const output = summary({ templateContent: content })
    expect(output).toMatch('[chicken](/link "title")')
    done()
  })

  it('works with multiple links', async done => {
    // Multiple links
    const content2 = await getContent('ref-link-title2.md')
    const output2 = summary({ templateContent: content2 })
    const re = /\[.*\]\(.*\)/g
    expect(output2.match(re).length).toEqual(2)
    done()
  })
})
