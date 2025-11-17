import mdxRenderer from '@astrojs/mdx/server.js'
import svelteRenderer from '@astrojs/svelte/server.js'
import { components } from '../components/blogPostComponents.js'

import rss from '@astrojs/rss'
import { processFiles } from '@splendidlabz/astro/content'
import { toSentence } from '@splendidlabz/utils'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { getCollection, render } from 'astro:content'
import config from '../../site-config.js'

export const prerender = true

export async function GET(context) {
  const container = await AstroContainer.create()

  container.addServerRenderer({ renderer: svelteRenderer })
  container.addServerRenderer({ renderer: mdxRenderer })

  const blog = await getCollection('blog')
  const posts = await await processFiles(blog)
  const items = posts.map(async (post, index) => {
    const rendered = await render(post)
    const { Content } = rendered
    const content = await container.renderToString(Content, {
      props: { components },
    })

    const data = {
      link: `${config.site.url}/blog/${post.data.slug}/`,
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      content,
      customData: post.data.tags
        .map(category => `<category>${toSentence(category)}</category>`)
        .join(''),
    }
    return data
  })

  return rss({
    title: config.site.title,
    description: config.site.description,
    site: config.site.url,
    items: await Promise.all(items),
  })
}
